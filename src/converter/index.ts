import axios from "axios";
import _ from "lodash";
import { Character } from "../types";
import slugify from "slugify";

async function getAlternativeMonsterImage(monster) {
  let monsterSlug = slugify(monster.name, {
    replacement: "-",
    remove: undefined,
    lower: true,
    strict: true,
    locale: "en",
    trim: true,
  });

  if (!monster.img_main) {
    try {
      const response = await axios.get(
        `http://www.dnd5eapi.co/api/monsters/${monsterSlug}`
      );
      let alternativeImgUri = response.data?.image;
      console.log(`https://www.dnd5eapi.co${alternativeImgUri}`);
      return `https://www.dnd5eapi.co${alternativeImgUri}`;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  } else {
    return monster.img_main;
  }
}

export async function convertToAlchemy(monsterData) {
  // fetch image from alternative API if it doesn't exist
  let imageResource;

  if (monsterData.img_main == null) {
    console.log(
      `${monsterData.name}'s image not found on open5e. Looking for alternative Image...`
    );
    imageResource = await getAlternativeMonsterImage(monsterData);
  } else {
    imageResource = monsterData.img_main;
  }
  const alchemyData: Character = {
    name: monsterData.name,
    imageUri: imageResource,
    abilityScores: [
      { name: "str", value: monsterData.strength },
      { name: "dex", value: monsterData.dexterity },
      { name: "con", value: monsterData.constitution },
      { name: "int", value: monsterData.intelligence },
      { name: "wis", value: monsterData.wisdom },
      { name: "cha", value: monsterData.charisma },
    ],
    actions: monsterData.actions.map((action, index) => ({
      name: action.name,
      description: action.desc,
      sortOrder: index,
      steps: [],
    })),
    age: "Unknown", // No equivalent data in open5e
    alignment: monsterData.alignment,
    armorClass: monsterData.armor_class,
    armorType: monsterData.armor_desc,
    appearance: "Unknown", // No equivalent data in open5e
    challengeRating: monsterData.challenge_rating,
    classes: [],
    conditionImmunities: Array.isArray(monsterData.condition_immunities)
      ? monsterData.condition_immunities.map((immunity) => immunity.name)
      : [],
    copper: 0, // No equivalent data in open5e
    currentHp: monsterData.hit_points,
    damageImmunities: Array.isArray(monsterData.damage_immunities)
      ? monsterData.damage_immunities.map((immunity) => ({
          condition: "immune",
          damageType: immunity.name,
        }))
      : [],
    damageResistances: Array.isArray(monsterData.damage_resistances)
      ? monsterData.damage_resistances.map((resistance) => ({
          condition: "resistant",
          damageType: resistance.name,
        }))
      : [],
    damageVulnerabilities: Array.isArray(monsterData.damage_vulnerabilities)
      ? monsterData.damage_vulnerabilities.map((vulnerability) => ({
          condition: "vulnerable",
          damageType: vulnerability.name,
        }))
      : [],
    description: monsterData.desc,
    electrum: 0, // No equivalent data in open5e
    eyes: "Unknown", // No equivalent data in open5e
    exp: 0, // No equivalent data in open5e
    gold: 0, // No equivalent data in open5e
    hair: "Unknown", // No equivalent data in open5e
    height: "Unknown", // No equivalent data in open5e
    hitDice: monsterData.hit_dice,
    initiativeBonus: 0, // No equivalent data in open5e
    isBackstoryPublic: true, // No equivalent data in open5e
    isSpellcaster: false, // No equivalent data in open5e
    itemsWithActions: [],
    legendary:
      _.isArray(monsterData.legendary_actions) &&
      monsterData.legendary_actions.length > 0,
    maxHp: monsterData.hit_points,
    movementModes: Array.isArray(monsterData.speed?.walk)
      ? [{ distance: monsterData.speed.walk, mode: "walk" }]
      : [],
    platinum: 0, // No equivalent data in open5e
    proficiencies: Array.isArray(monsterData.proficiencies)
      ? monsterData.proficiencies.map((proficiency) => ({
          name: proficiency.name,
          type: proficiency.type,
        }))
      : [],
    proficiencyBonus: monsterData.prof_bonus,
    race: monsterData.type,
    senses: Array.isArray(monsterData.senses)
      ? monsterData.senses.map((sense) => ({
          distance: sense.range,
          name: sense.name,
        }))
      : [],
    silver: 0, // No equivalent data in open5e
    skills: Object.entries(monsterData.skills || {}).map(([skill, value]) => ({
      name: skill,
      bonus: Number(value),
      abilityName: "cha",
      proficient: false,
      doubleProficiency: false,
    })),
    skin: "Unknown", // No equivalent data in open5e
    size: monsterData.size,
    speed: monsterData.speed?.walk,
    spells: monsterData.spell_list,
    spellcastingAbility: "None", // No equivalent data in open5e
    spellFilters: [], // No equivalent data in open5e
    spellSlots: [],
    systemKey: "alchemy", // No equivalent data in open5e
    textBlocks: [],
    trackers: [],
    type: monsterData.type,
    typeTags: [],
    weight: "Unknown", // No equivalent data in open5e
  };

  return alchemyData;
}
