import fetch from 'isomorphic-fetch';
import fs from 'fs';
import { Character } from './types';


const url = 'https://api.open5e.com/v1/monsters/aboleth/';
const input = 'src/open5e/generated-asset.json';
const output = 'src/alchemy/generated-asset.json';


async function writeJSONToFile(url, filename) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filename, jsonData);
    console.log(`JSON data successfully written to ${filename}.`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}


writeJSONToFile(url, input);





// Read the Open5e JSON data
const open5eData:any = ('./open5e/generated-asset.json');



// Create an empty Alchemy JSON object
const alchemyData:Character = {
 abilityScores: [],
 actions: [],
 age: '',
 alignment: '',
 armorClass: 0,
 armorType: '',
 appearance: '',
 challengeRating: '',
 classes: [],
 conditionImmunities: [],
 copper: 0,
 currentHp: 0,
 damageImmunities: [],
 damageResistances: [],
 damageVulnerabilities: [],
 description: '',
 electrum: 0,
 eyes: '',
 exp: 0,
 gold: 0,
 hair: '',
 height: '',
 hitDice: '',
 imageUri: '',
 initiativeBonus: 0,
 isBackstoryPublic: false,
 isSpellcaster: false,
 itemsWithActions: [],
 legendary: false,
 maxHp: 0,
 movementModes: [],
 name: '',
 platinum: 0,
 proficiencies: [],
 proficiencyBonus: 0,
 race: '',
 senses: [],
 silver: 0,
 skills: [],
 skin: '',
 size: '',
 speed: 0,
 spells: [],
 spellcastingAbility: '',
 spellFilters: [],
 spellSlots: [],
 systemKey: '',
 textBlocks: [],
 trackers: [],
 type: '',
 typeTags: [],
 weight: '',
};

// Map ability scores
alchemyData.abilityScores = [
  { name: 'str', value: open5eData.strength },
  { name: 'dex', value: open5eData.dexterity },
  { name: 'con', value: open5eData.constitution },
  { name: 'int', value: open5eData.intelligence },
  { name: 'wis', value: open5eData.wisdom },
  { name: 'cha', value: open5eData.charisma }
];


// Log the resulting Alchemy JSON
console.log('writing');

// Convert the Alchemy JSON to a string
const alchemyJson = JSON.stringify(alchemyData, null, 2);

// Write the Alchemy JSON to a file
fs.writeFile(output, alchemyJson, 'utf8', err => {
  if (err) {
    console.error('Error writing the file:', err);
  } else {
    console.log('Alchemy JSON file has been created!');
  }
 
 });