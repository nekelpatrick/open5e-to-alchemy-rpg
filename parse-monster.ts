import fs from 'fs';


// Read the Open5e JSON data
const open5eData = ('./open5e/generated-asset.json');



interface Character {
  id: string;
  name: string;
  description: string;
  level: number;
  experience: number;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  strength: number;
  agility: number;
  intelligence: number;
  charisma: number;
  luck: number;
  gold: number;
  inventory: InventoryItem[];
  spells: Spell[];
  quests: Quest[];
}

interface InventoryItem {
  id: string;
  name: string;
  description: string;
  type: string;
  value: number;
  quantity: number;
}

interface Spell {
  id: string;
  name: string;
  description: string;
  type: string;
  cost: number;
  power: number;
}

interface Quest {
  id: string;
  name: string;
  description: string;
  status: string;
  reward: Reward;
}

interface Reward {
  experience: number;
  gold: number;
  item: InventoryItem;
}


// Create an empty Alchemy JSON object
const alchemyData:Character = {
  id: '',
  name: '',
  description: '',
  level: 0,
  experience: 0,
  health: 0,
  maxHealth: 0,
  mana: 0,
  maxMana: 0,
  strength: 0,
  agility: 0,
  intelligence: 0,
  charisma: 0,
  luck: 0,
  gold: 0,
  inventory: [],
  spells: [],
  quests: []
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

// Map actions
alchemyData.actions = open5eData.actions.map((action, index) => {
  const alchemyAction = {
    name: action.name,
    description: action.description,
    sortOrder: index,
    steps: []
  };

  if (action.attack_bonus !== null && action.damage_dice) {
    const attackStep = {
      attack: {
        ability: 'str',
        crit: 20,
        damageRolls: [
          {
            abilityName: 'str',
            dice: action.damage_dice,
            type: 'Bludgeoning'
          }
        ],
        isProficient: true,
        isRanged: false,
        name: action.name,
        rollsAttack: true
      },
      type: 'custom-attack'
    };

    if (action.damage_bonus) {
      attackStep.attack.damageRolls.push({
        dice: '1d12',
        type: 'Acid'
      });
    }

    if (action.attack_bonus === 'CON') {
      attackStep.attack.savingThrow = {
        abilityName: 'CON',
        difficultyClass: 14
      };
    }

    alchemyAction.steps.push(attackStep);
  }

  return alchemyAction;
});

// Map other properties
alchemyData.alignment = open5eData.alignment;
alchemyData.armorClass = open5eData.armor_class;
alchemyData.armorType = open5eData.armor_desc;
alchemyData.challengeRating = open5eData.challenge_rating;
alchemyData.classes = [{ class: 'Monster', level: 1 }];
alchemyData.currentHp = open5eData.hit_points;
alchemyData.exp = 5900;
alchemyData.hitDice = open5eData.hit_dice;
alchemyData.imageUri = open5eData.img_main;
alchemyData.initiativeBonus = 0;
alchemyData.isNPC = true;
alchemyData.maxHp = open5eData.hit_points;
alchemyData.movementModes = Object.entries(open5eData.speed).map(([mode, distance]) => ({
  mode: mode.charAt(0).toUpperCase() + mode.slice(1),
  distance
}));
alchemyData.name = open5eData.name;
alchemyData.proficiencies = [
  { name: 'Constitution', type: 'save' },
  { name: 'Intelligence', type: 'save' },
  { name: 'Wisdom', type: 'save' },
  ...Object.entries(open5eData.skills).map(([skill, bonus]) => ({
    name: skill.charAt(0).toUpperCase() + skill.slice(1),
    type: 'skill',
    bonus
  })),
  ...open5eData.languages.split(',').map(language => ({
    name: language.trim(),
    type: 'language'
  }))
];
alchemyData.proficiencyBonus = 4;
alchemyData.race = 'NPC';
alchemyData.senses = open5eData.senses.split(',').map(sense => ({
  name: sense.trim(),
  distance: sense.includes('ft.') ? parseInt(sense.match(/\d+/)[0]) : null
}));
alchemyData.size = open5eData.size;
alchemyData.skills = Object.entries(open5eData.skills).map(([ability, bonus]) => ({
  abilityName: ability.charAt(0) + ability.slice(1, 3),
  name: ability.charAt(0).toUpperCase() + ability.slice(1),
  proficient: bonus !== null
}));
alchemyData.speed = 30;
alchemyData.systemKey = '5e';
alchemyData.textBlocks = [
  { title: 'Abilities' },
  { title: 'Class Features' },
  { title: 'Racial Traits' },
  { title: 'Feats' },
  { title: 'Background' },
  { title: 'Characteristics' },
  { title: 'Appearance' },
  { title: 'Organizations' },
  { title: 'Allies' },
  { title: 'Enemies' },
  { title: 'Backstory' },
  { title: 'Other' },
  {
    title: 'Lair Actions',
    textBlocks: [
      { body: open5eData.legendary_desc, title: 'Legendary Actions' }
    ]
  },
  {
    title: 'Regional Effects',
    textBlocks: [
      { body: open5eData.legendary_desc, title: 'Regional Effects' }
    ]
  }
];

// Log the resulting Alchemy JSON
console.log('writing');

// Convert the Alchemy JSON to a string
const alchemyJson = JSON.stringify(alchemyData, null, 2);

// Write the Alchemy JSON to a file
fs.writeFile('./alchemy/generated-asset.json', alchemyJson, 'utf8', err => {
  if (err) {
    console.error('Error writing the file:', err);
  } else {
    console.log('Alchemy JSON file has been created!');
  }
 
 });