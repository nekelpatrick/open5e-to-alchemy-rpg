import fetch from "isomorphic-fetch";
import fs from "fs/promises";
import _ from "lodash";
import { Character } from "./types";

const input = "src/open5e/generated-asset.json";
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

  // Note: Add remaining property mappings here
  const alchemyData: Character = {
    abilityScores: [
      { name: "str", value: open5eData.strength },
      { name: "dex", value: open5eData.dexterity },
      { name: "con", value: open5eData.constitution },
      { name: "int", value: open5eData.intelligence },
      { name: "wis", value: open5eData.wisdom },
      { name: "cha", value: open5eData.charisma },
    ],
    actions: open5eData.actions.map((action) => ({
      name: action.name,
      description: action.desc,
      // ...additional properties with assumed default values or more processing...
    })),
    age: "Unknown",
    alignment: open5eData.alignment,
    armorClass: open5eData.armor_class,
    armorType: open5eData.armor_desc,
    appearance: "Unknown",
    challengeRating: open5eData.challenge_rating,
    classes: [], // assuming no classes data available in open5eData
    conditionImmunities: [], // assuming no conditionImmunities data available in open5eData
    copper: 0,
    currentHp: open5eData.hit_points,
    damageImmunities: [], // assuming no damageImmunities data available in open5eData
    damageResistances: [], // assuming no damageResistances data available in open5eData
    damageVulnerabilities: [], // assuming no damageVulnerabilities data available in open5eData
    description: open5eData.desc,
    electrum: 0,
    eyes: "Unknown",
    exp: 0,
    gold: 0,
    hair: "Unknown",
    height: "Unknown",
    hitDice: open5eData.hit_dice,
    imageUri: open5eData.img_main,
    initiativeBonus: 0,
    isBackstoryPublic: false,
    isSpellcaster: false,
    itemsWithActions: [],
    legendary:
      _.isArray(open5eData.legendary_actions) &&
      open5eData.legendary_actions.length > 0,
    maxHp: open5eData.hit_points,
    movementModes: [], // assuming no movementModes data available in open5eData
    name: open5eData.name,
    platinum: 0,
    proficiencies: [], // assuming no proficiencies data available in open5eData
    proficiencyBonus: 0,
    race: open5eData.type,
    senses: [], // assuming no senses data available in open5eData
    silver: 0,
    skills: [], // assuming no skills data available in open5eData
    skin: "Unknown",
    size: open5eData.size,
    speed: open5eData.speed.walk,
    spells: [], // assuming no spells data available in open5eData
    spellcastingAbility: "",
    spellFilters: [],
    spellSlots: [],
    systemKey: "",
    textBlocks: [], // assuming no textBlocks data available in open5eData
    trackers: [], // assuming no trackers data available in open5eData
    type: open5eData.type,
    typeTags: [],
    weight: "Unknown",
  };

  await fs.writeFile(outputFilename, JSON.stringify(alchemyData, null, 2));
  console.log(`Alchemy JSON data successfully written to ${outputFilename}.`);
}

fetchAndSaveJson(url, input)
  .then(() => convertOpen5eToAlchemy(input, output))
  .catch((error) => console.error("An error occurred:", error));
