export type Character = {
  abilityScores: AbilityScores[];
  actions: Action[];
  age: string;
  alignment: string;
  armorClass: number;
  armorType: string;
  appearance: string;
  challengeRating: string;
  classes: Class[];
  conditionImmunities: string[];
  copper: number;
  currentHp: number;
  damageImmunities: CharacterDamageAdjustment[];
  damageResistances: CharacterDamageAdjustment[];
  damageVulnerabilities: CharacterDamageAdjustment[];
  description: string; // Markdown string, represented as a string in TypeScript
  electrum: number;
  eyes: string;
  exp: number;
  gold: number;
  hair: string;
  height: string;
  hitDice: string;
  imageUri: string;
  initiativeBonus: number;
  isBackstoryPublic: boolean;
  isSpellcaster: boolean;
  itemsWithActions: ExportedItem[];
  legendary: boolean;
  maxHp: number;
  movementModes: MovementMode[];
  name: string;
  platinum: number;
  proficiencies: Proficiency[];
  proficiencyBonus: number;
  race: string;
  senses: Sense[];
  silver: number;
  skills: Skill[];
  skin: string;
  size: string;
  speed: number;
  spells: Spell[];
  spellcastingAbility: string;
  spellFilters: string[];
  spellSlots: SpellSlot[];
  systemKey: string;
  textBlocks: TextBlockSection[];
  trackers: Tracker[];
  type: string;
  typeTags: string[];
  weight: string;
};

export type AbilityScores = {
  name: string;
  value: number;
};

export type Action = {
  ability: string;
  actionType: string;
  bonus: number;
  crit: number;
  damageRolls: ActionStepDamage[];
  isProficient: boolean;
  isRanged: boolean;
  name: string;
  range: number;
  longRange: number;
  rollsAttack: boolean;
  savingThrow: SavingThrow;
};

export type ActionStep = {
  description: string;
  name: string;
  sortOrder: number;
  steps: ActionStep[];
};

export type ActionStepAttack = {
  type: string;
  journalCommand: ActionStepJournalCommand;
  diceRoll: ActionStepDamage[];
  attack: ActionStepAttack;
  skillCheck: ActionStepSkillCheck;
};

export type ActionStepDamage = {
  characters: Character[];
};

export type ActionStepJournalCommand = {
  command: string;
  args: string;
};

export type ActionStepSkillCheck = {
  rollModifier: string;
  skillName: string;
};

export type CharacterDamageAdjustment = {
  condition: string;
  damageType: string;
};

export type Class = {
  class: string;
  level: number;
};

export type ExportedItem = {
  item: string;
  actions: Action[];
};

export type MovementMode = {
  distance: number;
  mode: string;
};

export type Proficiency = {
  name: string;
  type: string;
};

export type SavingThrow = {
  abilityName: string;
  difficultyClass: number;
};

export type Sense = {
  distance: number;
  name: string;
};

export type Skill = {
  abilityName: string;
  bonus: number;
  doubleProficiency: boolean;
  name: string;
  proficient: boolean;
};

export type Spell = {
  canBeCastAsRitual: boolean;
  canCastAtHigherLevel: boolean;
  castingTime: string;
  components: string[];
  damage: ActionStepDamage[];
  description: string;
  duration: string;
  higherLevelDescription: string;
  higherLevels: SpellHigherLevel[];
  level: number;
  materials: string;
  name: string;
  range: string;
  requiresConcentration: boolean;
  rollsAttack: boolean;
  savingThrow: SavingThrow;
  school: string;
  tags: string[];
};

export type SpellHigherLevel = {
  applyAtLevels: number[];
  damage: ActionStepDamage[];
  type: string;
};

export type SpellSlot = {
  max: number;
  remaining: number;
};

export type TextBlock = {
  body: string;
  title: string;
};

export type TextBlockSection = {
  textBlocks: TextBlock[];
  title: string;
};

export type Tracker = {
  color: string;
  max: number;
  name: string;
  type: string;
  value: number;
};
