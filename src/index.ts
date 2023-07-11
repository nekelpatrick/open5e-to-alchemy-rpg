import fetch from "isomorphic-fetch";
import fs from "fs/promises";
import _ from "lodash";
import { Character } from "./types";

const input = "src/open5e/open5e-input-asset.json";
const output = "src/alchemy/generated-asset.json";
const url = "https://api.open5e.com/v1/monsters/aboleth/";

async function fetchAndSaveJson(url: string, filename: string) {
  const response = await fetch(url);
  const data = await response.json();
  await fs.writeFile(filename, JSON.stringify(data, null, 2));
  console.log(`JSON data successfully written to ${filename}.`);
}

async function readJson(filename: string) {
  const jsonData = await fs.readFile(filename, "utf8");
  return JSON.parse(jsonData);
}

async function convertOpen5eToAlchemy(
  inputFilename: string,
  outputFilename: string
) {
  const open5eData = await readJson(inputFilename);

  const alchemyData: Character = {
    abilityScores: [
      { name: "str", value: open5eData.strength },
      { name: "dex", value: open5eData.dexterity },
      { name: "con", value: open5eData.constitution },
      { name: "int", value: open5eData.intelligence },
      { name: "wis", value: open5eData.wisdom },
      { name: "cha", value: open5eData.charisma },
    ],
    actions: open5eData.actions.map((action, index) => ({
      name: action.name,
      description: action.desc,
      sortOrder: index,
      steps: [],
    })),
    age: "Unknown", // No equivalent data in open5e
    alignment: open5eData.alignment,
    armorClass: open5eData.armor_class,
    armorType: open5eData.armor_desc,
    appearance: "Unknown", // No equivalent data in open5e
    challengeRating: open5eData.challenge_rating,
    classes: [],
    conditionImmunities: Array.isArray(open5eData.condition_immunities)
      ? open5eData.condition_immunities.map((immunity) => immunity.name)
      : [],
    copper: 0, // No equivalent data in open5e
    currentHp: open5eData.hit_points,
    damageImmunities: Array.isArray(open5eData.damage_immunities)
      ? open5eData.damage_immunities.map((immunity) => ({
          condition: "immune",
          damageType: immunity.name,
        }))
      : [],
    damageResistances: Array.isArray(open5eData.damage_resistances)
      ? open5eData.damage_resistances.map((resistance) => ({
          condition: "resistant",
          damageType: resistance.name,
        }))
      : [],
    damageVulnerabilities: Array.isArray(open5eData.damage_vulnerabilities)
      ? open5eData.damage_vulnerabilities.map((vulnerability) => ({
          condition: "vulnerable",
          damageType: vulnerability.name,
        }))
      : [],
    description: open5eData.desc,
    electrum: 0, // No equivalent data in open5e
    eyes: "Unknown", // No equivalent data in open5e
    exp: 0, // No equivalent data in open5e
    gold: 0, // No equivalent data in open5e
    hair: "Unknown", // No equivalent data in open5e
    height: "Unknown", // No equivalent data in open5e
    hitDice: open5eData.hit_dice,
    imageUri: open5eData.img_main,
    initiativeBonus: 0, // No equivalent data in open5e
    isBackstoryPublic: true, // No equivalent data in open5e
    isSpellcaster: false, // No equivalent data in open5e
    itemsWithActions: [],
    legendary:
      _.isArray(open5eData.legendary_actions) &&
      open5eData.legendary_actions.length > 0,
    maxHp: open5eData.hit_points,
    movementModes: Array.isArray(open5eData.speed?.walk)
      ? [{ distance: open5eData.speed.walk, mode: "walk" }]
      : [],
    name: open5eData.name,
    platinum: 0, // No equivalent data in open5e
    proficiencies: Array.isArray(open5eData.proficiencies)
      ? open5eData.proficiencies.map((proficiency) => ({
          name: proficiency.name,
          type: proficiency.type,
        }))
      : [],
    proficiencyBonus: open5eData.prof_bonus,
    race: open5eData.type,
    senses: Array.isArray(open5eData.senses)
      ? open5eData.senses.map((sense) => ({
          distance: sense.range,
          name: sense.name,
        }))
      : [],
    silver: 0, // No equivalent data in open5e
    skills: [],
    skin: "Unknown", // No equivalent data in open5e
    size: open5eData.size,
    speed: Array.isArray(open5eData.speed?.walk) ? open5eData.speed.walk : 0,
    spells: [],
    spellcastingAbility: "None", // No equivalent data in open5e
    spellFilters: [], // No equivalent data in open5e
    spellSlots: [],
    systemKey: "alchemy", // No equivalent data in open5e
    textBlocks: [],
    trackers: [],
    type: open5eData.type,
    typeTags: [],
    weight: "Unknown", // No equivalent data in open5e
  };

  await fs.writeFile(outputFilename, JSON.stringify(alchemyData, null, 2));
  console.log(`Alchemy JSON data successfully written to ${outputFilename}.`);
}

fetchAndSaveJson(url, input)
  .then(() => convertOpen5eToAlchemy(input, output))
  .catch((error) => console.error("An error occurred:", error));
