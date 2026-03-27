const GRID_WIDTH = 7;
const GRID_HEIGHT = 7;
const TILE_SIZE = 50;
const GRID_OFFSET_X = 20;
const GRID_OFFSET_Y = 280;

const TILE_TYPES = [
    { name: 'health', color: 0xff1493, icon: '♥', effect: 'health' },
    { name: 'magic', color: 0x0000ff, icon: '📖', effect: 'magic' },
    { name: 'ranged', color: 0x00ff00, icon: '🏹', effect: 'ranged' },
    { name: 'physical', color: 0xff0000, icon: '⚔️', effect: 'physical' },
    { name: 'gold', color: 0xffff00, icon: '🪙', effect: 'gold' }
];

const MONSTER_AVATARS = ['�️', '👹', '👺', '🧟', '👾', '🤖', '🐉', '🕷️', '🦑'];
const MONSTER_NAMES = ['Red Squirrel', 'Pig Goblin', 'Orc Pig', 'Sloth Troll', 'Bunny Warlock', 'Hamster Skeleton'];
const PLAYER_AVATAR = '👸';

// Body configs for procedural character rendering
const PLAYER_BODY = {
    head: 0xffe0bd, headSize: 9, eyeColor: 0x2244aa,
    torso: 0x3366cc, torsoW: 14, torsoH: 16,
    armColor: 0x3366cc, legColor: 0x553311,
    skinColor: 0xffe0bd, hairColor: 0xcc8833, hairStyle: 'long',
    weaponColor: 0xaaaaaa, shieldColor: 0x886633,
    facingRight: true
};

const MONSTER_BODIES = [
    // Red Squirrel — sprite-based enemy (index 0)
    { head: 0x993311, headSize: 10, eyeColor: 0xff4400, torso: 0x774422, torsoW: 16, torsoH: 16, armColor: 0x993311, legColor: 0x553311, skinColor: 0x993311, hairColor: 0xcc4400, hairStyle: 'spikes', weaponColor: 0x664422, shieldColor: 0, facingRight: false, spriteKey: 'redsquirrel' },
    // Pig Goblin — sprite-based enemy (index 1)
    { head: 0x668833, headSize: 10, eyeColor: 0xffaa00, torso: 0x556b2f, torsoW: 15, torsoH: 16, armColor: 0x668833, legColor: 0x445522, skinColor: 0x668833, hairColor: 0x444422, hairStyle: 'none', weaponColor: 0x775533, shieldColor: 0, facingRight: false, spriteKey: 'skinnypiggoblin' },
    // Orc Pig — sprite-based enemy (index 2)
    { head: 0x557744, headSize: 11, eyeColor: 0xff6600, torso: 0x445533, torsoW: 18, torsoH: 18, armColor: 0x557744, legColor: 0x334422, skinColor: 0x557744, hairColor: 0x222211, hairStyle: 'none', weaponColor: 0x886644, shieldColor: 0, facingRight: false, spriteKey: 'orcpig' },
    // Sloth Troll — sprite-based enemy (index 3)
    { head: 0x4a5a3a, headSize: 12, eyeColor: 0x66ccaa, torso: 0x3d4a2e, torsoW: 20, torsoH: 20, armColor: 0x4a5a3a, legColor: 0x2e3a22, skinColor: 0x4a5a3a, hairColor: 0x2a3a1a, hairStyle: 'none', weaponColor: 0x7a6644, shieldColor: 0, facingRight: false, spriteKey: 'slothtroll' },
    // Bunny Warlock — sprite-based enemy (index 4)
    { head: 0x2a2a2a, headSize: 10, eyeColor: 0xcc2244, torso: 0x661133, torsoW: 15, torsoH: 16, armColor: 0x2a2a2a, legColor: 0x1a1a1a, skinColor: 0x2a2a2a, hairColor: 0x1a1a1a, hairStyle: 'none', weaponColor: 0x9933cc, shieldColor: 0, facingRight: false, spriteKey: 'bunnywarlock' },
    // Hamster Skeleton — sprite-based enemy (index 5)
    { head: 0xd4c9a8, headSize: 10, eyeColor: 0x44ff66, torso: 0xc8b898, torsoW: 15, torsoH: 16, armColor: 0xd4c9a8, legColor: 0xb8a888, skinColor: 0xd4c9a8, hairColor: 0xa89878, hairStyle: 'none', weaponColor: 0x888888, shieldColor: 0, facingRight: false, spriteKey: 'hamsterskeleton' }
];

const ITEM_RARITIES = [
    { name: 'Normal', weight: 60, affixes: 0, statMultiplier: 1.0, frameColor: 0xa3a3a3, textColor: '#d0d0d0' },
    { name: 'Magic', weight: 25, affixes: 2, statMultiplier: 1.1, frameColor: 0x5aa9ff, textColor: '#8ec5ff' },
    { name: 'Rare', weight: 12, affixes: 4, statMultiplier: 1.25, frameColor: 0xffd166, textColor: '#ffe08f' },
    { name: 'Legendary', weight: 3, affixes: 6, statMultiplier: 1.5, frameColor: 0xff7f11, textColor: '#ffb35c' }
];

const ITEM_BASES = [
    // --- Helmets ---
    { slotGroup: 'helmet', type: 'Helmet', baseName: 'Helm', icon: '🪖', description: 'A sturdy iron helm.', baseType: 'strength', baseStats: { armor: 4 } },
    { slotGroup: 'helmet', type: 'Helmet', baseName: 'Circlet', icon: '🪖', description: 'A circlet humming with arcane energy.', baseType: 'intelligence', baseStats: { energyShield: 4 } },
    { slotGroup: 'helmet', type: 'Helmet', baseName: 'Hood', icon: '🪖', description: 'A lightweight hood favoring agility.', baseType: 'dexterity', baseStats: { evasion: 4 } },
    // --- Chests ---
    { slotGroup: 'chest', type: 'Chest', baseName: 'Cuirass', icon: '🦺', description: 'Heavy plate that absorbs strikes.', baseType: 'strength', baseStats: { armor: 6, health: 4 } },
    { slotGroup: 'chest', type: 'Chest', baseName: 'Robe', icon: '🦺', description: 'A flowing robe threaded with mana.', baseType: 'intelligence', baseStats: { energyShield: 6, health: 4 } },
    { slotGroup: 'chest', type: 'Chest', baseName: 'Vest', icon: '🦺', description: 'Supple leather for nimble fighters.', baseType: 'dexterity', baseStats: { evasion: 6, health: 4 } },
    // --- Gloves ---
    { slotGroup: 'gloves', type: 'Gloves', baseName: 'Gauntlets', icon: '🧤', description: 'Iron gauntlets for crushing grip.', baseType: 'strength', baseStats: { armor: 3, physical: 1 } },
    { slotGroup: 'gloves', type: 'Gloves', baseName: 'Silk Wraps', icon: '🧤', description: 'Enchanted silk that channels spells.', baseType: 'intelligence', baseStats: { energyShield: 3, magic: 1 } },
    { slotGroup: 'gloves', type: 'Gloves', baseName: 'Bracers', icon: '🧤', description: 'Light bracers for precise strikes.', baseType: 'dexterity', baseStats: { evasion: 3, ranged: 1 } },
    // --- Boots ---
    { slotGroup: 'boots', type: 'Boots', baseName: 'Greaves', icon: '🥾', description: 'Plated boots for the front line.', baseType: 'strength', baseStats: { armor: 3 } },
    { slotGroup: 'boots', type: 'Boots', baseName: 'Slippers', icon: '🥾', description: 'Enchanted slippers of the magi.', baseType: 'intelligence', baseStats: { energyShield: 3 } },
    { slotGroup: 'boots', type: 'Boots', baseName: 'Striders', icon: '🥾', description: 'Nimble footwear for quick movement.', baseType: 'dexterity', baseStats: { evasion: 3 } },
    // --- Belts ---
    { slotGroup: 'belt', type: 'Belt', baseName: 'Warbelt', icon: '�', description: 'A heavy belt reinforcing stance.', baseType: 'strength', baseStats: { armor: 2, health: 6 } },
    { slotGroup: 'belt', type: 'Belt', baseName: 'Sash', icon: '🥋', description: 'A woven sash pulsing with mana.', baseType: 'intelligence', baseStats: { energyShield: 2, health: 6 } },
    { slotGroup: 'belt', type: 'Belt', baseName: 'Cord', icon: '🥋', description: 'A flexible cord for the agile.', baseType: 'dexterity', baseStats: { evasion: 2, health: 6 } },
    // --- Weapons (no base type) ---
    { slotGroup: 'mainhand', type: 'Sword', baseName: 'Longsword', icon: '⚔️', description: 'A balanced blade that excels at physical damage.', baseStats: { physical: 5 }, weaponClass: 'sword' },
    { slotGroup: 'mainhand', type: 'Wand', baseName: 'Wand', icon: '🪄', description: 'A conduit for arcane force and focused spellcraft.', baseStats: { magic: 5 }, weaponClass: 'wand' },
    { slotGroup: 'mainhand', type: 'Bow', baseName: 'Longbow', icon: '🏹', description: 'A two-handed bow tuned for ranged damage.', baseStats: { ranged: 6 }, weaponClass: 'bow', twoHanded: true },
    // --- Offhand ---
    { slotGroup: 'offhand', type: 'Shield', baseName: 'Buckler', icon: '🛡️', description: 'A sturdy iron shield.', baseType: 'strength', baseStats: { armor: 5 } },
    { slotGroup: 'offhand', type: 'Shield', baseName: 'Spirit Shield', icon: '🛡️', description: 'A shield woven from pure energy.', baseType: 'intelligence', baseStats: { energyShield: 5 } },
    { slotGroup: 'offhand', type: 'Shield', baseName: 'Deflector', icon: '🛡️', description: 'A light parrying shield.', baseType: 'dexterity', baseStats: { evasion: 5 } },
    // --- Rings ---
    { slotGroup: 'ring', type: 'Ring', baseName: 'Iron Ring', icon: '💍', description: 'A heavy iron band.', baseType: 'strength', baseStats: { armor: 1, physical: 1 } },
    { slotGroup: 'ring', type: 'Ring', baseName: 'Sapphire Ring', icon: '💍', description: 'A ring set with a glowing sapphire.', baseType: 'intelligence', baseStats: { energyShield: 1, magic: 1 } },
    { slotGroup: 'ring', type: 'Ring', baseName: 'Jade Ring', icon: '💍', description: 'A ring carved from jade.', baseType: 'dexterity', baseStats: { evasion: 1, ranged: 1 } },
    // --- Necklaces ---
    { slotGroup: 'necklace', type: 'Necklace', baseName: 'Gorget', icon: '📿', description: 'A heavy neck guard.', baseType: 'strength', baseStats: { armor: 2, health: 2 } },
    { slotGroup: 'necklace', type: 'Necklace', baseName: 'Pendant', icon: '📿', description: 'A pendant pulsing with arcane light.', baseType: 'intelligence', baseStats: { energyShield: 2, magic: 2 } },
    { slotGroup: 'necklace', type: 'Necklace', baseName: 'Talisman', icon: '📿', description: 'A talisman of keen reflexes.', baseType: 'dexterity', baseStats: { evasion: 2, ranged: 2 } }
];

const ITEM_PREFIXES = [
    { name: 'Brutal', stats: { physical: [1, 3] }, tags: ['strength'] },
    { name: 'Arcane', stats: { magic: [1, 3] }, tags: ['intelligence'] },
    { name: 'Deadeye', stats: { ranged: [1, 3] }, tags: ['dexterity'] },
    { name: 'Stalwart', stats: { armor: [2, 5] }, tags: ['strength'] },
    { name: 'Vital', stats: { health: [5, 14] }, tags: [] },
    { name: 'Prosperous', stats: { magicFind: [3, 10] }, tags: [] },
    { name: 'Cruel', stats: { physical: [2, 6] }, tags: ['strength'] },
    { name: 'Runic', stats: { magic: [2, 6] }, tags: ['intelligence'] },
    { name: 'Sharpened', stats: { ranged: [1, 4], physical: [1, 2] }, tags: ['dexterity', 'strength'] },
    { name: 'Fortified', stats: { armor: [3, 8], health: [3, 7] }, tags: ['strength'] },
    { name: 'Vampiric', stats: { health: [4, 10], physical: [1, 2] }, tags: ['strength'] },
    { name: 'Gilded', stats: { magicFind: [4, 14] }, tags: [] },
    { name: 'Nimble', stats: { ranged: [1, 3], evasion: [1, 2] }, tags: ['dexterity'] },
    { name: 'Sorcerous', stats: { magic: [2, 5], energyShield: [1, 4] }, tags: ['intelligence'] },
    { name: 'Warding', stats: { energyShield: [2, 5] }, tags: ['intelligence'] },
    { name: 'Evasive', stats: { evasion: [2, 5] }, tags: ['dexterity'] }
];

const ITEM_SUFFIXES = [
    { name: 'of Slaying', stats: { physical: [1, 3], magic: [1, 2] }, tags: ['strength', 'intelligence'] },
    { name: 'of Focus', stats: { magic: [1, 4] }, tags: ['intelligence'] },
    { name: 'of Precision', stats: { ranged: [1, 4] }, tags: ['dexterity'] },
    { name: 'of Guarding', stats: { armor: [2, 5] }, tags: ['strength'] },
    { name: 'of Vitality', stats: { health: [6, 16] }, tags: [] },
    { name: 'of Fortune', stats: { magicFind: [4, 12] }, tags: [] },
    { name: 'of Carnage', stats: { physical: [2, 7] }, tags: ['strength'] },
    { name: 'of the Magi', stats: { magic: [2, 7] }, tags: ['intelligence'] },
    { name: 'of the Hawk', stats: { ranged: [2, 6] }, tags: ['dexterity'] },
    { name: 'of the Fortress', stats: { armor: [3, 9], health: [3, 7] }, tags: ['strength'] },
    { name: 'of Regeneration', stats: { health: [8, 20] }, tags: [] },
    { name: 'of Plunder', stats: { magicFind: [6, 16] }, tags: [] },
    { name: 'of Devastation', stats: { physical: [2, 5], ranged: [1, 3] }, tags: ['strength', 'dexterity'] },
    { name: 'of the Archmage', stats: { magic: [2, 5], energyShield: [2, 5] }, tags: ['intelligence'] },
    { name: 'of Reflexes', stats: { evasion: [2, 6] }, tags: ['dexterity'] },
    { name: 'of Shielding', stats: { energyShield: [2, 6] }, tags: ['intelligence'] }
];

const EQUIPMENT_SLOT_GROUP_BY_KEY = {
    helmet: 'helmet',
    chest: 'chest',
    gloves: 'gloves',
    boots: 'boots',
    belt: 'belt',
    mainhand: 'mainhand',
    offhand: 'offhand',
    ring1: 'ring',
    ring2: 'ring',
    necklace: 'necklace'
};

const ACTIVE_SKILL_GEMS = [
    {
        id: 'cleave',
        name: 'Cleave',
        tileEffect: 'physical',
        baseThreshold: 4,
        mode: 'damage',
        basePower: 24,
        scalingStat: 'physical'
    },
    {
        id: 'minute-missles',
        name: 'Minute Missles',
        tileEffect: 'magic',
        baseThreshold: 4,
        mode: 'damage',
        basePower: 26,
        scalingStat: 'magic'
    },
    {
        id: 'multishot',
        name: 'Multishot',
        tileEffect: 'ranged',
        baseThreshold: 4,
        mode: 'damage',
        basePower: 22,
        scalingStat: 'ranged'
    },
    {
        id: 'rejuvenate',
        name: 'Rejuvenate',
        tileEffect: 'health',
        baseThreshold: 4,
        mode: 'heal',
        basePower: 22,
        scalingStat: 'health'
    },
    {
        id: 'gold-rush',
        name: 'Gold Rush',
        tileEffect: 'gold',
        baseThreshold: 4,
        mode: 'gold',
        basePower: 16,
        scalingStat: 'magicFind'
    },
    {
        id: 'duck-and-roll',
        name: 'Duck and Roll',
        tileEffect: 'ranged',
        baseThreshold: 4,
        mode: 'damage',
        basePower: 20,
        scalingStat: 'ranged'
    },
    {
        id: 'energy-beam',
        name: 'Energy Beam',
        tileEffect: 'magic',
        baseThreshold: 4,
        mode: 'damage',
        basePower: 28,
        scalingStat: 'magic'
    },
    {
        id: 'reckless-attack',
        name: 'Reckless Attack',
        tileEffect: 'physical',
        baseThreshold: 5,
        mode: 'damage',
        basePower: 30,
        scalingStat: 'physical'
    }
];

const SUPPORT_SKILL_GEMS = [
    {
        id: 'focus',
        name: 'Focus',
        short: 'Fcs',
        thresholdDelta: -1,
        powerMultiplier: 0.14,
        lootFlat: 0,
        healFlat: 0,
        extraHitChance: 0
    },
    {
        id: 'brutality',
        name: 'Brutality',
        short: 'Brt',
        thresholdDelta: 1,
        powerMultiplier: 0.46,
        lootFlat: 0,
        healFlat: 0,
        extraHitChance: 0
    },
    {
        id: 'echo',
        name: 'Echo',
        short: 'Ech',
        thresholdDelta: 0,
        powerMultiplier: 0.08,
        lootFlat: 0,
        healFlat: 0,
        extraHitChance: 0.3
    },
    {
        id: 'vitality',
        name: 'Vitality',
        short: 'Vit',
        thresholdDelta: 0,
        powerMultiplier: 0.08,
        lootFlat: 0,
        healFlat: 8,
        extraHitChance: 0
    },
    {
        id: 'prosperity',
        name: 'Prosperity',
        short: 'Prs',
        thresholdDelta: 0,
        powerMultiplier: 0,
        goldFlat: 12,
        healFlat: 0,
        extraHitChance: 0
    }
];

const SKILL_ICON_MAP = {
    'cleave': 'skill_cleave',
    'minute-missles': 'skill_minutemissles',
    'multishot': 'skill_multishot',
    'duck-and-roll': 'skill_duckandroll',
    'energy-beam': 'skill_energybeam',
    'reckless-attack': 'skill_recklessattack'
};

// ---------------------------------------------------------------------------
// Talent Tree — 9 nodes across Strength / Intelligence / Dexterity branches.
// col/row are the original grid coordinates from the tree designer (used to
// compute pixel positions on the talent screen).
// prereqs: node IDs that must be allocated before this node unlocks.
// ---------------------------------------------------------------------------
// Talent tree from talent-tree-config.json. Each node grants a stat bonus.
// Any node can be allocated as long as the player has a talent point.
// ---------------------------------------------------------------------------
const TALENT_TREE_NODES = [
    // --- Starting nodes (center) ---
    { id: 1,  name: 'Strength',       icon: '⚔️', stat: 'strength',       value: 10, shortDesc: '+10 STR',       x: 180, y: 430, color: 0xff4747 },
    { id: 2,  name: 'Dexterity',      icon: '🏹', stat: 'dexterity',      value: 10, shortDesc: '+10 DEX',       x: 210, y: 460, color: 0x0fb836 },
    { id: 3,  name: 'Intelligence',   icon: '📖', stat: 'intelligence',   value: 10, shortDesc: '+10 INT',       x: 150, y: 460, color: 0x1131d1 },
    // --- Strength inner branch (up from center) ---
    { id: 13, name: 'Strength',       icon: '⚔️', stat: 'strength',       value: 10, shortDesc: '+10 STR',       x: 180, y: 400, color: 0xff4747 },
    { id: 11, name: 'Physical Dmg',   icon: '💥', stat: 'physicalDamage', value: 4,  shortDesc: '+4% Phys Dmg',  x: 180, y: 370, color: 0xff4747 },
    { id: 26, name: 'Strength',       icon: '⚔️', stat: 'strength',       value: 10, shortDesc: '+10 STR',       x: 180, y: 340, color: 0xff4747 },
    { id: 27, name: 'Armour',         icon: '🛡️', stat: 'armor',          value: 4,  shortDesc: '+4% Armour',    x: 180, y: 310, color: 0xff4747 },
    // --- Left branch from Armour (Physical + Red Tile Chance) ---
    { id: 31, name: 'Strength',       icon: '⚔️', stat: 'strength',       value: 10, shortDesc: '+10 STR',       x: 150, y: 310, color: 0xff4747 },
    { id: 32, name: 'Physical Dmg',   icon: '💥', stat: 'physicalDamage', value: 4,  shortDesc: '+4% Phys Dmg',  x: 120, y: 310, color: 0xff4747 },
    { id: 33, name: 'Red Tile Chance', icon: '🔴', stat: 'redTileChance', value: 1,  shortDesc: '+1% Red Tile',  x: 90,  y: 310, color: 0xff4747 },
    // --- Up branch from Armour (Red Tile → See Red keystone) ---
    { id: 50, name: 'Red Tile Chance', icon: '🔴', stat: 'redTileChance', value: 1,  shortDesc: '+1% Red Tile',  x: 210, y: 280, color: 0xff4747 },
    { id: 57, name: 'Red Tile Chance', icon: '🔴', stat: 'redTileChance', value: 1,  shortDesc: '+1% Red Tile',  x: 240, y: 250, color: 0xff4747 },
    { id: 58, name: 'Red Tile Chance', icon: '🔴', stat: 'redTileChance', value: 1,  shortDesc: '+1% Red Tile',  x: 270, y: 220, color: 0xff4747 },
    { id: 59, name: 'See Red',        icon: '👁️', stat: 'seeRed',        value: 1,  shortDesc: '2x Red Dmg',   x: 300, y: 250, color: 0xff4747, isKeystone: true },
    // --- Right branch from Armour (Health → Block Chance) ---
    { id: 34, name: 'Health',         icon: '❤️', stat: 'health',         value: 2,  shortDesc: '+2% Health',    x: 210, y: 310, color: 0xff4747 },
    { id: 35, name: 'Armour',         icon: '🛡️', stat: 'armor',          value: 4,  shortDesc: '+4% Armour',    x: 240, y: 310, color: 0xff4747 },
    { id: 36, name: 'Strength',       icon: '⚔️', stat: 'strength',       value: 10, shortDesc: '+10 STR',       x: 270, y: 310, color: 0xff4747 },
    { id: 38, name: 'Block Chance',   icon: '🔰', stat: 'blockChance',   value: 2,  shortDesc: '+2% Block',     x: 300, y: 310, color: 0xff4747 },
    { id: 39, name: 'Strength',       icon: '⚔️', stat: 'strength',       value: 10, shortDesc: '+10 STR',       x: 330, y: 310, color: 0xff4747 },
    { id: 40, name: 'Block Chance',   icon: '🔰', stat: 'blockChance',   value: 2,  shortDesc: '+2% Block',     x: 360, y: 310, color: 0xff4747 },
    // --- Health right-side path ---
    { id: 42, name: 'Health',         icon: '❤️', stat: 'health',         value: 2,  shortDesc: '+2% Health',    x: 270, y: 340, color: 0xff4747 },
    { id: 44, name: 'Strength',       icon: '⚔️', stat: 'strength',       value: 10, shortDesc: '+10 STR',       x: 270, y: 370, color: 0xff4747 },
    { id: 43, name: 'Health',         icon: '❤️', stat: 'health',         value: 2,  shortDesc: '+2% Health',    x: 270, y: 400, color: 0xff4747 },
    { id: 47, name: 'Health',         icon: '❤️', stat: 'health',         value: 2,  shortDesc: '+2% Health',    x: 240, y: 370, color: 0xff4747 },
    { id: 46, name: 'Health',         icon: '❤️', stat: 'health',         value: 2,  shortDesc: '+2% Health',    x: 210, y: 400, color: 0xff4747 },
    { id: 54, name: 'Juggernaut',     icon: '🏋️', stat: 'juggernaut',    value: 1,  shortDesc: '2x Gear HP',   x: 233, y: 423, color: 0xff4747, isKeystone: true },
    // --- Intelligence branch (down-left) ---
    { id: 14, name: 'Intelligence',   icon: '📖', stat: 'intelligence',   value: 10, shortDesc: '+10 INT',       x: 120, y: 490, color: 0x1131d1 },
    { id: 15, name: 'Magic Dmg',      icon: '✨', stat: 'magicDamage',    value: 4,  shortDesc: '+4% Magic Dmg', x: 90,  y: 520, color: 0x1131d1 },
    { id: 60, name: 'Intelligence',   icon: '📖', stat: 'intelligence',   value: 10, shortDesc: '+10 INT',       x: 60,  y: 550, color: 0x1131d1 },
    { id: 61, name: 'Energy Shield',  icon: '💠', stat: 'energyShield',  value: 4,  shortDesc: '+4% E.Shield',  x: 30,  y: 580, color: 0x1131d1 },
    // --- Dexterity branch (down-right) ---
    { id: 19, name: 'Dexterity',      icon: '🏹', stat: 'dexterity',      value: 10, shortDesc: '+10 DEX',       x: 240, y: 490, color: 0x0fb836 },
    { id: 18, name: 'Ranged Dmg',     icon: '🎯', stat: 'rangedDamage',  value: 4,  shortDesc: '+4% Range Dmg', x: 270, y: 520, color: 0x0fb836 },
    { id: 62, name: 'Dexterity',      icon: '🏹', stat: 'dexterity',      value: 10, shortDesc: '+10 DEX',       x: 300, y: 550, color: 0x0fb836 },
    { id: 64, name: 'Evasion',        icon: '💨', stat: 'evasion',        value: 4,  shortDesc: '+4% Evasion',   x: 330, y: 580, color: 0x0fb836 },
    // --- Dexterity loop (right side going up, back to Health) ---
    { id: 68, name: 'Health',         icon: '❤️', stat: 'health',         value: 2,  shortDesc: '+2% Health',    x: 330, y: 550, color: 0xff4747 },
    { id: 66, name: 'Evasion',        icon: '💨', stat: 'evasion',        value: 4,  shortDesc: '+4% Evasion',   x: 330, y: 520, color: 0x0fb836 },
    { id: 67, name: 'Dexterity',      icon: '🏹', stat: 'dexterity',      value: 10, shortDesc: '+10 DEX',       x: 330, y: 490, color: 0x0fb836 },
    { id: 69, name: 'Health',         icon: '❤️', stat: 'health',         value: 2,  shortDesc: '+2% Health',    x: 330, y: 460, color: 0xff4747 },
    { id: 70, name: 'Dexterity',      icon: '🏹', stat: 'dexterity',      value: 10, shortDesc: '+10 DEX',       x: 300, y: 430, color: 0x0fb836 }
];

// Spread talent nodes apart from center so connection lines are visible
(function() {
    const cx = 195, cy = 400, spread = 1.5;
    TALENT_TREE_NODES.forEach(n => {
        n.x = Math.round(cx + (n.x - cx) * spread);
        n.y = Math.round(cy + (n.y - cy) * spread);
    });
})();

const TALENT_TREE_CONNECTIONS = [
    // Strength inner branch
    { from: 1,  to: 13 }, { from: 13, to: 11 }, { from: 11, to: 26 }, { from: 26, to: 27 },
    // Left branch from Armour
    { from: 27, to: 31 }, { from: 31, to: 32 }, { from: 32, to: 33 },
    // Up branch from Armour (Red Tile → See Red)
    { from: 27, to: 50 }, { from: 50, to: 57 }, { from: 57, to: 58 }, { from: 58, to: 59 },
    // Right branch from Armour (Health/Block)
    { from: 27, to: 34 }, { from: 34, to: 35 }, { from: 35, to: 36 },
    { from: 36, to: 38 }, { from: 38, to: 39 }, { from: 39, to: 40 },
    // Health right-side path
    { from: 36, to: 42 }, { from: 42, to: 44 }, { from: 44, to: 43 },
    { from: 43, to: 47 }, { from: 47, to: 46 },
    // Juggernaut
    { from: 46, to: 54 },
    // Intelligence branch
    { from: 3,  to: 14 }, { from: 14, to: 15 }, { from: 15, to: 60 }, { from: 60, to: 61 },
    // Dexterity branch
    { from: 2,  to: 19 }, { from: 19, to: 18 }, { from: 18, to: 62 }, { from: 62, to: 64 },
    // Dexterity loop back to Health
    { from: 64, to: 68 }, { from: 68, to: 66 }, { from: 66, to: 67 },
    { from: 67, to: 69 }, { from: 69, to: 70 }, { from: 70, to: 43 }
];

class Match3Scene extends Phaser.Scene {
    constructor() {
        super('Match3Scene');
        this.grid = [];
        this.tileSprites = [];
        this.dragStart = null;
        this.isSwapping = false;
        this.score = 0;
        this.player = {
            health: 20,
            currentShield: 0,
            physical: 0,
            magic: 0,
            ranged: 0,
            gold: 0,
            strength: 10,
            intelligence: 10,
            dexterity: 10,
            equipment: {
                helmet: 'None',
                chest: 'None',
                gloves: 'None',
                boots: 'None',
                belt: 'None',
                mainhand: 'None',
                offhand: 'None',
                ring1: 'None',
                ring2: 'None',
                necklace: 'None'
            },
            talentPoints: 0
        };
        this.enemies = [];
        this.targetEnemyIndex = 0;
        this.encounterSize = 1;
        this.playerStatsText = null;
        this.playerAvatar = null;
        this.playerBodyContainer = null;
        this.playerBodyParts = null;
        this.playerIdleTweens = [];
        this.playerShieldBarBg = null;
        this.playerShieldBar = null;
        this.playerShieldLabel = null;
        this.playerShieldText = null;
        this.playerHealthBarBg = null;
        this.playerHealthBar = null;
        this.enemyEncounterLabel = null;
        this.combatLog = [];
        this.combatLogTexts = [];
        this.maxCombatLogLines = 3;

        this.boardContainer = null;
        this.hudContainer = null;
        this.equipmentScreenGroup = null;
        this.talentScreenGroup = null;
        this.storeScreenGroup = null;
        this.storeItems = [];
        this.storeItemCards = [];
        this.storeGoldLabel = null;
        this.talentNodeUI = {};
        this.talentPointsLabel = null;
        this.talentConnectionGraphics = null;
        this.currentScreen = 'game';
        this.combatLogTexts = [];
        this.maxCombatLogLines = 3;

        this.maxInventorySlots = 12;
        this.itemIdCounter = 0;
        this.inventory = this.generateStarterInventory();
        this.equippedItems = {};
        this.allocatedTalents = new Set();
        this.inventoryTiles = [];
        this.selectedInventoryItem = null;
        this.selectedItemSource = null;
        this.selectedEquippedSlot = null;
        this.inventoryModal = null;
        this.inventoryModalIcon = null;
        this.inventoryModalName = null;
        this.inventoryModalType = null;
        this.inventoryModalDesc = null;
        this.inventoryModalStats = null;
        this.inventoryModalEquipBtn = null;
        this.inventoryModalRemoveBtn = null;
        this.inventoryModalSellBtn = null;
        this.rewardScreenGroup = null;
        this.rewardLootInfoText = null;
        this.rewardCards = [];
        this.rewardChoices = [];
        this.awaitingRewardChoice = false;
        this.battleNumber = 1;

        this.skillBarContainer = null;
        this.skillSlotUI = [];
        this.skillInfoPopup = null;
        this.skillLongPressTimer = null;
        this.playerSkills = this.createInitialSkillLoadout();
        this.skillCharge = this.createInitialSkillCharge();
        this.skillChargeFxContainer = null;

        this.goldDisplayText = null;
        this.goldDisplayIcon = null;

        this.skillsScreenGroup = null;
        this.skillsActiveSlotUI = [];
        this.skillsInventoryGems = this.createSkillGemInventoryPool();
        this.skillsInventoryTiles = [];
        this.selectedSkillGem = null;
        this.selectedGemInventoryIndex = -1;
        this.skillsGemModal = null;
        this.skillsGemModalTitle = null;
        this.skillsGemModalIcon = null;
        this.skillsGemModalIconImage = null;
        this.skillsGemModalName = null;
        this.skillsGemModalType = null;
        this.skillsGemModalDesc = null;
        this.skillsGemModalEquipBtn = null;
        this.skillsGemModalDiscardBtn = null;
        this.draggingSkillGemTile = null;
        this.skillGemWasDragged = false;
        this.armedEquipGem = null;
        this.justDroppedSkillGem = false;
    }

    // --- Multi-enemy encounter helpers ---

    getEncounterSize(battleNumber) {
        if (battleNumber <= 2) return 1;
        if (battleNumber <= 4) return Phaser.Math.Between(1, 2);
        if (battleNumber <= 7) return Phaser.Math.Between(1, 3);
        return Phaser.Math.Between(2, 4);
    }

    getEnemyGroupStats(battleNumber, enemyCount) {
        const baseHP = 22 + (battleNumber - 1) * 10;
        const baseAtk = 1 + Math.floor((battleNumber - 1) * 0.8);
        if (enemyCount === 1) return { hp: baseHP, atk: baseAtk };
        const hpPerEnemy = Math.floor(baseHP * 0.85 / enemyCount);
        const atkPerEnemy = Math.max(1, Math.floor(baseAtk * 0.9 / enemyCount));
        return { hp: hpPerEnemy, atk: atkPerEnemy };
    }

    getEnemyPositions(count) {
        const rightCX = 293;
        if (count === 1) return [{ x: rightCX, y: 88, scale: 1.0, barW: 166, barY: 174 }];
        if (count === 2) return [
            { x: rightCX - 32, y: 72, scale: 0.78, barW: 80, barY: 138 },
            { x: rightCX + 32, y: 72, scale: 0.78, barW: 80, barY: 152 }
        ];
        if (count === 3) return [
            { x: rightCX - 36, y: 58, scale: 0.68, barW: 70, barY: 116 },
            { x: rightCX + 36, y: 58, scale: 0.68, barW: 70, barY: 130 },
            { x: rightCX,      y: 118, scale: 0.68, barW: 70, barY: 172 }
        ];
        return [
            { x: rightCX - 36, y: 48, scale: 0.62, barW: 64, barY: 100 },
            { x: rightCX + 36, y: 48, scale: 0.62, barW: 64, barY: 114 },
            { x: rightCX - 36, y: 120, scale: 0.62, barW: 64, barY: 170 },
            { x: rightCX + 36, y: 120, scale: 0.62, barW: 64, barY: 184 }
        ];
    }

    getAliveEnemies() {
        return this.enemies.filter(e => e.alive);
    }

    getTargetEnemy() {
        // Return the player-selected target if alive, otherwise fall back to first alive
        if (this.targetEnemyIndex >= 0 && this.targetEnemyIndex < this.enemies.length
            && this.enemies[this.targetEnemyIndex].alive) {
            return this.enemies[this.targetEnemyIndex];
        }
        const fallback = this.enemies.find(e => e.alive);
        if (fallback) this.targetEnemyIndex = this.enemies.indexOf(fallback);
        return fallback || null;
    }

    allEnemiesDead() {
        return this.enemies.length > 0 && this.enemies.every(e => !e.alive);
    }

    stopAllParticleEffects() {
        if (this.skillChargeFxContainer) {
            this.skillChargeFxContainer.each(child => child.destroy());
            this.skillChargeFxContainer.removeAll();
        }
        this.tweens.killAll();
    }

    destroyAllEnemyUI() {
        this.enemies.forEach(enemy => {
            enemy.idleTweens.forEach(t => t.remove());
            enemy.idleTweens.length = 0;
            if (enemy.enemySprite) enemy.enemySprite.destroy();
            else if (enemy.bodyContainer) enemy.bodyContainer.destroy();
            if (enemy.healthBar) enemy.healthBar.destroy();
            if (enemy.healthBarBg) enemy.healthBarBg.destroy();
            if (enemy.healthText) enemy.healthText.destroy();
            if (enemy.nameText) enemy.nameText.destroy();
            if (enemy.targetMarker) enemy.targetMarker.destroy();
        });
        this.enemies = [];
    }

    buildEnemyGroup(battleNumber, hudContainer) {
        this.destroyAllEnemyUI();
        this.targetEnemyIndex = 0;
        const count = this.encounterSize;
        const stats = this.getEnemyGroupStats(battleNumber, count);
        const positions = this.getEnemyPositions(count);

        // Update encounter label
        if (this.enemyEncounterLabel) {
            if (count === 1) {
                this.enemyEncounterLabel.setText('');
            } else {
                this.enemyEncounterLabel.setText(`${count} Foes`);
            }
        }

        for (let i = 0; i < count; i++) {
            let monsterIndex;
            if (battleNumber === 1 && i === 0) {
                monsterIndex = 0; // Red Squirrel for the first battle
            } else if (battleNumber === 2 && i === 0) {
                monsterIndex = 1; // Pig Goblin for the second battle
            } else if (battleNumber === 3 && i === 0) {
                monsterIndex = 2; // Orc Pig for the third battle
            } else if (battleNumber === 4 && i === 0) {
                monsterIndex = 3; // Sloth Troll for the fourth battle
            } else if (battleNumber === 5 && i === 0) {
                monsterIndex = 4; // Bunny Warlock for the fifth battle
            } else if (battleNumber === 6 && i === 0) {
                monsterIndex = 5; // Hamster Skeleton for the sixth battle
            } else {
                monsterIndex = Phaser.Math.Between(0, MONSTER_BODIES.length - 1);
            }
            const pos = positions[i];
            const name = MONSTER_NAMES[monsterIndex];
            const bodyCfg = MONSTER_BODIES[monsterIndex];

            let bodyContainer, bodyParts, enemySprite = null;
            const idleTweens = [];

            if (bodyCfg.spriteKey) {
                // Sprite-based enemy
                enemySprite = this.add.sprite(pos.x, pos.y, bodyCfg.spriteKey).setOrigin(0.5, 0.5);
                enemySprite.setScale(pos.scale * 0.95);
                enemySprite.play(bodyCfg.spriteKey + '_idle');
                hudContainer.add(enemySprite);
                bodyContainer = enemySprite;
                bodyParts = null;
            } else {
                const body = this.buildCharacterBody(bodyCfg, pos.x, pos.y);
                body.container.setScale(pos.scale);
                hudContainer.add(body.container);
                this.startIdleAnimation(body.container, body.parts, idleTweens);
                bodyContainer = body.container;
                bodyParts = body.parts;
            }

            // Mini HP bar below body
            const barY = pos.barY;
            const barH = count === 1 ? 12 : 8;
            const hpBg = this.add.rectangle(pos.x, barY, pos.barW, barH, 0x444444).setOrigin(0.5, 0.5);
            hudContainer.add(hpBg);
            const hpBar = this.add.rectangle(pos.x, barY, pos.barW, barH, 0xff0000).setOrigin(0.5, 0.5);
            hudContainer.add(hpBar);
            const hpText = this.add.text(pos.x, barY, `${stats.hp} / ${stats.hp}`, { fontSize: count === 1 ? '9px' : '7px', color: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5);
            hudContainer.add(hpText);

            // Small name label (skip for 1 enemy - the main label handles it)
            let nameLabel = null;
            if (count > 1) {
                const nameFontSize = count <= 2 ? '9px' : '7px';
                nameLabel = this.add.text(pos.x, barY + barH / 2 + 5, name, {
                    fontSize: nameFontSize, color: '#ccc'
                }).setOrigin(0.5);
                hudContainer.add(nameLabel);
            }

            // Target marker above enemy head
            const markerY = pos.y - 60 * pos.scale;
            const marker = this.add.triangle(pos.x, markerY, 0, 8, 4, 0, 8, 8, 0xff4444, 0.9).setOrigin(0.5);
            marker.setVisible(false);
            hudContainer.add(marker);

            // Make enemy clickable to change target
            const clickTarget = enemySprite || bodyContainer;
            if (clickTarget) {
                clickTarget.setInteractive({ useHandCursor: true });
                const enemyIndex = i;
                clickTarget.on('pointerup', () => {
                    if (this.enemies[enemyIndex] && this.enemies[enemyIndex].alive) {
                        this.targetEnemyIndex = enemyIndex;
                        this.updateEnemyTargetMarkers();
                    }
                });
            }

            this.enemies.push({
                health: stats.hp,
                maxHealth: stats.hp,
                attack: stats.atk,
                name: name,
                bodyIndex: monsterIndex,
                bodyContainer: bodyContainer,
                bodyParts: bodyParts,
                enemySprite: enemySprite,
                idleTweens: idleTweens,
                healthBar: hpBar,
                healthBarBg: hpBg,
                healthText: hpText,
                nameText: nameLabel,
                targetMarker: marker,
                alive: true,
                pos: pos
            });
        }

        this.updateEnemyTargetMarkers();
    }

    updateEnemyTargetMarkers() {
        const target = this.getTargetEnemy();
        this.enemies.forEach(e => {
            if (e.targetMarker) {
                e.targetMarker.setVisible(e === target && e.alive);
            }
        });
    }

    preload() {
        // All assets already loaded by LoadScreen — nothing to do here
    }

    create() {
        console.log('Scene created!');

        // --- Warrior sprite animations (row 0=idle, 1=attack, 2=hit, 3=death) ---
        this.anims.create({ key: 'warrior_idle', frames: this.anims.generateFrameNumbers('warrior', { start: 0, end: 5 }), frameRate: 5, repeat: -1 });
        this.anims.create({ key: 'warrior_attack', frames: this.anims.generateFrameNumbers('warrior', { start: 6, end: 11 }), frameRate: 14, repeat: 0 });
        this.anims.create({ key: 'warrior_hit', frames: this.anims.generateFrameNumbers('warrior', { start: 12, end: 17 }), frameRate: 12, repeat: 0 });
        this.anims.create({ key: 'warrior_death', frames: this.anims.generateFrameNumbers('warrior', { start: 18, end: 23 }), frameRate: 8, repeat: 0 });

        // --- Red Squirrel sprite animations (row 0=idle, 1=attack, 2=hit, 3=death) ---
        this.anims.create({ key: 'redsquirrel_idle', frames: this.anims.generateFrameNumbers('redsquirrel', { start: 0, end: 5 }), frameRate: 3, repeat: -1 });
        this.anims.create({ key: 'redsquirrel_attack', frames: this.anims.generateFrameNumbers('redsquirrel', { start: 6, end: 11 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'redsquirrel_hit', frames: this.anims.generateFrameNumbers('redsquirrel', { start: 12, end: 17 }), frameRate: 6, repeat: 0 });
        this.anims.create({ key: 'redsquirrel_death', frames: this.anims.generateFrameNumbers('redsquirrel', { start: 18, end: 23 }), frameRate: 5, repeat: 0 });

        // --- Skinny Pig Goblin sprite animations (row 0=idle, 1=attack, 2=hit, 3=death) ---
        this.anims.create({ key: 'skinnypiggoblin_idle', frames: this.anims.generateFrameNumbers('skinnypiggoblin', { start: 0, end: 5 }), frameRate: 3, repeat: -1 });
        this.anims.create({ key: 'skinnypiggoblin_attack', frames: this.anims.generateFrameNumbers('skinnypiggoblin', { start: 6, end: 11 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'skinnypiggoblin_hit', frames: this.anims.generateFrameNumbers('skinnypiggoblin', { start: 12, end: 17 }), frameRate: 6, repeat: 0 });
        this.anims.create({ key: 'skinnypiggoblin_death', frames: this.anims.generateFrameNumbers('skinnypiggoblin', { start: 18, end: 23 }), frameRate: 5, repeat: 0 });

        // --- Orc Pig sprite animations (row 0=idle, 1=attack, 2=hit, 3=death) --- (flipped: animate backwards)
        this.anims.create({ key: 'orcpig_idle', frames: this.anims.generateFrameNumbers('orcpig', { start: 5, end: 0 }), frameRate: 3, repeat: -1 });
        this.anims.create({ key: 'orcpig_attack', frames: this.anims.generateFrameNumbers('orcpig', { start: 11, end: 6 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'orcpig_hit', frames: this.anims.generateFrameNumbers('orcpig', { start: 17, end: 12 }), frameRate: 6, repeat: 0 });
        this.anims.create({ key: 'orcpig_death', frames: this.anims.generateFrameNumbers('orcpig', { start: 23, end: 18 }), frameRate: 5, repeat: 0 });

        // Sloth Troll animations
        // Use only the most stable frames for subtle idle motion
        this.anims.create({ key: 'slothtroll_idle', frames: this.anims.generateFrameNumbers('slothtroll', { start: 0, end: 3 }), frameRate: 3, repeat: -1 });
        this.anims.create({ key: 'slothtroll_attack', frames: this.anims.generateFrameNumbers('slothtroll', { start: 6, end: 11 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'slothtroll_hit', frames: this.anims.generateFrameNumbers('slothtroll', { start: 12, end: 17 }), frameRate: 6, repeat: 0 });
        this.anims.create({ key: 'slothtroll_death', frames: this.anims.generateFrameNumbers('slothtroll', { start: 18, end: 23 }), frameRate: 5, repeat: 0 });

        // Bunny Warlock animations
        this.anims.create({ key: 'bunnywarlock_idle', frames: this.anims.generateFrameNumbers('bunnywarlock', { start: 0, end: 5 }), frameRate: 3, repeat: -1 });
        this.anims.create({ key: 'bunnywarlock_attack', frames: this.anims.generateFrameNumbers('bunnywarlock', { start: 6, end: 11 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'bunnywarlock_hit', frames: this.anims.generateFrameNumbers('bunnywarlock', { start: 12, end: 17 }), frameRate: 6, repeat: 0 });
        this.anims.create({ key: 'bunnywarlock_death', frames: this.anims.generateFrameNumbers('bunnywarlock', { start: 18, end: 23 }), frameRate: 5, repeat: 0 });

        // Hamster Skeleton animations (flipped: animate backwards)
        this.anims.create({ key: 'hamsterskeleton_idle', frames: this.anims.generateFrameNumbers('hamsterskeleton', { start: 5, end: 0 }), frameRate: 3, repeat: -1 });
        this.anims.create({ key: 'hamsterskeleton_attack', frames: this.anims.generateFrameNumbers('hamsterskeleton', { start: 11, end: 6 }), frameRate: 7, repeat: 0 });
        this.anims.create({ key: 'hamsterskeleton_hit', frames: this.anims.generateFrameNumbers('hamsterskeleton', { start: 17, end: 12 }), frameRate: 6, repeat: 0 });
        this.anims.create({ key: 'hamsterskeleton_death', frames: this.anims.generateFrameNumbers('hamsterskeleton', { start: 23, end: 18 }), frameRate: 5, repeat: 0 });

        this.boardContainer = this.add.container(0, 0);
        this.hudContainer = this.add.container(0, 0);
        this.skillChargeFxContainer = this.add.container(0, 0);
        this.skillChargeFxContainer.setDepth(1100);

        this.createGrid();
        this.renderGrid();
        this.createPlayerUI();
        this.player.health = this.getMaxHealth();
        this.refillEnergyShield();
        this.createCombatLog();
        this.createRewardScreen();
        this.createSkillBar();

        this.showGameScreen();
    }

    createInitialSkillLoadout() {
        return [
            { activeId: 'cleave', supportIds: ['focus', 'brutality', null] },
            { activeId: 'minute-missles', supportIds: ['echo', null, null] },
            { activeId: 'multishot', supportIds: ['vitality', null, null] }
        ];
    }

    createInitialSkillCharge() {
        return {
            physical: 0,
            magic: 0,
            ranged: 0,
            health: 0,
            gold: 0
        };
    }

    createSkillGemInventoryPool() {
        const activeGems = ACTIVE_SKILL_GEMS.map(skill => ({
            type: 'active',
            id: skill.id
        }));

        const supportGems = SUPPORT_SKILL_GEMS.map(gem => ({
            type: 'support',
            id: gem.id
        }));

        return [...activeGems, ...supportGems];
    }

    getActiveSkillById(skillId) {
        return ACTIVE_SKILL_GEMS.find(skill => skill.id === skillId) || null;
    }

    getSupportGemById(gemId) {
        return SUPPORT_SKILL_GEMS.find(gem => gem.id === gemId) || null;
    }

    getTileDataForEffect(effect) {
        return TILE_TYPES.find(tile => tile.effect === effect) || null;
    }

    toHexColor(colorNumber) {
        return `#${colorNumber.toString(16).padStart(6, '0')}`;
    }

    activateSkillSlot(slotIndex) {
        if (!this.playerSkills[slotIndex]) return;
        const loadout = this.playerSkills[slotIndex];
        const activeSkill = this.getActiveSkillById(loadout.activeId);
        if (!activeSkill) return;

        const threshold = this.getSkillTriggerThreshold(loadout);
        const currentCharge = this.skillCharge[activeSkill.tileEffect] || 0;
        if (currentCharge < threshold) {
            this.addCombatLog(`${activeSkill.name} not ready (${currentCharge}/${threshold})`, '#9b9b9b');
            return;
        }

        const gear = this.getEquippedStatTotals();
        const castResult = this.resolveSkillCastEffect(activeSkill, loadout, currentCharge, threshold, gear);
        this.skillCharge[activeSkill.tileEffect] = Math.max(0, currentCharge - threshold);

        if (castResult.enemyDamage > 0) {
            const target = this.getTargetEnemy();
            if (target) {
                target.health = Math.max(0, target.health - castResult.enemyDamage);
                this.showCombatMessage(
                    `${activeSkill.name} -${castResult.enemyDamage}`,
                    '#ffae57',
                    GRID_OFFSET_X + (GRID_WIDTH * TILE_SIZE) / 2,
                    GRID_OFFSET_Y - 15
                );
                // Player attack animation for skill cast
                if (this.playerSprite) {
                    this.playPlayerAttackAnim();
                }
                if (target.health > 0) {
                    this.time.delayedCall(100, () => this.playEnemyHitAnim(target));
                }
                if (target.health <= 0) {
                    this.handleEnemyDeath(target);
                }
            }
        }

        if (castResult.healAmount > 0) {
            this.player.health = Math.min(this.getMaxHealth(), this.player.health + castResult.healAmount);
            this.showCombatMessage(
                `${activeSkill.name} +${castResult.healAmount}`,
                '#8dff9b',
                GRID_OFFSET_X + (GRID_WIDTH * TILE_SIZE) / 2,
                GRID_OFFSET_Y + 20
            );
        }

        if (castResult.lootAmount > 0) {
            this.player.gold += castResult.lootAmount;
            this.addCombatLog(`Skill Gold: +${castResult.lootAmount}`, '#ffee75');
        }

        if (this.allEnemiesDead()) {
            if (!this.awaitingRewardChoice) {
                this.awaitingRewardChoice = true;
                this.stopAllParticleEffects();
                this.time.delayedCall(1500, () => this.showRewardScreen());
            }
            this.isSwapping = true;
        }

        this.updateSkillBarUI();
        this.updatePlayerUI();
        this.updateEnemyUI();
    }

    addSkillChargeFromMatches(matchCounts) {
        Object.entries(matchCounts).forEach(([effect, count]) => {
            if (!count || count <= 0) return;
            if (this.skillCharge[effect] === undefined) return;
            this.skillCharge[effect] += count;
        });
        this.updateSkillBarUI();
    }

    getSkillCardChargeTargets(effect) {
        if (!effect || !this.skillSlotUI || this.skillSlotUI.length === 0) {
            return [];
        }

        const targets = [];
        this.playerSkills.forEach((loadout, index) => {
            const activeSkill = this.getActiveSkillById(loadout.activeId);
            if (!activeSkill || activeSkill.tileEffect !== effect) return;

            const slotUI = this.skillSlotUI[index];
            if (!slotUI) return;

            targets.push({
                x: slotUI.centerX,
                y: slotUI.centerY,
                slotIndex: index
            });
        });

        return targets;
    }

    flashSkillCardCharge(slotIndex, color) {
        const slotUI = this.skillSlotUI[slotIndex];
        if (!slotUI) return;

        const flash = this.add.circle(slotUI.centerX, slotUI.centerY, slotUI.iconRadius + 4, color, 0.45)
            .setOrigin(0.5)
            .setDepth(1080);

        if (this.skillChargeFxContainer) {
            this.skillChargeFxContainer.add(flash);
        }

        this.tweens.add({
            targets: flash,
            alpha: 0,
            scaleX: 1.15,
            scaleY: 1.15,
            duration: 280,
            ease: 'Quad.easeOut',
            onComplete: () => flash.destroy()
        });

        // Update glow immediately after charge particle hits
        this.updateSkillBarUI();
    }

    launchChargeParticle(startX, startY, targetX, targetY, color, delay, onHit, durationMin = 680, durationMax = 980) {
        const orb = this.add.circle(startX, startY, Phaser.Math.Between(2, 4), color, 0.95).setDepth(1095);
        const glow = this.add.circle(startX, startY, Phaser.Math.Between(6, 10), color, 0.28).setDepth(1094);

        if (this.skillChargeFxContainer) {
            this.skillChargeFxContainer.add([glow, orb]);
        }

        const midX = (startX + targetX) / 2 + Phaser.Math.Between(-20, 20);
        const midY = Math.min(startY, targetY) - Phaser.Math.Between(25, 80);

        this.tweens.addCounter({
            from: 0,
            to: 1,
            delay,
            duration: Phaser.Math.Between(durationMin, durationMax),
            ease: 'Cubic.easeInOut',
            onUpdate: tween => {
                const t = tween.getValue();
                const oneMinusT = 1 - t;
                const x = oneMinusT * oneMinusT * startX + 2 * oneMinusT * t * midX + t * t * targetX;
                const y = oneMinusT * oneMinusT * startY + 2 * oneMinusT * t * midY + t * t * targetY;

                orb.setPosition(x, y);
                glow.setPosition(x, y);
                orb.setScale(1 - (t * 0.25));
                glow.setScale(1.1 - (t * 0.5));
                glow.setAlpha(0.28 * (1 - t));
            },
            onComplete: () => {
                orb.destroy();
                glow.destroy();
                if (onHit) onHit();
            }
        });
    }

    spawnSkillChargeParticles(matchedTiles) {
        if (!matchedTiles || matchedTiles.length === 0) return;

        const flashedSlots = new Set();

        matchedTiles.forEach((tile, tileIndex) => {
            if (tile.effect === 'gold') {
                const target = this.getGoldDisplayParticleTarget();
                if (target) {
                    const particleCount = Phaser.Math.Between(2, 3);
                    for (let i = 0; i < particleCount; i++) {
                        const startX = tile.x + Phaser.Math.Between(-8, 8);
                        const startY = tile.y + Phaser.Math.Between(-8, 8);
                        const delay = tileIndex * 22 + i * 58;
                        this.launchChargeParticle(
                            startX,
                            startY,
                            target.x,
                            target.y,
                            tile.color,
                            delay,
                            () => this.flashGoldDisplay(tile.color)
                        );
                    }
                }
                return;
            }

            if (tile.effect === 'health') {
                const target = this.getHealthBarParticleTarget();
                if (target) {
                    const particleCount = Phaser.Math.Between(2, 3);
                    for (let i = 0; i < particleCount; i++) {
                        const startX = tile.x + Phaser.Math.Between(-8, 8);
                        const startY = tile.y + Phaser.Math.Between(-8, 8);
                        const delay = tileIndex * 22 + i * 65;
                        this.launchHeartParticle(
                            startX,
                            startY,
                            target.x,
                            target.y,
                            delay,
                            () => this.flashHealthBar()
                        );
                    }
                }
                return;
            }

            const targets = this.getSkillCardChargeTargets(tile.effect);
            if (targets.length === 0) return;

            targets.forEach((target, targetIndex) => {
                const particleCount = Phaser.Math.Between(1, 2);

                for (let i = 0; i < particleCount; i++) {
                    const startX = tile.x + Phaser.Math.Between(-8, 8);
                    const startY = tile.y + Phaser.Math.Between(-8, 8);
                    const delay = tileIndex * 18 + targetIndex * 42 + i * 55;

                    this.launchChargeParticle(
                        startX,
                        startY,
                        target.x,
                        target.y,
                        tile.color,
                        delay,
                        () => {
                            if (flashedSlots.has(target.slotIndex)) return;
                            flashedSlots.add(target.slotIndex);
                            this.flashSkillCardCharge(target.slotIndex, tile.color);
                        }
                    );
                }
            });
        });
    }

    getGoldDisplayParticleTarget() {
        if (!this.goldDisplayText) return null;
        const x = this.goldDisplayText.x;
        const y = this.goldDisplayText.y;
        return { x, y };
    }

    flashGoldDisplay(color) {
        if (!this.goldDisplayText) return;

        this.tweens.add({
            targets: this.goldDisplayText,
            scaleX: 1.3,
            scaleY: 1.3,
            duration: 120,
            yoyo: true,
            ease: 'Quad.easeOut'
        });
    }

    getHealthBarParticleTarget() {
        if (!this.playerHealthBar) return null;
        const x = this.playerHealthBar.x + 83;
        const y = this.playerHealthBar.y;
        return { x, y };
    }

    launchHeartParticle(startX, startY, targetX, targetY, delay, onHit) {
        const heart = this.add.text(startX, startY, '♥', {
            fontSize: `${Phaser.Math.Between(10, 16)}px`,
            color: '#ff69b4'
        }).setOrigin(0.5).setDepth(1095).setAlpha(0.95);

        const glow = this.add.text(startX, startY, '♥', {
            fontSize: `${Phaser.Math.Between(18, 24)}px`,
            color: '#ff1493'
        }).setOrigin(0.5).setDepth(1094).setAlpha(0.25);

        if (this.skillChargeFxContainer) {
            this.skillChargeFxContainer.add([glow, heart]);
        }

        const midX = (startX + targetX) / 2 + Phaser.Math.Between(-25, 25);
        const midY = Math.min(startY, targetY) - Phaser.Math.Between(40, 100);

        this.tweens.addCounter({
            from: 0,
            to: 1,
            delay,
            duration: Phaser.Math.Between(750, 1050),
            ease: 'Cubic.easeInOut',
            onUpdate: tween => {
                const t = tween.getValue();
                const oneMinusT = 1 - t;
                const x = oneMinusT * oneMinusT * startX + 2 * oneMinusT * t * midX + t * t * targetX;
                const y = oneMinusT * oneMinusT * startY + 2 * oneMinusT * t * midY + t * t * targetY;

                heart.setPosition(x, y);
                glow.setPosition(x, y);
                heart.setScale(1 - (t * 0.3));
                glow.setScale(1.1 - (t * 0.5));
                glow.setAlpha(0.25 * (1 - t));
            },
            onComplete: () => {
                heart.destroy();
                glow.destroy();
                if (onHit) onHit();
            }
        });
    }

    flashHealthBar() {
        if (!this.playerHealthBar) return;

        const flash = this.add.rectangle(
            this.playerHealthBar.x + 83,
            this.playerHealthBar.y,
            this.playerHealthBar.width,
            this.playerHealthBar.height + 2,
            0xff69b4,
            0.55
        ).setOrigin(0.5).setDepth(1092);

        if (this.skillChargeFxContainer) {
            this.skillChargeFxContainer.add(flash);
        }

        this.tweens.add({
            targets: flash,
            alpha: 0,
            scaleY: 1.5,
            duration: 280,
            ease: 'Quad.easeOut',
            onComplete: () => flash.destroy()
        });
    }

    spawnComboTierEffect(centerX, centerY, color, rowLength, bonusUnits) {
        const ring = this.add.circle(centerX, centerY, 10, color, 0)
            .setStrokeStyle(3, color, 0.95)
            .setDepth(1096);
        const pulse = this.add.circle(centerX, centerY, 8, color, 0.4)
            .setDepth(1095);
        const text = this.add.text(centerX, centerY - 8, `${rowLength}x +${bonusUnits}`, {
            fontSize: rowLength >= 5 ? '20px' : '16px',
            color: '#ffffff',
            fontStyle: 'bold',
            stroke: this.toHexColor(color),
            strokeThickness: rowLength >= 5 ? 8 : 6
        }).setOrigin(0.5).setDepth(1097);

        if (this.skillChargeFxContainer) {
            this.skillChargeFxContainer.add([ring, pulse, text]);
        }

        this.tweens.add({
            targets: ring,
            scaleX: rowLength >= 5 ? 3.3 : 2.5,
            scaleY: rowLength >= 5 ? 3.3 : 2.5,
            alpha: 0,
            duration: rowLength >= 5 ? 1650 : 1350,
            ease: 'Cubic.easeOut',
            onComplete: () => ring.destroy()
        });

        this.tweens.add({
            targets: pulse,
            scaleX: rowLength >= 5 ? 1.9 : 1.5,
            scaleY: rowLength >= 5 ? 1.9 : 1.5,
            alpha: 0,
            duration: rowLength >= 5 ? 1450 : 1180,
            ease: 'Quad.easeOut',
            onComplete: () => pulse.destroy()
        });

        this.tweens.add({
            targets: text,
            y: centerY - 42,
            alpha: 0,
            duration: rowLength >= 5 ? 1700 : 1500,
            ease: 'Quad.easeOut',
            onComplete: () => text.destroy()
        });
    }

    spawnLShapeMatchEffect(shape, delay = 0) {
        if (!shape || !shape.tiles || shape.tiles.length < 5) return;

        const play = () => {
            const color = shape.color || 0xffffff;
            const cornerX = GRID_OFFSET_X + shape.corner.x * TILE_SIZE + TILE_SIZE / 2;
            const cornerY = GRID_OFFSET_Y + shape.corner.y * TILE_SIZE + TILE_SIZE / 2;

            const center = shape.tiles.reduce((acc, tile) => {
                acc.x += GRID_OFFSET_X + tile.x * TILE_SIZE + TILE_SIZE / 2;
                acc.y += GRID_OFFSET_Y + tile.y * TILE_SIZE + TILE_SIZE / 2;
                return acc;
            }, { x: 0, y: 0 });
            center.x /= shape.tiles.length;
            center.y /= shape.tiles.length;

            const cornerPulse = this.add.circle(cornerX, cornerY, 10, color, 0.35).setDepth(1098);
            const cornerRing = this.add.circle(cornerX, cornerY, 9, color, 0)
                .setStrokeStyle(3, color, 0.95)
                .setDepth(1099);
            const label = this.add.text(center.x, center.y - 10, 'L MATCH!', {
                fontSize: '18px',
                color: '#ffffff',
                fontStyle: 'bold',
                stroke: this.toHexColor(color),
                strokeThickness: 6
            }).setOrigin(0.5).setDepth(1100);

            if (this.skillChargeFxContainer) {
                this.skillChargeFxContainer.add([cornerPulse, cornerRing, label]);
            }

            shape.tiles.forEach((tile, index) => {
                const tileX = GRID_OFFSET_X + tile.x * TILE_SIZE + TILE_SIZE / 2;
                const tileY = GRID_OFFSET_Y + tile.y * TILE_SIZE + TILE_SIZE / 2;
                const marker = this.add.rectangle(tileX, tileY, TILE_SIZE - 12, TILE_SIZE - 12, color, 0)
                    .setStrokeStyle(2, color, 0.95)
                    .setDepth(1097);

                if (this.skillChargeFxContainer) {
                    this.skillChargeFxContainer.add(marker);
                }

                this.tweens.add({
                    targets: marker,
                    scaleX: 1.22,
                    scaleY: 1.22,
                    alpha: 0,
                    duration: 520,
                    delay: index * 55,
                    ease: 'Quad.easeOut',
                    onComplete: () => marker.destroy()
                });
            });

            this.tweens.add({
                targets: cornerPulse,
                scaleX: 2.4,
                scaleY: 2.4,
                alpha: 0,
                duration: 980,
                ease: 'Cubic.easeOut',
                onComplete: () => cornerPulse.destroy()
            });

            this.tweens.add({
                targets: cornerRing,
                scaleX: 3.0,
                scaleY: 3.0,
                alpha: 0,
                duration: 1100,
                ease: 'Cubic.easeOut',
                onComplete: () => cornerRing.destroy()
            });

            this.tweens.add({
                targets: label,
                y: center.y - 56,
                alpha: 0,
                duration: 1250,
                ease: 'Quad.easeOut',
                onComplete: () => label.destroy()
            });
        };

        if (delay > 0) {
            this.time.delayedCall(delay, play);
        } else {
            play();
        }
    }

    spawnComboBonusChargeParticles(comboSources) {
        if (!comboSources || comboSources.length === 0) return;

        comboSources.forEach((source, sourceIndex) => {
            const targets = this.getSkillCardChargeTargets(source.effect);
            if (targets.length === 0) return;

            targets.forEach((target, targetIndex) => {
                const particleCount = Math.min(8, 2 + Math.ceil(source.bonusUnits / 2));

                for (let i = 0; i < particleCount; i++) {
                    const delay = sourceIndex * 80 + targetIndex * 95 + i * 68;
                    this.launchChargeParticle(
                        source.x + Phaser.Math.Between(-14, 14),
                        source.y + Phaser.Math.Between(-14, 14),
                        target.x,
                        target.y,
                        source.color,
                        delay,
                        null,
                        980,
                        1400
                    );
                }
            });
        });
    }

    cycleSupportGem(slotIndex, socketIndex) {
        if (!this.playerSkills[slotIndex]) return;
        if (socketIndex < 0 || socketIndex > 2) return;

        const slot = this.playerSkills[slotIndex];
        const currentId = slot.supportIds[socketIndex] || null;
        const choices = [null, ...SUPPORT_SKILL_GEMS.map(gem => gem.id)];
        const currentChoiceIndex = choices.indexOf(currentId);
        const nextChoiceIndex = (currentChoiceIndex + 1) % choices.length;
        slot.supportIds[socketIndex] = choices[nextChoiceIndex];

        const supportName = choices[nextChoiceIndex]
            ? this.getSupportGemById(choices[nextChoiceIndex]).name
            : 'Empty';
        this.updateSkillBarUI();
        this.addCombatLog(`Skill ${slotIndex + 1} Support ${socketIndex + 1}: ${supportName}`, '#a8ffa8');
    }

    createSkillBar() {
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;
        this.skillBarContainer = this.add.container(0, 0);

        // Arrange skill slots along the bottom, not touching tiles
        // Leave at least 24px gap above the skillbar and 24px from screen edges
        const minGap = 24;
        const edgePad = 32;
        const bottomPad = 18;
        const iconDiameter = Math.min(170, Math.floor((width - 2 * edgePad - 2 * minGap) / 3));
        const iconRadius = iconDiameter / 2;
        const slotSpacing = minGap;
        // Place barY at the bottom, above bottomPad
        const barY = height - iconRadius - bottomPad;

        this.skillSlotUI = [];
        for (let i = 0; i < 3; i++) {
            // Center the three slots with even spacing
            const centerX = edgePad + iconRadius + i * (iconDiameter + slotSpacing);

            // Skill icon image
            const skillIcon = this.add.image(centerX, barY, 'skill_cleave')
                .setOrigin(0.5)
                .setVisible(false);

            // Skill icon text fallback (emoji for non-image skills)
            const skillIconText = this.add.text(centerX, barY, '', {
                fontSize: '32px'
            }).setOrigin(0.5).setVisible(false);

            // Invisible interactive hitbox on top
            const bg = this.add.rectangle(centerX, barY, iconDiameter + 12, iconDiameter + 12, 0x000000, 0)
                .setOrigin(0.5)
                .setInteractive({ useHandCursor: true });

            // Skill name label below icon
            const nameLabel = this.add.text(centerX, barY + iconRadius + 8, '', {
                fontSize: '11px',
                color: '#cccccc',
                fontStyle: 'bold'
            }).setOrigin(0.5);

            // Charge text below name
            const threshold = this.add.text(centerX, barY + iconRadius + 22, '', {
                fontSize: '10px',
                color: '#d5d5d5'
            }).setOrigin(0.5);

            // Long press: show popup; short tap: activate skill
            let pressStartTime = 0;
            let longPressTriggered = false;

            bg.on('pointerdown', (pointer) => {
                // If a skill gem is being dragged, do not start long press
                if (this.armedEquipGem) return;
                pressStartTime = Date.now();
                longPressTriggered = false;
                const slotIndex = i;
                this.skillLongPressTimer = this.time.delayedCall(400, () => {
                    longPressTriggered = true;
                    this.showSkillInfoPopup(slotIndex);
                });
            });

            bg.on('pointerup', () => {
                if (this.skillLongPressTimer) {
                    this.skillLongPressTimer.remove(false);
                    this.skillLongPressTimer = null;
                }
                // If a skill gem is being dragged, do not activate or show popup
                if (this.armedEquipGem) return;
                if (!longPressTriggered) {
                    this.activateSkillSlot(i);
                }
            });

            bg.on('pointerout', () => {
                if (this.skillLongPressTimer) {
                    this.skillLongPressTimer.remove(false);
                    this.skillLongPressTimer = null;
                }
            });

            this.skillSlotUI.push({
                bg, skillIcon, skillIconText,
                iconDiameter, iconRadius, centerX, centerY: barY,
                nameLabel, threshold, pulseTween: null
            });
            this.skillBarContainer.add([bg, skillIcon, skillIconText, nameLabel, threshold]);
        }

        // --- Skill Info Popup (hidden by default) ---
        this.skillInfoPopup = this.add.container(width / 2, height / 2).setVisible(false).setDepth(2000);
        const popupBg = this.add.rectangle(0, 0, 300, 180, 0x1a1a2e, 0.96)
            .setStrokeStyle(2, 0x6a6aff, 0.8)
            .setOrigin(0.5);
        const popupName = this.add.text(0, -65, '', {
            fontSize: '16px', color: '#ffffff', fontStyle: 'bold'
        }).setOrigin(0.5);
        const popupMode = this.add.text(0, -42, '', {
            fontSize: '12px', color: '#aaaaee'
        }).setOrigin(0.5);
        const popupDesc = this.add.text(0, -8, '', {
            fontSize: '11px', color: '#cccccc',
            wordWrap: { width: 270, useAdvancedWrap: true },
            align: 'center'
        }).setOrigin(0.5);
        const popupCharge = this.add.text(0, 40, '', {
            fontSize: '11px', color: '#aaddaa'
        }).setOrigin(0.5);
        const popupSupports = this.add.text(0, 58, '', {
            fontSize: '10px', color: '#bbbbbb',
            wordWrap: { width: 270, useAdvancedWrap: true },
            align: 'center'
        }).setOrigin(0.5);
        const popupCloseBtn = this.add.text(0, 80, '[  Close  ]', {
            fontSize: '12px', color: '#ffaaaa', fontStyle: 'bold'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        popupCloseBtn.on('pointerup', () => this.skillInfoPopup.setVisible(false));

        this.skillInfoPopup.add([popupBg, popupName, popupMode, popupDesc, popupCharge, popupSupports, popupCloseBtn]);
        this.skillInfoPopup.popupName = popupName;
        this.skillInfoPopup.popupMode = popupMode;
        this.skillInfoPopup.popupDesc = popupDesc;
        this.skillInfoPopup.popupCharge = popupCharge;
        this.skillInfoPopup.popupSupports = popupSupports;

        this.updateSkillBarUI();
    }

    showSkillInfoPopup(slotIndex) {
        const loadout = this.playerSkills[slotIndex];
        if (!loadout) return;
        const activeSkill = this.getActiveSkillById(loadout.activeId);
        if (!activeSkill) return;

        const tileData = this.getTileDataForEffect(activeSkill.tileEffect);
        const thresholdVal = this.getSkillTriggerThreshold(loadout);
        const currentCharge = this.skillCharge[activeSkill.tileEffect] || 0;

        const modeLabel = activeSkill.mode === 'damage' ? 'Deals damage to enemies'
            : (activeSkill.mode === 'heal' ? 'Restores your health' : 'Generates gold');

        const chargeSource = tileData ? tileData.name : activeSkill.tileEffect;
        const descText = `Charges from ${tileData ? tileData.icon : ''} ${chargeSource} tile matches. Base power: ${activeSkill.basePower}. Tap to activate when charged.`;

        const supportNames = (loadout.supportIds || [])
            .map(id => this.getSupportGemById(id))
            .filter(Boolean)
            .map(s => s.name);
        const supportText = supportNames.length > 0
            ? `Supports: ${supportNames.join(', ')}`
            : 'No support gems equipped';

        const popup = this.skillInfoPopup;
        popup.popupName.setText(activeSkill.name);
        popup.popupName.setColor(this.toHexColor(tileData ? tileData.color : 0xffffff));
        popup.popupMode.setText(modeLabel);
        popup.popupDesc.setText(descText);
        popup.popupCharge.setText(`Charge: ${currentCharge} / ${thresholdVal}`);
        popup.popupSupports.setText(supportText);
        popup.setVisible(true);
    }

    updateSkillBarUI() {
        if (!this.skillSlotUI || this.skillSlotUI.length === 0) return;

        this.skillSlotUI.forEach((slotUI, index) => {
            const loadout = this.playerSkills[index];
            const activeSkill = this.getActiveSkillById(loadout.activeId);
            if (!activeSkill) return;

            const tileData = this.getTileDataForEffect(activeSkill.tileEffect);
            const borderColor = tileData ? tileData.color : 0xffffff;
            const thresholdVal = this.getSkillTriggerThreshold(loadout);
            const currentCharge = this.skillCharge[activeSkill.tileEffect] || 0;
            const isReady = currentCharge >= thresholdVal;

            // Skill icon: use image for skills with art, emoji for others
            const imageKey = SKILL_ICON_MAP[activeSkill.id];
            const iconTarget = imageKey ? slotUI.skillIcon : slotUI.skillIconText;

            if (imageKey) {
                slotUI.skillIcon.setTexture(imageKey);
                const iconScale = slotUI.iconDiameter / slotUI.skillIcon.width;
                slotUI.skillIcon.setScale(iconScale);
                slotUI.skillIcon.setVisible(true);
                slotUI.skillIcon.setAlpha(1);
                slotUI.skillIconText.setVisible(false);
            } else {
                slotUI.skillIcon.setVisible(false);
                slotUI.skillIconText.setText(tileData ? tileData.icon : '◆');
                slotUI.skillIconText.setVisible(true);
                slotUI.skillIconText.setAlpha(1);
            }

            // Pulse effect when charged
            if (isReady && !slotUI.pulseTween) {
                slotUI.pulseTween = this.tweens.add({
                    targets: iconTarget,
                    scaleX: iconTarget.scaleX * 1.12,
                    scaleY: iconTarget.scaleY * 1.12,
                    alpha: 0.85,
                    duration: 600,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'
                });
            } else if (!isReady && slotUI.pulseTween) {
                slotUI.pulseTween.stop();
                slotUI.pulseTween = null;
                // Reset scale
                if (imageKey) {
                    const iconScale = slotUI.iconDiameter / slotUI.skillIcon.width;
                    slotUI.skillIcon.setScale(iconScale);
                    slotUI.skillIcon.setAlpha(1);
                } else {
                    slotUI.skillIconText.setScale(1);
                    slotUI.skillIconText.setAlpha(1);
                }
            }

            slotUI.threshold.setText(`${tileData ? tileData.icon : ''} ${currentCharge}/${thresholdVal}`);
            slotUI.threshold.setColor(isReady ? '#ffffff' : '#989898');

            // Update name label
            slotUI.nameLabel.setText(activeSkill.name);
            slotUI.nameLabel.setColor(this.toHexColor(borderColor));
            slotUI.nameLabel.setAlpha(1);
        });

        this.refreshSkillsScreenUI();
    }

    getSkillGemDisplay(gem) {
        if (!gem) return { icon: '?', name: 'Unknown', typeLabel: '', imageKey: null };

        if (gem.type === 'active') {
            const activeSkill = this.getActiveSkillById(gem.id);
            const tileData = activeSkill ? this.getTileDataForEffect(activeSkill.tileEffect) : null;
            return {
                icon: tileData ? tileData.icon : '◆',
                name: activeSkill ? activeSkill.name : 'Unknown Active',
                typeLabel: 'Active',
                imageKey: activeSkill ? (SKILL_ICON_MAP[activeSkill.id] || null) : null
            };
        }

        const supportGem = this.getSupportGemById(gem.id);
        return {
            icon: supportGem ? supportGem.short : 'S',
            name: supportGem ? supportGem.name : 'Unknown Support',
            typeLabel: 'Support',
            imageKey: null
        };
    }

    getSkillGemDescription(gem) {
        if (!gem) return 'Unknown gem.';

        if (gem.type === 'active') {
            const activeSkill = this.getActiveSkillById(gem.id);
            if (!activeSkill) return 'Unknown active gem.';
            const tileData = this.getTileDataForEffect(activeSkill.tileEffect);
            const modeLabel = activeSkill.mode === 'damage' ? 'Deals damage' : (activeSkill.mode === 'heal' ? 'Restores health' : 'Generates gold');
            return `${modeLabel}. Charges from ${tileData ? tileData.name : activeSkill.tileEffect} matches. Base trigger threshold: ${activeSkill.baseThreshold}. Base power: ${activeSkill.basePower}.`;
        }

        const support = this.getSupportGemById(gem.id);
        if (!support) return 'Unknown support gem.';

        const thresholdText = support.thresholdDelta === 0
            ? 'No threshold change'
            : `${support.thresholdDelta > 0 ? '+' : ''}${support.thresholdDelta} trigger threshold`;
        const powerText = support.powerMultiplier
            ? `+${Math.round(support.powerMultiplier * 100)}% power`
            : 'No power bonus';
        const healText = support.healFlat ? `+${support.healFlat} flat healing` : null;
        const goldText = support.goldFlat ? `+${support.goldFlat} flat gold` : null;
        const echoText = support.extraHitChance ? `${Math.round(support.extraHitChance * 100)}% chance for echo hit` : null;
        return [thresholdText, powerText, healText, goldText, echoText].filter(Boolean).join('. ') + '.';
    }

    openSkillGemPopup(gem, inventoryIndex) {
        if (!this.skillsGemModal || !gem) return;
        this.selectedSkillGem = gem;
        this.selectedGemInventoryIndex = inventoryIndex;

        const display = this.getSkillGemDisplay(gem);
        const description = this.getSkillGemDescription(gem);

        this.skillsGemModalIcon.setText(display.icon);
        if (display.imageKey && this.skillsGemModalIconImage) {
            this.skillsGemModalIconImage.setTexture(display.imageKey);
            this.skillsGemModalIconImage.setDisplaySize(56, 56);
            this.skillsGemModalIconImage.setVisible(true);
            this.skillsGemModalIcon.setVisible(false);
        } else {
            if (this.skillsGemModalIconImage) this.skillsGemModalIconImage.setVisible(false);
            this.skillsGemModalIcon.setVisible(true);
        }
        this.skillsGemModalName.setText(display.name);
        this.skillsGemModalType.setText(`${display.typeLabel} Gem`);
        this.skillsGemModalDesc.setText(description);
        this.skillsGemModal.setVisible(true);
        this.refreshSkillsScreenUI();
    }

    closeSkillGemPopup() {
        this.selectedGemInventoryIndex = -1;
        if (this.skillsGemModal) {
            this.skillsGemModal.setVisible(false);
        }
    }

    equipSelectedGemFromPopup() {
        if (!this.selectedSkillGem) return;
        const display = this.getSkillGemDisplay(this.selectedSkillGem);
        this.armedEquipGem = { ...this.selectedSkillGem };
        this.addCombatLog(`${display.name} selected. Tap a slot to equip.`, '#ffd56b');
        this.closeSkillGemPopup();
        this.refreshSkillsScreenUI();
    }

    discardSelectedGemFromPopup() {
        if (!this.selectedSkillGem || this.selectedGemInventoryIndex < 0) return;

        const gem = this.selectedSkillGem;
        const display = this.getSkillGemDisplay(gem);
        this.skillsInventoryGems.splice(this.selectedGemInventoryIndex, 1);

        if (gem.type === 'active') {
            const availableActive = this.skillsInventoryGems.filter(entry => entry.type === 'active');
            const fallbackActiveId = availableActive.length > 0 ? availableActive[0].id : ACTIVE_SKILL_GEMS[0].id;
            this.playerSkills.forEach(slot => {
                if (slot.activeId === gem.id) {
                    slot.activeId = fallbackActiveId;
                }
            });
        } else {
            this.playerSkills.forEach(slot => {
                slot.supportIds = slot.supportIds.map(id => (id === gem.id ? null : id));
            });
        }

        if (this.selectedSkillGem && this.selectedSkillGem.id === gem.id && this.selectedSkillGem.type === gem.type) {
            this.selectedSkillGem = null;
        }

        this.addCombatLog(`Discarded ${display.name}`, '#ff9d9d');
        this.closeSkillGemPopup();
        this.updateSkillBarUI();
        this.refreshSkillsScreenUI();
    }

    equipSelectedGemToActiveSlot(slotIndex) {
        if (!this.armedEquipGem) return;
        const equipped = this.equipGemToActiveSlot(slotIndex, this.armedEquipGem);
        if (equipped) {
            this.armedEquipGem = null;
            this.refreshSkillsScreenUI();
        }
    }

    equipSelectedGemToSupportSlot(slotIndex, socketIndex) {
        if (!this.armedEquipGem) return;
        const equipped = this.equipGemToSupportSlot(slotIndex, socketIndex, this.armedEquipGem);
        if (equipped) {
            this.armedEquipGem = null;
            this.refreshSkillsScreenUI();
        }
    }

    equipGemToActiveSlot(slotIndex, gem) {
        if (!gem || gem.type !== 'active') return false;
        if (!this.playerSkills[slotIndex]) return false;

        this.playerSkills[slotIndex].activeId = gem.id;
        this.updateSkillBarUI();
        const activeSkill = this.getActiveSkillById(gem.id);
        if (activeSkill) {
            this.addCombatLog(`Skill ${slotIndex + 1} set to ${activeSkill.name}`, '#7cdcff');
        }
        return true;
    }

    equipGemToSupportSlot(slotIndex, socketIndex, gem) {
        if (!gem || gem.type !== 'support') return false;
        if (!this.playerSkills[slotIndex]) return false;
        if (socketIndex < 0 || socketIndex > 2) return false;

        this.playerSkills[slotIndex].supportIds[socketIndex] = gem.id;
        this.updateSkillBarUI();
        const support = this.getSupportGemById(gem.id);
        if (support) {
            this.addCombatLog(`Skill ${slotIndex + 1} support ${socketIndex + 1}: ${support.name}`, '#a8ffa8');
        }
        return true;
    }

    resolveSkillGemDropTarget(worldX, worldY, gem) {
        if (!gem || !this.skillsActiveSlotUI || this.skillsActiveSlotUI.length === 0) return null;

        if (gem.type === 'active') {
            for (let slotIndex = 0; slotIndex < this.skillsActiveSlotUI.length; slotIndex++) {
                const slotUI = this.skillsActiveSlotUI[slotIndex];
                const dx = worldX - slotUI.mainCenter.x;
                const dy = worldY - slotUI.mainCenter.y;
                const radius = slotUI.mainRadius + 8;
                if (dx * dx + dy * dy <= radius * radius) {
                    return { kind: 'active', slotIndex };
                }
            }
            return null;
        }

        for (let slotIndex = 0; slotIndex < this.skillsActiveSlotUI.length; slotIndex++) {
            const slotUI = this.skillsActiveSlotUI[slotIndex];
            for (let socketIndex = 0; socketIndex < slotUI.supportSockets.length; socketIndex++) {
                const socket = slotUI.supportSockets[socketIndex];
                const dx = worldX - socket.center.x;
                const dy = worldY - socket.center.y;
                const radius = socket.radius + 8;
                if (dx * dx + dy * dy <= radius * radius) {
                    return { kind: 'support', slotIndex, socketIndex };
                }
            }
        }

        return null;
    }

    handleSkillGemDrop(tile, worldX, worldY) {
        const gem = this.skillsInventoryGems[tile.index];
        if (!gem) return;

        const target = this.resolveSkillGemDropTarget(worldX, worldY, gem);
        if (!target) return;

        if (target.kind === 'active') {
            this.justDroppedSkillGem = true;
            this.equipGemToActiveSlot(target.slotIndex, gem);
        } else if (target.kind === 'support') {
            this.justDroppedSkillGem = true;
            this.equipGemToSupportSlot(target.slotIndex, target.socketIndex, gem);
        }
    }

    refreshSkillsScreenUI() {
        if (!this.skillsScreenGroup || !this.skillsActiveSlotUI || this.skillsActiveSlotUI.length === 0) return;

        const armedType = this.armedEquipGem ? this.armedEquipGem.type : null;

        this.skillsActiveSlotUI.forEach((slotUI, slotIndex) => {
            const loadout = this.playerSkills[slotIndex];
            if (!loadout) return;

            const activeSkill = this.getActiveSkillById(loadout.activeId);
            const tileData = activeSkill ? this.getTileDataForEffect(activeSkill.tileEffect) : null;
            const threshold = this.getSkillTriggerThreshold(loadout);
            const charge = activeSkill ? (this.skillCharge[activeSkill.tileEffect] || 0) : 0;
            const isReady = charge >= threshold;
            const borderColor = tileData ? tileData.color : 0xffffff;

            const activeTargetAlpha = armedType === 'active' ? 1 : (isReady ? 1 : 0.6);
            const activeTargetStroke = armedType === 'active' ? 0xfff07a : borderColor;
            slotUI.cardBg.setStrokeStyle(2, activeTargetStroke, activeTargetAlpha);
            slotUI.cardBg.setFillStyle(isReady ? 0x2a2a2a : 0x202020, isReady ? 1 : 0.86);
            const slotImageKey = activeSkill ? (SKILL_ICON_MAP[activeSkill.id] || null) : null;
            if (slotImageKey && slotUI.skillIconImage) {
                slotUI.skillIconImage.setTexture(slotImageKey);
                const iconDiam = slotUI.mainRadius * 2 - 8;
                slotUI.skillIconImage.setDisplaySize(iconDiam, iconDiam);
                slotUI.skillIconImage.setVisible(true);
                slotUI.iconText.setVisible(false);
            } else {
                if (slotUI.skillIconImage) slotUI.skillIconImage.setVisible(false);
                slotUI.iconText.setText(tileData ? tileData.icon : '◆');
                slotUI.iconText.setVisible(true);
            }
            slotUI.nameText.setText(activeSkill ? activeSkill.name : 'None');
            slotUI.nameText.setColor(this.toHexColor(borderColor));
            slotUI.chargeText.setText(`${charge}/${threshold}`);
            slotUI.chargeText.setColor(isReady ? '#ffffff' : '#9a9a9a');

            slotUI.supportSockets.forEach((socketUI, socketIndex) => {
                const supportId = loadout.supportIds[socketIndex];
                const supportGem = this.getSupportGemById(supportId);
                socketUI.socketText.setText(supportGem ? supportGem.short : '---');
                const supportStroke = armedType === 'support'
                    ? 0xfff07a
                    : (supportGem ? borderColor : 0x808080);
                const supportAlpha = armedType === 'support' ? 1 : 1;
                socketUI.socketBg.setStrokeStyle(1, supportStroke, supportAlpha);
                socketUI.connector.setStrokeStyle(1, isReady ? borderColor : 0x8b8b8b, isReady ? 0.95 : 0.65);
            });
        });

        if (this.selectedGemLabel) {
            if (this.armedEquipGem) {
                const display = this.getSkillGemDisplay(this.armedEquipGem);
                this.selectedGemLabel.setText(`Equip Mode: ${display.name} (${display.typeLabel})`);
                this.selectedGemLabel.setColor('#fff07a');
            } else if (!this.selectedSkillGem) {
                this.selectedGemLabel.setText('Selected: none');
                this.selectedGemLabel.setColor('#bbbbbb');
            } else {
                const display = this.getSkillGemDisplay(this.selectedSkillGem);
                this.selectedGemLabel.setText(`Selected: ${display.name} (${display.typeLabel})`);
                this.selectedGemLabel.setColor('#e9f18d');
            }
        }

        if (this.skillsInventoryTiles && this.skillsInventoryTiles.length > 0) {
            this.skillsInventoryTiles.forEach(tile => {
                const gem = this.skillsInventoryGems[tile.index] || null;
                if (!gem) {
                    tile.tileBg.setVisible(false);
                    tile.iconText.setVisible(false);
                    if (tile.tileSkillIcon) tile.tileSkillIcon.setVisible(false);
                    tile.nameText.setVisible(false);
                    tile.typeText.setVisible(false);
                    return;
                }

                tile.tileBg.setVisible(true);
                tile.nameText.setVisible(true);
                tile.typeText.setVisible(true);

                tile.tileBg.x = tile.homeX;
                tile.tileBg.y = tile.homeY;
                tile.iconText.x = tile.homeX;
                tile.iconText.y = tile.homeY;
                if (tile.tileSkillIcon) {
                    tile.tileSkillIcon.x = tile.homeX;
                    tile.tileSkillIcon.y = tile.homeY;
                }
                tile.nameText.x = tile.homeX;
                tile.nameText.y = tile.homeY + 27;
                tile.typeText.x = tile.homeX;
                tile.typeText.y = tile.homeY + 39;

                const display = this.getSkillGemDisplay(gem);
                if (display.imageKey && tile.tileSkillIcon) {
                    tile.tileSkillIcon.setTexture(display.imageKey);
                    tile.tileSkillIcon.setDisplaySize(42, 42);
                    tile.tileSkillIcon.setVisible(true);
                    tile.iconText.setVisible(false);
                } else {
                    if (tile.tileSkillIcon) tile.tileSkillIcon.setVisible(false);
                    tile.iconText.setText(display.icon);
                    tile.iconText.setVisible(true);
                }
                tile.nameText.setText(display.name);
                tile.typeText.setText(display.typeLabel);

                const isSelected = this.selectedSkillGem
                    && this.selectedSkillGem.type === gem.type
                    && this.selectedSkillGem.id === gem.id;
                tile.tileBg.setStrokeStyle(2, isSelected ? 0xfff07a : 0x666666, 1);
                tile.tileBg.setFillStyle(isSelected ? 0x383220 : 0x292929, 1);
            });
        }
    }

    getSkillTriggerThreshold(skillLoadout) {
        const activeSkill = this.getActiveSkillById(skillLoadout.activeId);
        if (!activeSkill) return 99;

        const supportThresholdShift = (skillLoadout.supportIds || [])
            .map(id => this.getSupportGemById(id))
            .filter(Boolean)
            .reduce((sum, gem) => sum + (gem.thresholdDelta || 0), 0);

        return Phaser.Math.Clamp(activeSkill.baseThreshold + supportThresholdShift, 3, 8);
    }

    resolveSkillCastEffect(activeSkill, skillLoadout, availableCharge, threshold, gear) {
        const supports = (skillLoadout.supportIds || [])
            .map(id => this.getSupportGemById(id))
            .filter(Boolean);

        const charBonuses = this.getCharacterStatBonuses();
        let statBonus = 0;
        if (activeSkill.scalingStat === 'physical') statBonus = charBonuses.physicalDamageBonus;
        else if (activeSkill.scalingStat === 'magic') statBonus = charBonuses.magicDamageBonus;
        else if (activeSkill.scalingStat === 'ranged') statBonus = charBonuses.rangedDamageBonus;

        const statScale = activeSkill.scalingStat === 'health'
            ? Math.floor((gear.health || 0) / 10)
            : Math.floor((gear[activeSkill.scalingStat] || 0) * 0.75) + statBonus;

        const overChargeBonus = Math.max(0, availableCharge - threshold) * 0.1;
        const supportMultiplier = supports.reduce((mult, gem) => mult + (gem.powerMultiplier || 0), 1);
        const totalMultiplier = supportMultiplier + overChargeBonus;
        const rolledPower = Math.max(1, Math.round((activeSkill.basePower + statScale) * totalMultiplier));

        const extraHitDamage = supports.reduce((sum, gem) => {
            if (!gem.extraHitChance || Math.random() >= gem.extraHitChance) return sum;
            return sum + Math.max(1, Math.round(rolledPower * 0.4));
        }, 0);

        const bonusHeal = supports.reduce((sum, gem) => sum + (gem.healFlat || 0), 0);
        const bonusGold = supports.reduce((sum, gem) => sum + (gem.goldFlat || 0), 0);
        const supportNames = supports.length > 0 ? ` [${supports.map(s => s.name).join(', ')}]` : '';

        const result = {
            enemyDamage: 0,
            healAmount: 0,
            lootAmount: 0
        };

        if (activeSkill.mode === 'damage') {
            result.enemyDamage += rolledPower + extraHitDamage;
            this.addCombatLog(
                `${activeSkill.name} cast for ${rolledPower + extraHitDamage} damage${supportNames}`,
                '#ffae57'
            );
        }

        if (activeSkill.mode === 'heal') {
            result.healAmount += rolledPower + bonusHeal;
            this.addCombatLog(
                `${activeSkill.name} cast healing +${rolledPower + bonusHeal}${supportNames}`,
                '#8dff9b'
            );
        }

        if (activeSkill.mode === 'gold') {
            result.lootAmount += rolledPower + bonusGold;
            this.addCombatLog(
                `${activeSkill.name} gold +${rolledPower + bonusGold}${supportNames}`,
                '#ffe88a'
            );
        }

        if (activeSkill.mode !== 'damage' && extraHitDamage > 0) {
            result.enemyDamage += extraHitDamage;
            this.addCombatLog(`${activeSkill.name} Echo hit for ${extraHitDamage} bonus damage`, '#ffae57');
        }

        return result;
    }

    createCombatLog() {
        // Positioned between nav buttons and the grid
        const bg = this.add.rectangle(195, 255, 386, 42, 0x111111, 0.9).setOrigin(0.5);
        this.hudContainer.add(bg);
    }

    addCombatLog(message, color) {
        this.combatLog.push({ text: message, color });
        if (this.combatLog.length > this.maxCombatLogLines) {
            this.combatLog.shift();
        }
        this.renderCombatLog();
    }

    renderCombatLog() {
        // Clear old text objects
        this.combatLogTexts.forEach(t => t.destroy());
        this.combatLogTexts = [];

        const logTopY = 239;
        const lineHeight = 13;

        this.combatLog.forEach((entry, index) => {
            const y = logTopY + index * lineHeight;
            const textObj = this.add.text(12, y, entry.text, {
                fontSize: '12px',
                color: entry.color,
                fontStyle: 'bold'
            });
            this.hudContainer.add(textObj);
            this.combatLogTexts.push(textObj);
        });
    }

    generateStarterInventory() {
        const items = [];
        const count = Phaser.Math.Between(3, 5);
        for (let i = 0; i < count; i++) {
            items.push(this.generateLoot(5));
        }
        return items;
    }

    getSlotLabel(slotGroup) {
        if (slotGroup === 'ring') return 'Ring (Either Slot)';
        return slotGroup.charAt(0).toUpperCase() + slotGroup.slice(1);
    }

    getEquipSlotDisplayLabel(slotKey) {
        const slotLabels = {
            helmet: 'Helmet',
            necklace: 'Necklace',
            chest: 'Chest',
            belt: 'Belt',
            gloves: 'Gloves',
            boots: 'Boots',
            mainhand: 'Main Hand',
            offhand: 'Off Hand',
            ring1: 'Ring 1',
            ring2: 'Ring 2'
        };
        return slotLabels[slotKey] || this.getSlotLabel(slotKey);
    }

    getEquipmentSlotText(slotKey, equippedItem, offhandBlockedByBow) {
        if (offhandBlockedByBow && slotKey === 'offhand') {
            return '2H LOCK';
        }
        if (!equippedItem) return '';

        const baseText = equippedItem.type || equippedItem.baseName || equippedItem.name || '';
        if (baseText.length <= 11) return baseText;
        return `${baseText.slice(0, 10)}.`;
    }

    getEmptySlotIcon(slotKey) {
        const icons = {
            helmet: '🪖',
            necklace: '📿',
            chest: '🦺',
            belt: '�',
            mainhand: '🗡️',
            offhand: '🛡️',
            gloves: '🧤',
            boots: '🥾',
            ring1: '💍',
            ring2: '💍'
        };

        return icons[slotKey] || '◻';
    }

    pulseUiTargets(targets, scale = 1.08, duration = 90) {
        const validTargets = (targets || []).filter(Boolean);
        if (validTargets.length === 0) return;

        this.tweens.killTweensOf(validTargets);
        validTargets.forEach(target => {
            target.setScale(1);
        });

        this.tweens.add({
            targets: validTargets,
            scaleX: scale,
            scaleY: scale,
            duration,
            yoyo: true,
            ease: 'Quad.easeOut'
        });
    }

    refreshEquipmentScreenAnimations() {
        if (this.characterStatTiles) {
            Object.values(this.characterStatTiles).forEach(tile => {
                if (!tile || !tile.cardBg) return;
                const targets = [tile.cardBg, tile.icon, tile.valueText];
                this.tweens.killTweensOf(targets);
                targets.forEach(target => target.setScale(1));
                this.tweens.add({
                    targets,
                    scaleX: 1.02,
                    scaleY: 1.02,
                    duration: 1200,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut',
                    delay: tile.delay || 0
                });
            });
        }

        if (this.equipmentSlotGlows) {
            Object.entries(this.equipmentSlotGlows).forEach(([key, glow]) => {
                if (!glow) return;
                this.tweens.killTweensOf(glow);
                glow.setScale(1);
                if (!this.equippedItems[key]) return;

                this.tweens.add({
                    targets: glow,
                    scaleX: 1.06,
                    scaleY: 1.06,
                    alpha: 0.7,
                    duration: 900,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'
                });
            });
        }
    }

    getStatLabel(stat) {
        const labels = {
            health: 'Health',
            physical: 'Physical',
            magic: 'Magic',
            ranged: 'Ranged',
            magicFind: 'Magic Find',
            armor: 'Armor',
            energyShield: 'Energy Shield',
            evasion: 'Evasion'
        };
        return labels[stat] || stat.charAt(0).toUpperCase() + stat.slice(1);
    }

    getEquippedStatTotals() {
        const totals = {
            health: 0,
            physical: 0,
            magic: 0,
            ranged: 0,
            magicFind: 0,
            armor: 0,
            energyShield: 0,
            evasion: 0
        };

        Object.values(this.equippedItems).forEach(item => {
            if (!item || !item.stats) return;
            Object.entries(item.stats).forEach(([stat, value]) => {
                if (totals[stat] === undefined) {
                    totals[stat] = 0;
                }
                totals[stat] += value;
            });
        });

        // Juggernaut keystone: double health from gear
        const tb = this.getTalentPercentBonuses();
        if (tb.juggernaut) {
            totals.health *= 2;
        }

        return totals;
    }

    getTalentPercentBonuses() {
        const b = {
            physicalDamage: 0, magicDamage: 0, rangedDamage: 0,
            armor: 0, health: 0, energyShield: 0, evasion: 0,
            blockChance: 0, redTileChance: 0,
            juggernaut: false, seeRed: false
        };
        this.allocatedTalents.forEach(nodeId => {
            const node = TALENT_TREE_NODES.find(n => n.id === nodeId);
            if (!node) return;
            switch (node.stat) {
                case 'physicalDamage': b.physicalDamage += node.value; break;
                case 'magicDamage':    b.magicDamage += node.value; break;
                case 'rangedDamage':   b.rangedDamage += node.value; break;
                case 'armor':          b.armor += node.value; break;
                case 'health':         b.health += node.value; break;
                case 'energyShield':   b.energyShield += node.value; break;
                case 'evasion':        b.evasion += node.value; break;
                case 'blockChance':    b.blockChance += node.value; break;
                case 'redTileChance':  b.redTileChance += node.value; break;
                case 'juggernaut':     b.juggernaut = true; break;
                case 'seeRed':         b.seeRed = true; break;
            }
        });
        return b;
    }

    getMaxHealth() {
        const tb = this.getTalentPercentBonuses();
        const gear = this.getEquippedStatTotals();
        return Math.floor((20 + gear.health) * (1 + tb.health / 100));
    }

    getRandomTileType() {
        const tb = this.getTalentPercentBonuses();
        if (tb.redTileChance > 0 && Math.random() * 100 < tb.redTileChance) {
            return 3; // physical tile index
        }
        return Phaser.Math.Between(0, TILE_TYPES.length - 1);
    }

    getCharacterStatBonuses() {
        const str = this.player.strength;
        const int = this.player.intelligence;
        const dex = this.player.dexterity;
        return {
            physicalDamageBonus: Math.floor(str / 2),
            armorBonus: Math.floor(str / 5),
            magicDamageBonus: Math.floor(int / 2),
            energyShield: Math.floor(int * 0.5),
            rangedDamageBonus: Math.floor(dex / 2),
            critChance: Math.min(75, dex * 0.3),
            evasionChance: Math.min(50, dex * 0.3)
        };
    }

    getMaxEnergyShield() {
        const gear = this.getEquippedStatTotals();
        const charBonuses = this.getCharacterStatBonuses();
        const baseES = charBonuses.energyShield + gear.energyShield;
        const tb = this.getTalentPercentBonuses();
        return Math.floor(baseES * (1 + tb.energyShield / 100));
    }

    refillEnergyShield() {
        this.player.currentShield = this.getMaxEnergyShield();
    }

    getRarityByName(name) {
        return ITEM_RARITIES.find(rarity => rarity.name === name) || ITEM_RARITIES[0];
    }

    rollRarity() {
        const totalWeight = ITEM_RARITIES.reduce((sum, rarity) => sum + rarity.weight, 0);
        let roll = Phaser.Math.Between(1, totalWeight);

        for (let i = 0; i < ITEM_RARITIES.length; i++) {
            roll -= ITEM_RARITIES[i].weight;
            if (roll <= 0) {
                return ITEM_RARITIES[i];
            }
        }

        return ITEM_RARITIES[0];
    }

    rollAffixes(pool, count, multiplier, usedNames, baseType) {
        const affixes = [];

        // Build weighted pool based on base type
        const weightedPool = [];
        pool.forEach(affix => {
            const tags = affix.tags || [];
            // Matching base type gets 3x weight, neutral (no tags) gets 1x, mismatched gets 1x
            const weight = (baseType && tags.includes(baseType)) ? 3 : 1;
            for (let i = 0; i < weight; i++) weightedPool.push(affix);
        });

        while (affixes.length < count && usedNames.size < pool.length) {
            const affix = Phaser.Utils.Array.GetRandom(weightedPool);
            if (!affix || usedNames.has(affix.name)) continue;

            usedNames.add(affix.name);

            const rolledStats = {};
            Object.entries(affix.stats).forEach(([stat, range]) => {
                const [min, max] = range;
                const value = Math.max(1, Math.round(Phaser.Math.Between(min, max) * multiplier));
                rolledStats[stat] = value;
            });

            affixes.push({ name: affix.name, stats: rolledStats });
        }

        return affixes;
    }

    mergeStats(target, source) {
        Object.entries(source).forEach(([stat, value]) => {
            if (!target[stat]) target[stat] = 0;
            target[stat] += value;
        });
    }

    generateItem(forcedRarity = null) {
        return this.generateLoot(this.battleNumber * 10, forcedRarity);
    }

    /**
     * Generate a reward item using magic find and monster level to determine rarity.
     */
    generateRewardItem(monsterLevel, magicFind, forcedRarity = null) {
        const base = Phaser.Utils.Array.GetRandom(ITEM_BASES);
        const rarity = forcedRarity
            ? this.getRarityByName(forcedRarity)
            : this.rollRarityWithMagicFind(monsterLevel, magicFind);

        const itemLevel = Math.max(1, monsterLevel);
        const levelScale = 1 + (itemLevel - 1) * 0.07;
        const statMultiplier = rarity.statMultiplier * levelScale;

        const prefixCount = Math.ceil(rarity.affixes / 2);
        const suffixCount = Math.floor(rarity.affixes / 2);
        const usedNames = new Set();

        const prefixes = this.rollAffixes(ITEM_PREFIXES, prefixCount, statMultiplier, usedNames, base.baseType || null);
        const suffixes = this.rollAffixes(ITEM_SUFFIXES, suffixCount, statMultiplier, usedNames, base.baseType || null);

        const scaledBaseStats = {};
        Object.entries(base.baseStats).forEach(([stat, value]) => {
            scaledBaseStats[stat] = Math.max(1, Math.round(value * levelScale));
        });

        const totalStats = {};
        this.mergeStats(totalStats, scaledBaseStats);
        prefixes.forEach(prefix => this.mergeStats(totalStats, prefix.stats));
        suffixes.forEach(suffix => this.mergeStats(totalStats, suffix.stats));

        const primaryPrefix = prefixes.length > 0 ? `${prefixes[0].name} ` : '';
        const primarySuffix = suffixes.length > 0 ? ` ${suffixes[0].name}` : '';
        const rarityFlavor = rarity.name === 'Legendary' ? 'Mythic ' : '';
        const itemName = `${primaryPrefix}${rarityFlavor}${base.baseName}${primarySuffix}`.trim();

        const affixSummary = [
            ...prefixes.map(prefix => `Prefix: ${prefix.name}`),
            ...suffixes.map(suffix => `Affix: ${suffix.name}`)
        ].join(' | ');

        const itemId = `itm-${Date.now()}-${this.itemIdCounter++}`;

        return {
            id: itemId,
            name: itemName,
            slotGroup: base.slotGroup,
            type: base.type,
            baseType: base.baseType || null,
            weaponClass: base.weaponClass || null,
            twoHanded: !!base.twoHanded,
            rarity: rarity.name,
            itemLevel,
            icon: base.icon,
            frameColor: rarity.frameColor,
            rarityTextColor: rarity.textColor,
            description: `${base.description} ${affixSummary}`.trim(),
            stats: totalStats,
            prefixes,
            suffixes
        };
    }

    /**
     * Roll rarity based on magic find + monster level.
     * Magic gear starts appearing around level 5, Rare around level 10.
     * Legendary is very rare and requires magic find to realistically obtain.
     */
    rollRarityWithMagicFind(monsterLevel, magicFind) {
        const mf = Math.max(0, magicFind);
        const ml = Math.max(1, monsterLevel);

        // Magic: ramps from 0 at level 1 to meaningful chance at level 5+
        const magicBase = Math.max(0, (ml - 3) * 3);
        const magicWeight = Math.min(40, magicBase + mf * 0.15);

        // Rare: effectively 0 before level 8, ramps up from level 10+
        const rareBase = Math.max(0, (ml - 8) * 1.5);
        const rareWeight = Math.min(25, rareBase + mf * 0.18);

        // Legendary: near-zero without magic find, tiny base chance only at very high levels
        const legendaryBase = Math.max(0, (ml - 18) * 0.3);
        const legendaryWeight = Math.min(8, legendaryBase + mf * 0.08);

        const normalWeight = Math.max(20, 90 - magicWeight - rareWeight - legendaryWeight);

        const weights = {
            Normal:    normalWeight,
            Magic:     magicWeight,
            Rare:      rareWeight,
            Legendary: legendaryWeight
        };

        const weightedTable = ITEM_RARITIES.map(r => ({
            name: r.name,
            weight: weights[r.name] || r.weight
        }));

        const totalWeight = weightedTable.reduce((sum, r) => sum + r.weight, 0);
        let roll = Phaser.Math.Between(1, Math.round(totalWeight));

        for (let i = 0; i < weightedTable.length; i++) {
            roll -= weightedTable[i].weight;
            if (roll <= 0) {
                return this.getRarityByName(weightedTable[i].name);
            }
        }

        return ITEM_RARITIES[0];
    }

    /**
     * generateLoot(lootScore, forcedRarity)
     *
     * Creates a Path of Exile style item object.
     *
     * lootScore drives both rarity probability and stat power:
     *   - 0-20   → mostly Normal (white) items with no affixes
     *   - 20-50  → Magic (blue) items start appearing (1-2 affixes)
     *   - 50-80  → Rare (yellow) items with 4 affixes become possible
     *   - 80+    → Legendary (orange) items with 6 affixes can drop
     *
     * Item data structure:
     *   {
     *     id, name, slotGroup, type, rarity, itemLevel,
     *     icon, frameColor, rarityTextColor,
     *     description,
     *     stats: { physical, magic, ranged, armor, health, loot, ... },
     *     prefixes: [{ name, stats }],
     *     suffixes: [{ name, stats }]
     *   }
     */
    generateLoot(lootScore, forcedRarity = null) {
        const base = Phaser.Utils.Array.GetRandom(ITEM_BASES);
        const rarity = forcedRarity
            ? this.getRarityByName(forcedRarity)
            : this.rollRarityFromScore(lootScore);

        // itemLevel scales stat ranges: floor 1, soft-caps around 2.5×
        const itemLevel = Math.max(1, Math.floor(lootScore / 10));
        const levelScale = 1 + (itemLevel - 1) * 0.07;
        const statMultiplier = rarity.statMultiplier * levelScale;

        // Affix counts: Normal=0, Magic=1-2, Rare=4, Legendary=6
        const prefixCount = Math.ceil(rarity.affixes / 2);
        const suffixCount = Math.floor(rarity.affixes / 2);
        const usedNames = new Set();

        const prefixes = this.rollAffixes(ITEM_PREFIXES, prefixCount, statMultiplier, usedNames, base.baseType || null);
        const suffixes = this.rollAffixes(ITEM_SUFFIXES, suffixCount, statMultiplier, usedNames, base.baseType || null);

        // Base stats also scale with item level
        const scaledBaseStats = {};
        Object.entries(base.baseStats).forEach(([stat, value]) => {
            scaledBaseStats[stat] = Math.max(1, Math.round(value * levelScale));
        });

        const totalStats = {};
        this.mergeStats(totalStats, scaledBaseStats);
        prefixes.forEach(prefix => this.mergeStats(totalStats, prefix.stats));
        suffixes.forEach(suffix => this.mergeStats(totalStats, suffix.stats));

        // Build PoE-style name
        const primaryPrefix = prefixes.length > 0 ? `${prefixes[0].name} ` : '';
        const primarySuffix = suffixes.length > 0 ? ` ${suffixes[0].name}` : '';
        const rarityFlavor = rarity.name === 'Legendary' ? 'Mythic ' : '';
        const itemName = `${primaryPrefix}${rarityFlavor}${base.baseName}${primarySuffix}`.trim();

        const affixSummary = [
            ...prefixes.map(prefix => `Prefix: ${prefix.name}`),
            ...suffixes.map(suffix => `Affix: ${suffix.name}`)
        ].join(' | ');

        const itemId = `itm-${Date.now()}-${this.itemIdCounter++}`;

        return {
            id: itemId,
            name: itemName,
            slotGroup: base.slotGroup,
            type: base.type,
            baseType: base.baseType || null,
            weaponClass: base.weaponClass || null,
            twoHanded: !!base.twoHanded,
            rarity: rarity.name,
            itemLevel,
            icon: base.icon,
            frameColor: rarity.frameColor,
            rarityTextColor: rarity.textColor,
            description: `${base.description} ${affixSummary}`.trim(),
            stats: totalStats,
            prefixes,
            suffixes
        };
    }

    /**
     * Rarity roll driven entirely by a single lootScore number.
     * Low scores → almost all Normal. High scores → Legendary possible.
     */
    rollRarityFromScore(lootScore) {
        const s = Math.max(0, lootScore);

        // Weights shift with score: Magic appears ~score 20 (level 2), Rare ~score 80 (level 8)
        const magicBase = Math.max(0, (s - 15) * 0.5);
        const rareBase = Math.max(0, (s - 70) * 0.3);
        const legendaryBase = Math.max(0, (s - 150) * 0.08);

        const weights = {
            Normal:    Math.max(20, 90 - magicBase - rareBase - legendaryBase),
            Magic:     Math.min(40, magicBase),
            Rare:      Math.min(25, rareBase),
            Legendary: Math.min(8, legendaryBase)
        };

        const weightedTable = ITEM_RARITIES.map(r => ({
            name: r.name,
            weight: weights[r.name] || r.weight
        }));

        const totalWeight = weightedTable.reduce((sum, r) => sum + r.weight, 0);
        let roll = Phaser.Math.Between(1, Math.round(totalWeight));

        for (let i = 0; i < weightedTable.length; i++) {
            roll -= weightedTable[i].weight;
            if (roll <= 0) {
                return this.getRarityByName(weightedTable[i].name);
            }
        }

        return ITEM_RARITIES[0];
    }

    addItemToInventory(item) {
        if (this.inventory.length >= this.maxInventorySlots) {
            this.addCombatLog('Inventory full. Item dropped on the ground.', '#ff8888');
            return false;
        }

        this.inventory.push(item);
        this.updateInventoryGridUI();
        return true;
    }

    tryDropLootItem(lootAmount) {
        const gear = this.getEquippedStatTotals();
        const dropChance = Phaser.Math.Clamp(0.10 + lootAmount / 90 + gear.magicFind / 120, 0, 0.85);

        if (Math.random() > dropChance) return;

        const item = this.generateItem();
        if (this.addItemToInventory(item)) {
            this.addCombatLog(`Loot Drop: ${item.rarity} ${item.name}`, item.rarityTextColor);
        }
    }

    rollRarityWithLootBonus() {
        const gear = this.getEquippedStatTotals();
        const magicFindPower = gear.magicFind;
        const tierShift = Math.floor(magicFindPower / 120);

        const weights = {
            Normal: Math.max(5, 60 - tierShift * 5),
            Magic: Math.min(50, 25 + tierShift * 2),
            Rare: Math.min(40, 12 + tierShift * 2),
            Legendary: Math.min(25, 3 + tierShift)
        };

        const weightedTable = ITEM_RARITIES.map(rarity => ({
            name: rarity.name,
            weight: weights[rarity.name] || rarity.weight
        }));

        const totalWeight = weightedTable.reduce((sum, rarity) => sum + rarity.weight, 0);
        let roll = Phaser.Math.Between(1, totalWeight);

        for (let i = 0; i < weightedTable.length; i++) {
            roll -= weightedTable[i].weight;
            if (roll <= 0) {
                return this.getRarityByName(weightedTable[i].name);
            }
        }

        return ITEM_RARITIES[0];
    }

    getItemPowerScore(item) {
        if (!item || !item.stats) return 0;
        const weights = {
            health: 0.1,
            physical: 1.4,
            magic: 1.4,
            ranged: 1.3,
            magicFind: 0.5,
            armor: 1.0
        };

        return Object.entries(item.stats).reduce((score, [stat, value]) => {
            const weight = weights[stat] || 1;
            return score + value * weight;
        }, 0);
    }

    getEquipTargetSlot(item) {
        if (!item || !item.slotGroup) return null;

        const slotGroup = item.slotGroup;
        const standardSlots = ['helmet', 'necklace', 'chest', 'belt', 'gloves', 'boots', 'mainhand', 'offhand'];

        if (slotGroup === 'ring') {
            if (!this.equippedItems.ring1) return 'ring1';
            if (!this.equippedItems.ring2) return 'ring2';

            const ring1Score = this.getItemPowerScore(this.equippedItems.ring1);
            const ring2Score = this.getItemPowerScore(this.equippedItems.ring2);
            return ring1Score <= ring2Score ? 'ring1' : 'ring2';
        }

        if (standardSlots.includes(slotGroup)) {
            return slotGroup;
        }

        return null;
    }

    formatSignedValue(value) {
        if (value > 0) return `+${value}`;
        if (value < 0) return `${value}`;
        return '0';
    }

    getRewardCompareData(item) {
        const targetSlot = this.getEquipTargetSlot(item);
        const displacedItems = targetSlot ? this.getDisplacedItemsForEquip(item, targetSlot) : [];

        const targetSlotLabel = targetSlot
            ? this.getEquipSlotDisplayLabel(targetSlot)
            : this.getSlotLabel(item.slotGroup || '');

        if (!targetSlot) {
            return {
                targetSlot,
                targetSlotLabel,
                equippedName: 'None equipped',
                equippedSummary: `Current ${targetSlotLabel}: None`,
                compareLines: ['New slot item']
            };
        }

        if (!displacedItems || displacedItems.length === 0) {
            return {
                targetSlot,
                targetSlotLabel,
                equippedName: 'None equipped',
                equippedSummary: `Current ${targetSlotLabel}: None`,
                compareLines: ['New slot item']
            };
        }

        const equippedStats = {};
        displacedItems.forEach(entry => {
            const stats = (entry && entry.item && entry.item.stats) || {};
            Object.entries(stats).forEach(([stat, value]) => {
                equippedStats[stat] = (equippedStats[stat] || 0) + value;
            });
        });

        const statKeys = new Set([
            ...Object.keys(item.stats || {}),
            ...Object.keys(equippedStats)
        ]);

        const compareLines = Array.from(statKeys)
            .map(stat => {
                const nextValue = (item.stats && item.stats[stat]) || 0;
                const currentValue = equippedStats[stat] || 0;
                const delta = nextValue - currentValue;
                return {
                    stat,
                    delta,
                    text: `${this.getStatLabel(stat)} ${this.formatSignedValue(delta)}`
                };
            })
            .filter(entry => entry.delta !== 0)
            .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))
            .slice(0, 3);

        const replacedSlotsLabel = displacedItems
            .map(entry => this.getEquipSlotDisplayLabel(entry.slotKey))
            .join(' + ');
        const equippedName = displacedItems
            .map(entry => entry.item.name)
            .join(' + ');

        return {
            targetSlot,
            targetSlotLabel,
            equippedName,
            equippedSummary: `Current ${replacedSlotsLabel}: ${equippedName}`,
            compareLines: compareLines.length > 0 ? compareLines : [{ text: 'No stat change', delta: 0 }]
        };
    }

    resolveEquipSlot(slotGroup) {
        return this.getEquipTargetSlot({ slotGroup });
    }

    canEquipItemInSlot(item, targetSlot) {
        if (!item || !targetSlot) return false;
        const requiredGroup = EQUIPMENT_SLOT_GROUP_BY_KEY[targetSlot];
        return requiredGroup === item.slotGroup;
    }

    isTwoHandedItem(item) {
        return !!(item && item.slotGroup === 'mainhand' && item.twoHanded);
    }

    getDisplacedItemsForEquip(item, targetSlot) {
        if (!item || !targetSlot) return [];

        if (targetSlot !== 'mainhand' && targetSlot !== 'offhand') {
            const existing = this.equippedItems[targetSlot] || null;
            return existing ? [{ slotKey: targetSlot, item: existing }] : [];
        }

        const displaced = [];
        const mainhandItem = this.equippedItems.mainhand || null;
        const offhandItem = this.equippedItems.offhand || null;

        if (targetSlot === 'mainhand') {
            if (mainhandItem) displaced.push({ slotKey: 'mainhand', item: mainhandItem });
            if (this.isTwoHandedItem(item) && offhandItem) displaced.push({ slotKey: 'offhand', item: offhandItem });
            return displaced;
        }

        if (offhandItem) displaced.push({ slotKey: 'offhand', item: offhandItem });
        if (mainhandItem && this.isTwoHandedItem(mainhandItem)) {
            displaced.push({ slotKey: 'mainhand', item: mainhandItem });
        }
        return displaced;
    }

    canStoreDisplacedItems(displacedItems, inventorySlotsFreed = 0) {
        const freed = Math.max(0, inventorySlotsFreed);
        return (this.inventory.length - freed + displacedItems.length) <= this.maxInventorySlots;
    }

    applyEquippedItemToSlot(item, targetSlot) {
        this.player.equipment[targetSlot] = item.name;
        this.equippedItems[targetSlot] = item;

        if (targetSlot === 'mainhand' && this.isTwoHandedItem(item)) {
            this.player.equipment.offhand = 'Occupied by Bow';
            this.equippedItems.offhand = null;
        }
    }

    clearEquippedSlot(slotKey) {
        this.equippedItems[slotKey] = null;
        this.player.equipment[slotKey] = 'None';
    }

    // -----------------------------------------------------------------------
    // Procedural character rendering
    // -----------------------------------------------------------------------
    buildCharacterBody(cfg, cx, cy) {
        const container = this.add.container(cx, cy);
        const parts = {};
        const facing = cfg.facingRight ? 1 : -1;

        // Legs
        const legSpacing = 4;
        parts.leftLeg = this.add.rectangle(-legSpacing * facing, 20, 5, 14, cfg.legColor).setOrigin(0.5, 0);
        parts.rightLeg = this.add.rectangle(legSpacing * facing, 20, 5, 14, cfg.legColor).setOrigin(0.5, 0);
        container.add([parts.leftLeg, parts.rightLeg]);

        // Torso
        parts.torso = this.add.rectangle(0, 4, cfg.torsoW, cfg.torsoH, cfg.torso).setOrigin(0.5, 0);
        container.add(parts.torso);

        // Arms
        parts.backArm = this.add.rectangle(-8 * facing, 6, 5, 14, cfg.armColor).setOrigin(0.5, 0);
        parts.frontArm = this.add.rectangle(8 * facing, 6, 5, 14, cfg.armColor).setOrigin(0.5, 0);
        container.add([parts.backArm, parts.frontArm]);

        // Weapon in front hand
        if (cfg.weaponColor) {
            parts.weapon = this.add.rectangle(12 * facing, 4, 3, 22, cfg.weaponColor).setOrigin(0.5, 0);
            container.add(parts.weapon);
        }
        // Shield in back hand
        if (cfg.shieldColor) {
            parts.shield = this.add.ellipse(-12 * facing, 10, 10, 12, cfg.shieldColor).setOrigin(0.5);
            container.add(parts.shield);
        }

        // Head
        parts.head = this.add.circle(0, 0, cfg.headSize, cfg.head).setOrigin(0.5, 1);
        container.add(parts.head);

        // Eyes
        const eyeOffX = 3 * facing;
        parts.leftEye = this.add.circle(eyeOffX - 2, -cfg.headSize + 3, 1.5, cfg.eyeColor);
        parts.rightEye = this.add.circle(eyeOffX + 2, -cfg.headSize + 3, 1.5, cfg.eyeColor);
        container.add([parts.leftEye, parts.rightEye]);

        // Hair / head decoration
        if (cfg.hairStyle === 'long') {
            parts.hair = this.add.ellipse(0, -cfg.headSize * 2 + 4, cfg.headSize * 2 + 4, cfg.headSize + 4, cfg.hairColor).setOrigin(0.5, 0.3);
            const hairBack = this.add.rectangle(-4 * facing, -cfg.headSize + 6, 6, 10, cfg.hairColor).setOrigin(0.5, 0);
            container.add([parts.hair, hairBack]);
            container.sendToBack(hairBack);
            container.sendToBack(parts.hair);
        } else if (cfg.hairStyle === 'horns') {
            const lh = this.add.triangle(-5 * facing, -cfg.headSize * 2 + 2, 0, 10, 4, 0, 8, 10, cfg.hairColor);
            const rh = this.add.triangle(5 * facing, -cfg.headSize * 2 + 2, 0, 10, 4, 0, 8, 10, cfg.hairColor);
            container.add([lh, rh]);
        } else if (cfg.hairStyle === 'messy') {
            for (let i = -2; i <= 2; i++) {
                const strand = this.add.rectangle(i * 3, -cfg.headSize * 2 + 2, 2, Phaser.Math.Between(4, 8), cfg.hairColor).setOrigin(0.5, 1);
                container.add(strand);
            }
        } else if (cfg.hairStyle === 'antenna') {
            const ant = this.add.rectangle(0, -cfg.headSize * 2 - 2, 2, 8, cfg.hairColor).setOrigin(0.5, 1);
            const tip = this.add.circle(0, -cfg.headSize * 2 - 4, 3, 0x00ffff);
            container.add([ant, tip]);
        } else if (cfg.hairStyle === 'spikes') {
            for (let i = -2; i <= 2; i++) {
                const spike = this.add.triangle(i * 4, -cfg.headSize * 2, 0, 8, 3, 0, 6, 8, cfg.hairColor);
                container.add(spike);
            }
        } else if (cfg.hairStyle === 'tentacles') {
            for (let i = -1; i <= 1; i++) {
                const tent = this.add.rectangle(i * 5, 22 + Math.abs(i) * 3, 3, 12, cfg.skinColor).setOrigin(0.5, 0);
                container.add(tent);
                if (parts.tentacles) parts.tentacles.push(tent); else parts.tentacles = [tent];
            }
        }

        container.setScale(1);
        return { container, parts };
    }

    startIdleAnimation(bodyContainer, bodyParts, tweensArray) {
        // Stop any existing idle tweens
        tweensArray.forEach(t => t.remove());
        tweensArray.length = 0;

        // Gentle body sway
        tweensArray.push(this.tweens.add({
            targets: bodyContainer,
            angle: { from: -1.5, to: 1.5 },
            duration: 1800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        }));

        // Subtle breathing (torso scale)
        if (bodyParts.torso) {
            tweensArray.push(this.tweens.add({
                targets: bodyParts.torso,
                scaleY: { from: 1.0, to: 1.04 },
                duration: 1200,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            }));
        }

        // Arm bob
        if (bodyParts.frontArm) {
            tweensArray.push(this.tweens.add({
                targets: bodyParts.frontArm,
                angle: { from: -3, to: 3 },
                duration: 2000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            }));
        }
        if (bodyParts.backArm) {
            tweensArray.push(this.tweens.add({
                targets: bodyParts.backArm,
                angle: { from: 2, to: -2 },
                duration: 2200,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            }));
        }

        // Tentacles wave (for squid)
        if (bodyParts.tentacles) {
            bodyParts.tentacles.forEach((t, i) => {
                tweensArray.push(this.tweens.add({
                    targets: t,
                    angle: { from: -8, to: 8 },
                    duration: 1000 + i * 200,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'
                }));
            });
        }
    }

    playAttackAnimation(bodyContainer, bodyParts, facingRight, onComplete) {
        const dir = facingRight ? 1 : -1;

        // Lunge forward
        this.tweens.add({
            targets: bodyContainer,
            x: bodyContainer.x + 12 * dir,
            duration: 100,
            yoyo: true,
            ease: 'Power2'
        });

        // Swing front arm
        if (bodyParts.frontArm) {
            this.tweens.add({
                targets: bodyParts.frontArm,
                angle: -45 * dir,
                duration: 100,
                yoyo: true,
                ease: 'Power2'
            });
        }

        // Weapon swing
        if (bodyParts.weapon) {
            this.tweens.add({
                targets: bodyParts.weapon,
                angle: -60 * dir,
                duration: 120,
                yoyo: true,
                ease: 'Power2'
            });
        }

        // Body tilt for emphasis
        this.tweens.add({
            targets: bodyContainer,
            angle: 8 * dir,
            duration: 100,
            yoyo: true,
            ease: 'Power2',
            onComplete: () => {
                if (onComplete) onComplete();
            }
        });
    }

    playHitAnimation(bodyContainer) {
        // Flash red and shake when hit
        const origX = bodyContainer.x;
        this.tweens.add({
            targets: bodyContainer,
            x: origX - 4,
            duration: 40,
            yoyo: true,
            repeat: 3,
            ease: 'Linear',
            onComplete: () => bodyContainer.setX(origX)
        });

        // Tint all children red briefly via alpha flash
        const flash = this.add.rectangle(0, 10, 30, 50, 0xff0000, 0.4).setOrigin(0.5);
        bodyContainer.add(flash);
        this.tweens.add({
            targets: flash,
            alpha: 0,
            duration: 250,
            onComplete: () => flash.destroy()
        });
    }

    /** Play the warrior sprite attack animation, then return to idle. */
    playPlayerAttackAnim() {
        if (!this.playerSprite) return;
        this.playerSprite.play('warrior_attack');
        this.playerSprite.once('animationcomplete', () => {
            if (this.player.health > 0) {
                this.playerSprite.play('warrior_idle');
            }
        });
    }

    /** Play the warrior sprite hit animation, then return to idle. */
    playPlayerHitAnim() {
        if (!this.playerSprite) return;
        if (this.player.health <= 0) return;  // Don't override death animation
        this.playerSprite.play('warrior_hit');
        // Flash tint
        this.playerSprite.setTint(0xff4444);
        this.time.delayedCall(200, () => {
            if (this.playerSprite) this.playerSprite.clearTint();
        });
        this.playerSprite.once('animationcomplete', () => {
            if (this.player.health > 0) {
                this.playerSprite.play('warrior_idle');
            }
        });
    }

    /** Play an enemy's attack animation (sprite or procedural). */
    playEnemyAttackAnim(enemy) {
        if (!enemy || !enemy.alive) return;
        const bodyCfg = MONSTER_BODIES[enemy.bodyIndex];
        if (enemy.enemySprite && bodyCfg.spriteKey) {
            enemy.enemySprite.play(bodyCfg.spriteKey + '_attack');
            enemy.enemySprite.once('animationcomplete', () => {
                if (enemy.alive) {
                    enemy.enemySprite.play(bodyCfg.spriteKey + '_idle');
                }
            });
        } else if (enemy.bodyContainer && enemy.bodyParts) {
            this.playAttackAnimation(enemy.bodyContainer, enemy.bodyParts, bodyCfg.facingRight);
        }
    }

    /** Play an enemy's hit reaction animation (sprite or procedural). */
    playEnemyHitAnim(enemy) {
        if (!enemy || !enemy.alive) return;
        const bodyCfg = MONSTER_BODIES[enemy.bodyIndex];
        if (enemy.enemySprite && bodyCfg.spriteKey) {
            enemy.enemySprite.play(bodyCfg.spriteKey + '_hit');
            enemy.enemySprite.setTint(0xff4444);
            this.time.delayedCall(200, () => {
                if (enemy.enemySprite) enemy.enemySprite.clearTint();
            });
            enemy.enemySprite.once('animationcomplete', () => {
                if (enemy.alive) {
                    enemy.enemySprite.play(bodyCfg.spriteKey + '_idle');
                }
            });
        } else if (enemy.bodyContainer) {
            this.playHitAnimation(enemy.bodyContainer);
        }
    }

    createPlayerUI() {
        // Portrait layout: player LEFT, enemy RIGHT, both in top half above grid
        const leftCX = 97;
        const rightCX = 293;
        const panelW = 188;
        const panelH = 250;
        const barW = 166;

        // Divider line between panels
        this.hudContainer.add(this.add.rectangle(195, panelH / 2 + 4, 2, panelH, 0x444444, 1));

        // --- Player panel (left) ---
        this.hudContainer.add(this.add.rectangle(leftCX, panelH / 2 + 4, panelW, panelH, 0x111111, 0.9).setOrigin(0.5));
        // Sprite-based player character
        this.playerSprite = this.add.sprite(leftCX, 80, 'warrior').setOrigin(0.5, 0.5);
        this.playerSprite.setScale(1.3);
        this.playerSprite.play('warrior_idle');
        this.hudContainer.add(this.playerSprite);
        this.playerBodyContainer = this.playerSprite;  // alias for compatibility
        this.hudContainer.add(this.add.text(leftCX, 140, 'Hero', { fontSize: '17px', color: '#fff', fontStyle: 'bold' }).setOrigin(0.5));
        // --- Energy Shield bar (above HP) ---
        this.playerShieldLabel = this.add.text(14, 148, 'ES', { fontSize: '9px', color: '#66aaff' });
        this.hudContainer.add(this.playerShieldLabel);
        this.playerShieldBarBg = this.add.rectangle(14, 157, barW, 8, 0x333344).setOrigin(0, 0.5);
        this.hudContainer.add(this.playerShieldBarBg);
        this.playerShieldBar = this.add.rectangle(14, 157, 0, 8, 0x3388ff).setOrigin(0, 0.5);
        this.hudContainer.add(this.playerShieldBar);
        this.playerShieldText = this.add.text(14 + barW / 2, 157, '', { fontSize: '7px', color: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5);
        this.hudContainer.add(this.playerShieldText);
        // --- HP bar ---
        this.hudContainer.add(this.add.text(14, 163, 'HP', { fontSize: '11px', color: '#aaa' }));
        this.playerHealthBarBg = this.add.rectangle(14, 174, barW, 12, 0x444444).setOrigin(0, 0.5);
        this.hudContainer.add(this.playerHealthBarBg);
        this.playerHealthBar = this.add.rectangle(14, 174, barW, 12, 0x00cc00).setOrigin(0, 0.5);
        this.hudContainer.add(this.playerHealthBar);
        this.playerHealthText = this.add.text(14 + barW / 2, 174, '', { fontSize: '9px', color: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5);
        this.hudContainer.add(this.playerHealthText);
        // --- Enemy panel (right) ---
        this.hudContainer.add(this.add.rectangle(rightCX, panelH / 2 + 4, panelW, panelH, 0x111111, 0.9).setOrigin(0.5));
        // Encounter label (shows enemy name for solo, foe count for groups)
        this.enemyEncounterLabel = this.add.text(rightCX, 14, '', { fontSize: '15px', color: '#fff', fontStyle: 'bold' }).setOrigin(0.5);
        this.hudContainer.add(this.enemyEncounterLabel);
        // Build initial enemy group
        this.encounterSize = 1;
        this.buildEnemyGroup(this.battleNumber, this.hudContainer);
        // Set the encounter label for the first battle
        if (this.enemies.length === 1) {
            this.enemyEncounterLabel.setText(`${this.enemies[0].name} Lv.${this.battleNumber}`);
        }
        // --- Gold display (under player HP bar) ---
        this.goldDisplayIcon = this.add.text(14, 190, '\ud83e\ude99', { fontSize: '14px' }).setOrigin(0, 0.5);
        this.goldDisplayText = this.add.text(32, 190, '0', { fontSize: '13px', color: '#ffd966', fontStyle: 'bold' }).setOrigin(0, 0.5);
        this.hudContainer.add([this.goldDisplayIcon, this.goldDisplayText]);

        this.createEquipmentScreen();
        this.createSkillsScreen();
        this.createTalentScreen();
        this.createStoreScreen();
        // 4 buttons evenly spaced across 390px width
        this.createEquipmentButton(49, 210);
        this.createSkillsButton(147, 210);
        this.createTalentButton(245, 210);
        this.createStoreButton(343, 210);

        this.updatePlayerUI();
        this.updateEnemyUI();
    }

    createRewardScreen() {
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;

        this.rewardScreenGroup = this.add.container(0, 0).setVisible(false);

        const bg = this.add.rectangle(width / 2, height / 2, width, height, 0x121212, 0.96);
        const panel = this.add.rectangle(width / 2, height / 2, width - 20, height - 20, 0x1f1f1f, 1).setStrokeStyle(2, 0x666666);
        const title = this.add.text(width / 2, 40, 'Victory Rewards', {
            fontSize: '26px',
            color: '#ffd166',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        this.rewardLootInfoText = this.add.text(width / 2, 70, '', {
            fontSize: '12px',
            color: '#9be7ff'
        }).setOrigin(0.5);

        this.rewardScreenGroup.add([bg, panel, title, this.rewardLootInfoText]);

        this.rewardCards = [];
        const cardWidth = 118;
        const cardHeight = 275;
        const spacing = 8;
        const startX = (width - (cardWidth * 3 + spacing * 2)) / 2 + cardWidth / 2;

        for (let i = 0; i < 3; i++) {
            const centerX = startX + i * (cardWidth + spacing);
            const centerY = height / 2 + 16;

            const cardBg = this.add.rectangle(centerX, centerY, cardWidth, cardHeight, 0x2a2a2a, 1).setStrokeStyle(2, 0x999999);
            const icon = this.add.text(centerX, centerY - 100, '', { fontSize: '28px' }).setOrigin(0.5);
            const name = this.add.text(centerX, centerY - 66, '', {
                fontSize: '13px',
                fontFamily: 'Georgia, Verdana, sans-serif',
                color: '#ffffff',
                fontStyle: 'bold',
                align: 'center',
                wordWrap: { width: cardWidth - 10, useAdvancedWrap: true }
            }).setOrigin(0.5);
            const rarity = this.add.text(centerX, centerY - 32, '', {
                fontSize: '11px',
                fontFamily: 'Georgia, Verdana, sans-serif',
                color: '#ffffff'
            }).setOrigin(0.5);
            const stats = this.add.text(centerX, centerY + 0, '', {
                fontSize: '11px',
                fontFamily: 'Verdana, Georgia, sans-serif',
                color: '#ffd966',
                align: 'center',
                wordWrap: { width: cardWidth - 10, useAdvancedWrap: true }
            }).setOrigin(0.5);
            const equippedLabel = this.add.text(centerX, centerY + 44, '', {
                fontSize: '10px',
                fontFamily: 'Verdana, Georgia, sans-serif',
                color: '#bbbbbb',
                align: 'center',
                wordWrap: { width: cardWidth - 10, useAdvancedWrap: true }
            }).setOrigin(0.5);
            const compareLines = [];
            for (let li = 0; li < 5; li++) {
                const cl = this.add.text(centerX, centerY + 56 + li * 12, '', {
                    fontSize: '10px',
                    fontFamily: 'Verdana, Georgia, sans-serif',
                    color: '#8aff8a',
                    align: 'center',
                    wordWrap: { width: cardWidth - 10, useAdvancedWrap: true }
                }).setOrigin(0.5);
                compareLines.push(cl);
            }

            const equipBtn = this.add.text(centerX - 28, centerY + 122, 'Equip', {
                fontSize: '12px',
                fontFamily: 'Verdana, Georgia, sans-serif',
                color: '#111111',
                backgroundColor: '#5aff9c',
                padding: { left: 5, right: 5, top: 3, bottom: 3 }
            }).setOrigin(0.5).setInteractive({ useHandCursor: true });

            const stashBtn = this.add.text(centerX + 30, centerY + 122, 'Stash', {
                fontSize: '12px',
                fontFamily: 'Verdana, Georgia, sans-serif',
                color: '#ffffff',
                backgroundColor: '#3b5ccc',
                padding: { left: 5, right: 5, top: 3, bottom: 3 }
            }).setOrigin(0.5).setInteractive({ useHandCursor: true });

            this.rewardScreenGroup.add([cardBg, icon, name, rarity, stats, equippedLabel, ...compareLines, equipBtn, stashBtn]);
            this.rewardCards.push({ cardBg, icon, name, rarity, stats, equippedLabel, compareLines, equipBtn, stashBtn });
        }
    }

    showRewardScreen() {
        if (!this.rewardScreenGroup) return;
        this.currentScreen = 'reward';
        this.closeSkillGemPopup();

        // Stop all in-flight particle effects so they don't overlay the reward screen
        this.stopAllParticleEffects();
        if (this.skillChargeFxContainer) this.skillChargeFxContainer.setVisible(false);

        this.boardContainer.setVisible(false);
        this.hudContainer.setVisible(false);
        if (this.skillBarContainer) this.skillBarContainer.setVisible(false);
        if (this.skillInfoPopup) this.skillInfoPopup.setVisible(false);
        if (this.equipmentScreenGroup) this.equipmentScreenGroup.setVisible(false);
        if (this.skillsScreenGroup) this.skillsScreenGroup.setVisible(false);
        if (this.talentScreenGroup) this.talentScreenGroup.setVisible(false);
        if (this.storeScreenGroup) this.storeScreenGroup.setVisible(false);
        this.rewardScreenGroup.setVisible(true);
        this.setGameBoardActive(false);
        this.closeInventoryItemPopup();

        const gear = this.getEquippedStatTotals();
        const magicFind = gear.magicFind;
        const monsterLevel = this.battleNumber;
        const foeCount = this.encounterSize;
        this.rewardLootInfoText.setText(`Battle Lv.${monsterLevel} (${foeCount} foe${foeCount > 1 ? 's' : ''}) | Magic Find: ${magicFind}`);

        this.rewardChoices = [];
        for (let i = 0; i < 3; i++) {
            this.rewardChoices.push(this.generateRewardItem(monsterLevel, magicFind));
        }

        this.rewardCards.forEach((card, index) => {
            const item = this.rewardChoices[index];
            const statText = Object.entries(item.stats)
                .map(([key, value]) => `${this.getStatLabel(key)} +${value}`)
                .join('\n');
            const compareData = this.getRewardCompareData(item);

            // Build per-stat comparison lines with ↑/↓ arrows and individual colors
            const targetSlot = compareData.targetSlot;
            const displacedItems = targetSlot ? this.getDisplacedItemsForEquip(item, targetSlot) : [];
            const equippedStats = {};
            displacedItems.forEach(entry => {
                const s = (entry && entry.item && entry.item.stats) || {};
                Object.entries(s).forEach(([stat, value]) => {
                    equippedStats[stat] = (equippedStats[stat] || 0) + value;
                });
            });
            const itemStats = item.stats || {};
            const allStatKeys = Array.from(new Set([...Object.keys(itemStats), ...Object.keys(equippedStats)]));
            const hasEquipped = displacedItems.length > 0 && displacedItems.some(e => e && e.item);
            const perStatLines = allStatKeys.map(stat => {
                const newVal = itemStats[stat] || 0;
                const oldVal = equippedStats[stat] || 0;
                const delta = newVal - oldVal;
                const label = this.getStatLabel(stat);
                if (!hasEquipped) {
                    return { text: `${label}: +${newVal}  ↑`, color: '#4eff8a' };
                } else if (delta > 0) {
                    return { text: `${label}: +${newVal} ↑ (+${delta})`, color: '#4eff8a' };
                } else if (delta < 0) {
                    return { text: `${label}: +${newVal} ↓ (${delta})`, color: '#ff6b6b' };
                } else {
                    return { text: `${label}: +${newVal} =`, color: '#ffd966' };
                }
            });

            card.cardBg.setStrokeStyle(3, item.frameColor, 1);
            card.icon.setText(item.icon);
            card.name.setText(item.name);
            card.name.setColor(item.rarityTextColor || '#ffffff');
            card.rarity.setText(`iLvl ${item.itemLevel || 1} ${item.rarity} ${item.type}`);
            card.rarity.setColor(item.rarityTextColor || '#ffffff');
            card.stats.setText(statText || 'No stats');
            card.equippedLabel.setText(compareData.equippedSummary || `Current ${compareData.targetSlotLabel}: ${compareData.equippedName}`);
            card.compareLines.forEach((lineObj, i) => {
                if (i < perStatLines.length) {
                    lineObj.setText(perStatLines[i].text);
                    lineObj.setColor(perStatLines[i].color);
                    lineObj.setVisible(true);
                } else {
                    lineObj.setText('');
                    lineObj.setVisible(false);
                }
            });

            card.equipBtn.removeAllListeners('pointerup');
            card.stashBtn.removeAllListeners('pointerup');
            card.equipBtn.on('pointerup', () => this.claimRewardItem(item, 'equip'));
            card.stashBtn.on('pointerup', () => this.claimRewardItem(item, 'inventory'));
        });

        this.addCombatLog('Choose one reward before the next battle.', '#ffd966');
    }

    equipItemDirectly(item) {
        const targetSlot = this.resolveEquipSlot(item.slotGroup);
        if (!targetSlot || !this.canEquipItemInSlot(item, targetSlot)) {
            this.addCombatLog(`Cannot equip ${item.name}: invalid slot`, '#ff8888');
            return;
        }
        const displacedItems = this.getDisplacedItemsForEquip(item, targetSlot);
        if (!this.canStoreDisplacedItems(displacedItems)) {
            this.addCombatLog('Not enough inventory space to swap gear.', '#ff8888');
            return;
        }

        for (let i = 0; i < displacedItems.length; i++) {
            const displaced = displacedItems[i];
            if (displaced && displaced.item) {
                this.addItemToInventory(displaced.item);
                this.clearEquippedSlot(displaced.slotKey);
            }
        }

        this.applyEquippedItemToSlot(item, targetSlot);
        this.updateEquipmentScreen();
        this.addCombatLog(`Equipped ${item.name} in ${targetSlot}${this.isTwoHandedItem(item) ? ' (2H)' : ''}`, '#99ff99');
    }

    claimRewardItem(item, destination) {
        if (!this.awaitingRewardChoice) return;

        if (destination === 'equip') {
            this.equipItemDirectly(item);
        } else {
            const added = this.addItemToInventory(item);
            if (added) {
                this.addCombatLog(`Added ${item.name} to inventory`, '#99ddff');
            } else {
                this.addCombatLog('Inventory full, auto-equipping selected reward.', '#ffaaaa');
                this.equipItemDirectly(item);
            }
        }

        this.awaitingRewardChoice = false;
        this.startNextBattle();
    }

    startNextBattle() {
        this.battleNumber += 1;
        this.skillCharge = this.createInitialSkillCharge();

        // Determine encounter size
        this.encounterSize = this.getEncounterSize(this.battleNumber);

        // Build enemy group (destroys old UI, creates new enemies)
        this.buildEnemyGroup(this.battleNumber, this.hudContainer);

        // Update encounter label
        if (this.enemyEncounterLabel) {
            if (this.encounterSize === 1) {
                this.enemyEncounterLabel.setText(`${this.enemies[0].name} Lv.${this.battleNumber}`);
            } else {
                const names = this.enemies.map(e => e.name);
                const uniqueNames = [...new Set(names)];
                this.enemyEncounterLabel.setText(`Lv.${this.battleNumber} - ${this.encounterSize} Foes`);
            }
        }

        this.refillEnergyShield();
        this.createGrid();
        this.renderGrid();
        this.updateSkillBarUI();
        this.updatePlayerUI();
        this.updateEnemyUI();

        this.isSwapping = false;
        this.player.talentPoints += 1;
        this.showGameScreen();
        const enemyNames = this.enemies.map(e => e.name).join(', ');
        this.addCombatLog(`Battle ${this.battleNumber}: ${enemyNames} appear! (${this.encounterSize} foe${this.encounterSize > 1 ? 's' : ''})`, '#ffcc66');
        this.addCombatLog(`Talent point earned! (${this.player.talentPoints} available)`, '#ffd700');
    }

    createEquipmentButton(x, y) {
        this.equipmentButton = this.add.text(x, y, 'Equip', {
            fontSize: '12px',
            color: '#00ffcc',
            backgroundColor: '#333333',
            padding: { left: 6, right: 6, top: 4, bottom: 4 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        this.hudContainer.add(this.equipmentButton);

        this.equipmentButton.on('pointerup', () => {
            this.showEquipmentScreen();
        });
    }

    createSkillsButton(x, y) {
        this.skillsButton = this.add.text(x, y, 'Skills', {
            fontSize: '12px',
            color: '#ffd56b',
            backgroundColor: '#333333',
            padding: { left: 6, right: 6, top: 4, bottom: 4 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        this.hudContainer.add(this.skillsButton);

        this.skillsButton.on('pointerup', () => {
            this.showSkillsScreen();
        });
    }

    createTalentButton(x, y) {
        this.talentButton = this.add.text(x, y, 'Talents', {
            fontSize: '12px',
            color: '#ffd700',
            backgroundColor: '#333333',
            padding: { left: 6, right: 6, top: 4, bottom: 4 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        this.hudContainer.add(this.talentButton);
        this.talentButton.on('pointerup', () => {
            this.showTalentScreen();
        });
    }

    createStoreButton(x, y) {
        this.storeButton = this.add.text(x, y, 'Store', {
            fontSize: '12px',
            color: '#ff99cc',
            backgroundColor: '#333333',
            padding: { left: 6, right: 6, top: 4, bottom: 4 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        this.hudContainer.add(this.storeButton);
        this.storeButton.on('pointerup', () => {
            this.showStoreScreen();
        });
    }

    showStoreScreen() {
        this.currentScreen = 'store';
        this.armedEquipGem = null;
        this.closeSkillGemPopup();
        this.closeInventoryItemPopup();
        if (this.storeScreenGroup) this.storeScreenGroup.setVisible(true);
        if (this.equipmentScreenGroup) this.equipmentScreenGroup.setVisible(false);
        if (this.skillsScreenGroup) this.skillsScreenGroup.setVisible(false);
        if (this.talentScreenGroup) this.talentScreenGroup.setVisible(false);
        if (this.rewardScreenGroup) this.rewardScreenGroup.setVisible(false);
        this.boardContainer.setVisible(false);
        this.hudContainer.setVisible(false);
        if (this.skillBarContainer) this.skillBarContainer.setVisible(false);
        if (this.skillInfoPopup) this.skillInfoPopup.setVisible(false);
        this.setGameBoardActive(false);
        this.generateStoreInventory();
        this.refreshStoreUI();
    }

    getItemPrice(item) {
        const rarityMultipliers = { Normal: 1, Magic: 3, Rare: 8, Legendary: 20 };
        const mult = rarityMultipliers[item.rarity] || 1;
        const levelFactor = Math.max(1, item.itemLevel);
        const statTotal = Object.values(item.stats).reduce((sum, v) => sum + v, 0);
        return Math.max(5, Math.round((10 + statTotal * 0.8) * mult * (1 + levelFactor * 0.1)));
    }

    generateStoreInventory() {
        this.storeItems = [];
        const lootScore = this.battleNumber * 10;
        for (let i = 0; i < 4; i++) {
            const item = this.generateLoot(lootScore);
            item.price = this.getItemPrice(item);
            this.storeItems.push(item);
        }
    }

    refreshStoreUI() {
        if (!this.storeScreenGroup) return;

        // Update gold label
        if (this.storeGoldLabel) {
            this.storeGoldLabel.setText(`🪙 Gold: ${this.player.gold}`);
        }

        // Clear old item cards
        this.storeItemCards.forEach(card => {
            card.forEach(obj => obj.destroy());
        });
        this.storeItemCards = [];

        const width = this.sys.game.config.width;
        const startY = 370;
        const cardW = width - 40;
        const cardH = 82;
        const gap = 8;

        this.storeItems.forEach((item, i) => {
            const cardObjs = [];
            const cy = startY + i * (cardH + gap);

            // Card background
            const cardBg = this.add.rectangle(width / 2, cy, cardW, cardH, 0x1a1a2e, 1)
                .setStrokeStyle(2, item.frameColor, 0.9);
            cardObjs.push(cardBg);

            // Item icon
            const icon = this.add.text(30, cy - 18, item.icon, { fontSize: '22px' }).setOrigin(0, 0.5);
            cardObjs.push(icon);

            // Item name
            const nameText = this.add.text(58, cy - 24, item.name, {
                fontSize: '12px', color: item.rarityTextColor, fontStyle: 'bold', wordWrap: { width: cardW - 140 }
            }).setOrigin(0, 0);
            cardObjs.push(nameText);

            // Item type + level
            const typeText = this.add.text(58, cy - 8, `${item.type} | Lv.${item.itemLevel} | ${item.rarity}`, {
                fontSize: '10px', color: '#aaaaaa'
            }).setOrigin(0, 0);
            cardObjs.push(typeText);

            // Stats summary
            const statsStr = Object.entries(item.stats)
                .map(([key, value]) => `${this.getStatLabel(key)} +${value}`)
                .join('  ');
            const statText = this.add.text(58, cy + 8, statsStr, {
                fontSize: '10px', color: '#cccccc', wordWrap: { width: cardW - 140 }
            }).setOrigin(0, 0);
            cardObjs.push(statText);

            // Price + buy button
            const priceStr = `🪙 ${item.price}`;
            const canAfford = this.player.gold >= item.price;
            const buyBtn = this.add.text(width - 30, cy, priceStr, {
                fontSize: '13px',
                color: canAfford ? '#ffd966' : '#ff5555',
                backgroundColor: canAfford ? '#2a4a2a' : '#3a2020',
                fontStyle: 'bold',
                padding: { left: 8, right: 8, top: 6, bottom: 6 }
            }).setOrigin(1, 0.5).setInteractive({ useHandCursor: true });
            cardObjs.push(buyBtn);

            buyBtn.on('pointerup', () => {
                this.buyStoreItem(i);
            });

            cardObjs.forEach(obj => this.storeScreenGroup.add(obj));
            this.storeItemCards.push(cardObjs);
        });
    }

    buyStoreItem(index) {
        const item = this.storeItems[index];
        if (!item) return;

        if (this.player.gold < item.price) {
            this.addCombatLog('Not enough gold!', '#ff8888');
            return;
        }

        if (this.inventory.length >= this.maxInventorySlots) {
            this.addCombatLog('Inventory full! Cannot buy.', '#ff8888');
            return;
        }

        this.player.gold -= item.price;
        const bought = { ...item };
        delete bought.price;
        this.inventory.push(bought);
        this.updateInventoryGridUI();
        this.addCombatLog(`Bought ${item.rarity} ${item.name} for ${item.price} gold!`, item.rarityTextColor);

        // Remove from store
        this.storeItems.splice(index, 1);
        this.refreshStoreUI();
        this.updateGoldDisplay();
    }

    createStoreScreen() {
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;

        this.storeScreenGroup = this.add.container(0, 0).setVisible(false);

        const bg = this.add.rectangle(width / 2, height / 2, width, height, 0x0a0a14, 1);
        const panel = this.add.rectangle(width / 2, height / 2, width - 10, height - 10, 0x12121e, 1)
            .setStrokeStyle(2, 0xff99cc, 0.8);
        this.storeScreenGroup.add([bg, panel]);

        // Title
        const title = this.add.text(width / 2, 22, 'Rodent Emporium', {
            fontSize: '20px', color: '#ff99cc', fontStyle: 'bold'
        }).setOrigin(0.5);
        this.storeScreenGroup.add(title);

        // --- Draw rodent shopkeeper using graphics ---
        const skG = this.add.graphics();
        const cx = width / 2;
        const baseY = 190;

        // Body (brown oval)
        skG.fillStyle(0x8B6914, 1);
        skG.fillEllipse(cx, baseY, 80, 100);

        // Belly (lighter)
        skG.fillStyle(0xD4A855, 1);
        skG.fillEllipse(cx, baseY + 10, 50, 60);

        // Head
        skG.fillStyle(0x8B6914, 1);
        skG.fillEllipse(cx, baseY - 60, 60, 50);

        // Ears (round)
        skG.fillStyle(0xA0782B, 1);
        skG.fillEllipse(cx - 25, baseY - 85, 22, 26);
        skG.fillEllipse(cx + 25, baseY - 85, 22, 26);
        // Inner ears
        skG.fillStyle(0xE8B8B8, 1);
        skG.fillEllipse(cx - 25, baseY - 85, 12, 16);
        skG.fillEllipse(cx + 25, baseY - 85, 12, 16);

        // Eyes
        skG.fillStyle(0x000000, 1);
        skG.fillCircle(cx - 12, baseY - 65, 5);
        skG.fillCircle(cx + 12, baseY - 65, 5);
        // Eye shine
        skG.fillStyle(0xffffff, 1);
        skG.fillCircle(cx - 10, baseY - 67, 2);
        skG.fillCircle(cx + 14, baseY - 67, 2);

        // Nose
        skG.fillStyle(0xFF9999, 1);
        skG.fillCircle(cx, baseY - 53, 4);

        // Whiskers
        skG.lineStyle(1, 0x666666, 0.7);
        skG.lineBetween(cx - 4, baseY - 52, cx - 35, baseY - 58);
        skG.lineBetween(cx - 4, baseY - 50, cx - 35, baseY - 48);
        skG.lineBetween(cx + 4, baseY - 52, cx + 35, baseY - 58);
        skG.lineBetween(cx + 4, baseY - 50, cx + 35, baseY - 48);

        // Teeth (two front teeth)
        skG.fillStyle(0xFFFFEE, 1);
        skG.fillRect(cx - 4, baseY - 49, 3, 6);
        skG.fillRect(cx + 1, baseY - 49, 3, 6);

        // Arms holding a small sack
        skG.lineStyle(4, 0x8B6914, 1);
        skG.lineBetween(cx - 35, baseY - 10, cx - 18, baseY + 20);
        skG.lineBetween(cx + 35, baseY - 10, cx + 18, baseY + 20);

        // Small sack / bag
        skG.fillStyle(0x6B4E1B, 1);
        skG.fillEllipse(cx, baseY + 28, 30, 20);
        skG.lineStyle(2, 0x4a3510, 1);
        skG.strokeEllipse(cx, baseY + 28, 30, 20);

        // Gold coins peeking out of sack
        skG.fillStyle(0xFFD700, 1);
        skG.fillCircle(cx - 5, baseY + 20, 4);
        skG.fillCircle(cx + 5, baseY + 22, 3);

        // Tail (curved line)
        skG.lineStyle(3, 0x8B6914, 1);
        skG.beginPath();
        skG.moveTo(cx + 35, baseY + 30);
        skG.lineTo(cx + 50, baseY + 10);
        skG.lineTo(cx + 55, baseY - 10);
        skG.strokePath();

        // Feet
        skG.fillStyle(0x7A5B12, 1);
        skG.fillEllipse(cx - 15, baseY + 48, 18, 10);
        skG.fillEllipse(cx + 15, baseY + 48, 18, 10);

        this.storeScreenGroup.add(skG);

        // Shopkeeper dialogue
        const dialogue = this.add.text(cx, baseY + 68, '"Take a look, yes-yes! Fine wares!"', {
            fontSize: '12px', color: '#ffddaa', fontStyle: 'italic'
        }).setOrigin(0.5);
        this.storeScreenGroup.add(dialogue);

        // Divider line
        const divider = this.add.rectangle(width / 2, 340, width - 30, 2, 0xff99cc, 0.3);
        this.storeScreenGroup.add(divider);

        // Gold display on store screen
        this.storeGoldLabel = this.add.text(width / 2, 352, `🪙 Gold: ${this.player.gold}`, {
            fontSize: '14px', color: '#ffd966', fontStyle: 'bold'
        }).setOrigin(0.5);
        this.storeScreenGroup.add(this.storeGoldLabel);

        // Back button
        const backBtn = this.add.text(width / 2, height - 28, 'Back to Game', {
            fontSize: '16px', color: '#00ff00', backgroundColor: '#333333',
            padding: { left: 10, right: 10, top: 5, bottom: 5 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        backBtn.on('pointerup', () => this.showGameScreen());
        this.storeScreenGroup.add(backBtn);
    }

    showTalentScreen() {
        this.currentScreen = 'talents';
        this.armedEquipGem = null;
        this.closeSkillGemPopup();
        this.closeInventoryItemPopup();
        if (this.talentScreenGroup) this.talentScreenGroup.setVisible(true);
        if (this.equipmentScreenGroup) this.equipmentScreenGroup.setVisible(false);
        if (this.skillsScreenGroup) this.skillsScreenGroup.setVisible(false);
        if (this.rewardScreenGroup) this.rewardScreenGroup.setVisible(false);
        if (this.storeScreenGroup) this.storeScreenGroup.setVisible(false);
        this.boardContainer.setVisible(false);
        this.hudContainer.setVisible(false);
        if (this.skillBarContainer) this.skillBarContainer.setVisible(false);
        if (this.skillInfoPopup) this.skillInfoPopup.setVisible(false);
        this.setGameBoardActive(false);
        // Reset zoom/pan — start slightly zoomed out to show spread tree
        this._talentZoom = 0.85;
        this._talentPanX = 25;
        this._talentPanY = -10;
        this._talentIsPinching = false;
        this._talentPinchStartDist = null;
        this._talentPinchStartZoom = null;
        this._applyTalentTreeTransform();
        this.refreshTalentScreenUI();
    }

    allocateTalent(nodeId) {
        const node = TALENT_TREE_NODES.find(n => n.id === nodeId);
        if (!node) return;

        if (this.allocatedTalents.has(nodeId)) return;

        if (this.player.talentPoints <= 0) {
            this.addCombatLog('No talent points — defeat an enemy to earn one!', '#ff8888');
            return;
        }

        this.player.talentPoints -= 1;
        this.allocatedTalents.add(nodeId);

        // Flat attribute stats apply directly to the player
        if (node.stat === 'strength' || node.stat === 'intelligence' || node.stat === 'dexterity') {
            this.player[node.stat] = (this.player[node.stat] || 0) + node.value;
        }

        this.addCombatLog(`Learned ${node.name}! ${node.shortDesc}`, '#ffd700');
        this.refreshTalentScreenUI();
    }

    createTalentScreen() {
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;

        this.talentScreenGroup = this.add.container(0, 0).setVisible(false);

        const bg = this.add.rectangle(width / 2, height / 2, width, height, 0x080810, 1);
        const panel = this.add.rectangle(width / 2, height / 2, width - 10, height - 10, 0x0e0e1a, 1)
            .setStrokeStyle(2, 0xffd700, 0.8);

        this.talentScreenGroup.add([bg, panel]);

        // --- Inner container for zoomable/pannable tree content ---
        this.talentTreeContainer = this.add.container(0, 0);
        this.talentScreenGroup.add(this.talentTreeContainer);

        // Clip tree content to the yellow border so zoomed edges disappear at the panel edge
        const maskShape = this.make.graphics({ add: false });
        maskShape.fillStyle(0xffffff);
        maskShape.fillRect(5, 5, width - 10, height - 10);
        this.talentTreeContainer.setMask(maskShape.createGeometryMask());

        // Graphics layer for connection lines
        this.talentConnectionGraphics = this.add.graphics();
        this.talentTreeContainer.add(this.talentConnectionGraphics);

        // Build node UI elements
        this.talentNodeUI = {};
        const nodeRadius = 13;

        TALENT_TREE_NODES.forEach(node => {
            const isKey = node.isKeystone;
            const r = isKey ? 17 : nodeRadius;

            const glow = this.add.circle(node.x, node.y, r + 6, node.color, 0.12).setAlpha(0);
            const circle = this.add.circle(node.x, node.y, r, 0x111122, 1)
                .setStrokeStyle(2, 0x333355, 1)
                .setInteractive({ useHandCursor: true });

            const iconText = this.add.text(node.x, node.y, node.icon, {
                fontSize: isKey ? '13px' : '10px'
            }).setOrigin(0.5);

            circle.on('pointerup', () => {
                this.talentInfoText.setText(`${node.name}: ${node.shortDesc}`);
                this.talentInfoText.setColor(this.toHexColor(node.color));
                this.allocateTalent(node.id);
            });

            this.talentNodeUI[node.id] = { circle, glow, iconText };
            this.talentTreeContainer.add([glow, circle, iconText]);
        });

        // Bonus summary at bottom of tree
        this.talentSummaryText = this.add.text(width / 2, height - 60, '', {
            fontSize: '9px', color: '#888899', align: 'center',
            wordWrap: { width: 360, useAdvancedWrap: true }
        }).setOrigin(0.5);
        this.talentTreeContainer.add(this.talentSummaryText);

        // --- Fixed UI overlay (not affected by zoom/pan) ---
        const title = this.add.text(width / 2, 22, 'Talent Tree', {
            fontSize: '20px', color: '#ffd700', fontStyle: 'bold'
        }).setOrigin(0.5);

        this.talentPointsLabel = this.add.text(width / 2, 44, 'Points: 0', {
            fontSize: '13px', color: '#ffffff', fontStyle: 'bold'
        }).setOrigin(0.5);

        this.talentInfoText = this.add.text(width / 2, 64, 'Tap any node to allocate', {
            fontSize: '11px', color: '#b8a860', align: 'center'
        }).setOrigin(0.5);

        const backBtn = this.add.text(12, 8, '← Back', {
            fontSize: '13px', color: '#00ffcc', backgroundColor: '#1a1a2e',
            padding: { left: 8, right: 8, top: 3, bottom: 3 }
        }).setOrigin(0, 0).setInteractive({ useHandCursor: true });
        backBtn.on('pointerup', () => this.showGameScreen());

        this.talentZoomText = this.add.text(width - 12, 8, '100%', {
            fontSize: '11px', color: '#888899'
        }).setOrigin(1, 0);

        this.talentScreenGroup.add([title, this.talentPointsLabel, this.talentInfoText, backBtn, this.talentZoomText]);

        // Zoom / pan state
        this._talentZoom = 0.85;
        this._talentPanX = 25;
        this._talentPanY = -10;
        this._talentMinZoom = 0.4;
        this._talentMaxZoom = 2.5;
        this._talentPinchStartDist = null;
        this._talentPinchStartZoom = null;
        this._talentIsPinching = false;
        this._talentDragStartX = null;
        this._talentDragStartY = null;
        this._talentIsDragging = false;
        this._talentPointerOnNode = false;

        // Track whether pointerdown landed on a talent node (so we don't drag from nodes)
        TALENT_TREE_NODES.forEach(node => {
            const ui = this.talentNodeUI[node.id];
            if (ui && ui.circle) {
                ui.circle.on('pointerdown', () => { this._talentPointerOnNode = true; });
            }
        });

        // --- Pinch-to-zoom via native DOM touch events (reliable multi-touch) ---
        const canvas = this.game.canvas;
        const canvasRect = () => canvas.getBoundingClientRect();

        canvas.addEventListener('touchstart', (e) => {
            if (this.currentScreen !== 'talents') return;
            if (e.touches.length === 2) {
                // Start pinch
                this._talentIsPinching = true;
                const t1 = e.touches[0];
                const t2 = e.touches[1];
                this._talentPinchStartDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
                this._talentPinchStartZoom = this._talentZoom;
                // Cancel any in-progress drag
                this._talentDragStartX = null;
                this._talentIsDragging = false;
            }
        }, { passive: true });

        canvas.addEventListener('touchmove', (e) => {
            if (this.currentScreen !== 'talents') return;
            if (e.touches.length === 2 && this._talentPinchStartDist !== null) {
                this._talentIsPinching = true;
                const t1 = e.touches[0];
                const t2 = e.touches[1];
                const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
                const scale = dist / this._talentPinchStartDist;
                const oldZoom = this._talentZoom;
                this._talentZoom = Phaser.Math.Clamp(
                    this._talentPinchStartZoom * scale,
                    this._talentMinZoom,
                    this._talentMaxZoom
                );
                // Zoom toward midpoint of the two touches
                const rect = canvasRect();
                const scaleX = this.scale.width / rect.width;
                const scaleY = this.scale.height / rect.height;
                const cx = ((t1.clientX + t2.clientX) / 2 - rect.left) * scaleX;
                const cy = ((t1.clientY + t2.clientY) / 2 - rect.top) * scaleY;
                if (oldZoom !== 0) {
                    this._talentPanX = cx - (cx - this._talentPanX) * (this._talentZoom / oldZoom);
                    this._talentPanY = cy - (cy - this._talentPanY) * (this._talentZoom / oldZoom);
                }
                this._applyTalentTreeTransform();
                e.preventDefault();
            }
        }, { passive: false });

        canvas.addEventListener('touchend', (e) => {
            if (this.currentScreen !== 'talents') return;
            if (e.touches.length < 2) {
                this._talentPinchStartDist = null;
                this._talentPinchStartZoom = null;
                // Brief delay before allowing drag again so the remaining finger doesn't jump-pan
                this.time.delayedCall(100, () => { this._talentIsPinching = false; });
            }
        }, { passive: true });

        // Drag-to-pan via scene-level pointer events
        this.input.on('pointerdown', (pointer) => {
            if (this.currentScreen !== 'talents') return;
            if (this._talentIsPinching) return;
            this._talentPointerOnNode = false;
            // Delay check so node pointerdown fires first
            this.time.delayedCall(0, () => {
                if (this._talentPointerOnNode) return;
                if (this._talentIsPinching) return;
                this._talentDragStartX = pointer.x;
                this._talentDragStartY = pointer.y;
                this._talentIsDragging = false;
            });
        });

        this.input.on('pointermove', (pointer) => {
            if (this.currentScreen !== 'talents') return;
            if (this._talentIsPinching) return;

            // Single-finger drag-to-pan
            if (!pointer.isDown) return;
            if (this._talentDragStartX === null) return;

            const dx = pointer.x - this._talentDragStartX;
            const dy = pointer.y - this._talentDragStartY;

            if (!this._talentIsDragging && Math.abs(dx) + Math.abs(dy) > 5) {
                this._talentIsDragging = true;
            }

            if (this._talentIsDragging) {
                this._talentPanX += dx;
                this._talentPanY += dy;
                this._talentDragStartX = pointer.x;
                this._talentDragStartY = pointer.y;
                this._applyTalentTreeTransform();
            }
        });

        this.input.on('pointerup', () => {
            if (this.currentScreen !== 'talents') return;
            this._talentDragStartX = null;
            this._talentDragStartY = null;
            this._talentIsDragging = false;
            this._talentPointerOnNode = false;
        });

        // Mouse wheel zoom (for desktop)
        this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY) => {
            if (this.currentScreen !== 'talents') return;
            const zoomDelta = deltaY > 0 ? -0.1 : 0.1;
            const oldZoom = this._talentZoom;
            this._talentZoom = Phaser.Math.Clamp(
                this._talentZoom + zoomDelta,
                this._talentMinZoom,
                this._talentMaxZoom
            );
            // Zoom toward pointer position
            const cx = pointer.x;
            const cy = pointer.y;
            this._talentPanX = cx - (cx - this._talentPanX) * (this._talentZoom / oldZoom);
            this._talentPanY = cy - (cy - this._talentPanY) * (this._talentZoom / oldZoom);
            this._applyTalentTreeTransform();
        });

        this.refreshTalentScreenUI();
    }

    _applyTalentTreeTransform() {
        if (!this.talentTreeContainer) return;
        this.talentTreeContainer.setScale(this._talentZoom);
        this.talentTreeContainer.setPosition(this._talentPanX, this._talentPanY);
        if (this.talentZoomText) {
            this.talentZoomText.setText(`${Math.round(this._talentZoom * 100)}%`);
        }
    }

    refreshTalentScreenUI() {
        if (!this.talentScreenGroup) return;

        if (this.talentPointsLabel) {
            const pts = this.player.talentPoints;
            this.talentPointsLabel.setText(`Talent Points: ${pts}`);
            this.talentPointsLabel.setColor(pts > 0 ? '#ffd700' : '#888888');
        }

        // Redraw connection lines
        if (this.talentConnectionGraphics) {
            this.talentConnectionGraphics.clear();
            TALENT_TREE_CONNECTIONS.forEach(conn => {
                const fromNode = TALENT_TREE_NODES.find(n => n.id === conn.from);
                const toNode   = TALENT_TREE_NODES.find(n => n.id === conn.to);
                if (!fromNode || !toNode) return;
                const fromAlloc = this.allocatedTalents.has(conn.from);
                const toAlloc   = this.allocatedTalents.has(conn.to);
                const color = (fromAlloc && toAlloc) ? 0xffd700
                            : (fromAlloc || toAlloc) ? 0x887733
                            : 0x2a2a3a;
                const alpha = (fromAlloc && toAlloc) ? 0.9
                            : (fromAlloc || toAlloc) ? 0.55
                            : 0.3;
                this.talentConnectionGraphics.lineStyle(2, color, alpha);
                this.talentConnectionGraphics.beginPath();
                this.talentConnectionGraphics.moveTo(fromNode.x, fromNode.y);
                this.talentConnectionGraphics.lineTo(toNode.x, toNode.y);
                this.talentConnectionGraphics.strokePath();
            });
        }

        // Update node visuals
        Object.entries(this.talentNodeUI).forEach(([idStr, ui]) => {
            const nodeId = parseInt(idStr);
            const node = TALENT_TREE_NODES.find(n => n.id === nodeId);
            if (!node || !ui) return;

            const isAllocated = this.allocatedTalents.has(nodeId);
            const hasPoints = this.player.talentPoints > 0;

            if (isAllocated) {
                ui.circle.setFillStyle(0x2e2200, 1).setStrokeStyle(2, node.color, 1);
                ui.glow.setFillStyle(node.color, 0.15).setAlpha(0.5);
                ui.iconText.setAlpha(1);
            } else if (hasPoints) {
                ui.circle.setFillStyle(0x142035, 1).setStrokeStyle(2, 0x6699ff, 1);
                ui.glow.setAlpha(0.15);
                ui.iconText.setAlpha(0.9);
            } else {
                ui.circle.setFillStyle(0x0a0a15, 1).setStrokeStyle(2, 0x222233, 1);
                ui.glow.setAlpha(0);
                ui.iconText.setAlpha(0.3);
            }
        });

        // Update bonus summary
        if (this.talentSummaryText) {
            const b = this.getTalentPercentBonuses();
            const parts = [];
            if (b.physicalDamage > 0) parts.push(`+${b.physicalDamage}% Phys`);
            if (b.magicDamage > 0) parts.push(`+${b.magicDamage}% Magic`);
            if (b.rangedDamage > 0) parts.push(`+${b.rangedDamage}% Ranged`);
            if (b.armor > 0) parts.push(`+${b.armor}% Armour`);
            if (b.health > 0) parts.push(`+${b.health}% HP`);
            if (b.energyShield > 0) parts.push(`+${b.energyShield}% ES`);
            if (b.evasion > 0) parts.push(`+${b.evasion}% Eva`);
            if (b.blockChance > 0) parts.push(`+${b.blockChance}% Block`);
            if (b.redTileChance > 0) parts.push(`+${b.redTileChance}% Red Tile`);
            if (b.juggernaut) parts.push('Juggernaut');
            if (b.seeRed) parts.push('See Red');
            this.talentSummaryText.setText(parts.length > 0 ? `Bonuses: ${parts.join(' | ')}` : '');
        }
    }

    createSkillsScreen() {
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;

        this.skillsScreenGroup = this.add.container(0, 0).setVisible(false);

        const bg = this.add.rectangle(width / 2, height / 2, width - 20, height - 20, 0x151515, 0.98)
            .setStrokeStyle(2, 0xffffff, 1);
        const title = this.add.text(width / 2, 44, 'Skill Gems', {
            fontSize: '24px',
            color: '#ffd56b',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        const subtitle = this.add.text(width / 2, 72, 'Drag gems into matching sockets or tap gem for details.', {
            fontSize: '12px',
            color: '#bfbfbf'
        }).setOrigin(0.5);
        const backBtn = this.add.text(12, 12, 'Back to Game', {
            fontSize: '14px',
            color: '#00ffcc',
            backgroundColor: '#333333',
            padding: { left: 6, right: 6, top: 3, bottom: 3 }
        }).setOrigin(0, 0).setInteractive({ useHandCursor: true });
        backBtn.on('pointerup', () => this.showGameScreen());

        this.skillsScreenGroup.add([bg, title, subtitle, backBtn]);

        // Make main slots much bigger and spaced
        // Resize and reposition so bottom slot doesn't collide with inventory
        const loadoutStartY = 170;
        const rowSpacing = 140;
        const activeX = 110;
        const supportStartX = 260;
        const supportGapX = 68;
        const mainRadius = 52;
        this.skillsActiveSlotUI = [];

        for (let slotIndex = 0; slotIndex < 3; slotIndex++) {
            const centerX = activeX;
            const centerY = loadoutStartY + slotIndex * rowSpacing;

            const cardBg = this.add.circle(centerX, centerY, mainRadius, 0x202020, 1)
                .setStrokeStyle(3, 0xffffff, 1)
                .setInteractive({ useHandCursor: true });
            const cardLabel = this.add.text(centerX, centerY - mainRadius - 18, `Skill ${slotIndex + 1}`, {
                fontSize: '14px',
                color: '#d9d9d9',
                fontStyle: 'bold'
            }).setOrigin(0.5);
            const iconText = this.add.text(centerX, centerY, '', {
                fontSize: '36px'
            }).setOrigin(0.5);
            const skillIconImage = this.add.image(centerX, centerY, 'skill_cleave')
                .setOrigin(0.5).setVisible(false);
            const iconDiam = mainRadius * 2 - 12;
            skillIconImage.setDisplaySize(iconDiam, iconDiam);
            const nameText = this.add.text(centerX, centerY + mainRadius + 12, '', {
                fontSize: '13px',
                color: '#ffffff',
                fontStyle: 'bold',
                wordWrap: { width: 120, useAdvancedWrap: true },
                align: 'center'
            }).setOrigin(0.5);
            const chargeText = this.add.text(centerX + 2, centerY + mainRadius + 32, '', {
                fontSize: '12px',
                color: '#cccccc'
            }).setOrigin(0.5);

            const supportSockets = [];
            for (let socketIndex = 0; socketIndex < 3; socketIndex++) {
                const socketX = supportStartX + socketIndex * supportGapX;
                const socketY = centerY;
                const connector = this.add.line(centerX, centerY, 0, 0, socketX - centerX, socketY - centerY, 0x8b8b8b, 0.75)
                    .setLineWidth(2, 2);
                const socketRadius = 18;
                const socketBg = this.add.circle(socketX, socketY, socketRadius, 0x2f2f2f, 1)
                    .setStrokeStyle(2, 0x808080, 1)
                    .setInteractive({ useHandCursor: true });
                const socketText = this.add.text(socketX, socketY, '-', {
                    fontSize: '12px',
                    color: '#d0d0d0'
                }).setOrigin(0.5);
                socketBg.on('pointerup', () => this.equipSelectedGemToSupportSlot(slotIndex, socketIndex));
                supportSockets.push({ socketBg, socketText, connector, center: { x: socketX, y: socketY }, radius: socketRadius });
                this.skillsScreenGroup.add([connector, socketBg, socketText]);
            }

            cardBg.on('pointerup', () => this.equipSelectedGemToActiveSlot(slotIndex));

            this.skillsActiveSlotUI.push({
                cardBg,
                cardLabel,
                iconText,
                skillIconImage,
                nameText,
                chargeText,
                supportSockets,
                mainCenter: { x: centerX, y: centerY },
                mainRadius
            });
            this.skillsScreenGroup.add([cardBg, cardLabel, iconText, skillIconImage, nameText, chargeText]);
        }


        // --- Scrollable Skill Gem Inventory ---
        // Use a more neutral grey background to match the rest of the game
        const inventoryPanel = this.add.rectangle(width / 2, 640, width - 26, 290, 0x232323, 1)
            .setStrokeStyle(1, 0x666666, 1);
        const inventoryTitle = this.add.text(width / 2, 502, 'Gem Inventory', {
            fontSize: '16px',
            color: '#7ee8ff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        this.selectedGemLabel = this.add.text(width / 2, 522, 'Selected: none', {
            fontSize: '11px',
            color: '#bbbbbb'
        }).setOrigin(0.5);
        this.skillsScreenGroup.add([inventoryPanel, inventoryTitle, this.selectedGemLabel]);

        // Scrollable container for gems
        const scrollMask = this.add.graphics();
        scrollMask.fillStyle(0xffffff, 1);
        scrollMask.beginPath();
        scrollMask.fillRect(width / 2 - (width - 60) / 2, 560, width - 60, 220);
        scrollMask.closePath();
        const gemScrollContainer = this.add.container(0, 0);
        gemScrollContainer.setMask(new Phaser.Display.Masks.GeometryMask(this, scrollMask));
        this.skillsScreenGroup.add([scrollMask, gemScrollContainer]);

        this.skillsInventoryTiles = [];
        const cols = 5;
        const cellW = 68;
        const cellH = 72;
        const gapX = 6;
        const gapY = 4;
        let gemIndex = 0;
        const totalRows = Math.ceil(this.skillsInventoryGems.length / cols);
        for (let row = 0; row < totalRows; row++) {
            for (let col = 0; col < cols; col++) {
                if (gemIndex >= this.skillsInventoryGems.length) break;
                const tileIndex = gemIndex;
                const gem = this.skillsInventoryGems[tileIndex];
                const x = (width - (cols * cellW + (cols - 1) * gapX)) / 2 + col * (cellW + gapX);
                const y = 570 + row * (cellH + gapY);
                const centerX = x + cellW / 2;
                const centerY = y + 27;

                const tileBg = this.add.circle(centerX, centerY, 25, 0x292929, 1)
                    .setStrokeStyle(2, 0x666666, 1)
                    .setInteractive({ useHandCursor: true });
                const iconText = this.add.text(centerX, centerY, '', {
                    fontSize: '24px'
                }).setOrigin(0.5);
                const tileSkillIcon = this.add.image(centerX, centerY, 'skill_cleave')
                    .setOrigin(0.5).setVisible(false);
                tileSkillIcon.setDisplaySize(42, 42);
                const nameText = this.add.text(centerX, y + 54, '', {
                    fontSize: '9px',
                    color: '#ffffff',
                    align: 'center',
                    wordWrap: { width: cellW - 8, useAdvancedWrap: true }
                }).setOrigin(0.5);
                const typeText = this.add.text(centerX, y + 66, '', {
                    fontSize: '8px',
                    color: '#aaaaaa'
                }).setOrigin(0.5);

                let dragStartX = 0;
                let dragStartY = 0;
                let dragMoved = false;
                const dragTapThreshold = 12;

                tileBg.on('pointerup', () => {
                    if (dragMoved) {
                        dragMoved = false;
                        // If a drag just happened, do not show popup
                        if (this.justDroppedSkillGem) {
                            this.justDroppedSkillGem = false;
                            return;
                        }
                        return;
                    }
                    const selectedGem = this.skillsInventoryGems[tileIndex];
                    if (!selectedGem) return;
                    this.openSkillGemPopup(selectedGem, tileIndex);
                });

                tileBg.on('dragstart', (pointer) => {
                    this.draggingSkillGemTile = tileBg;
                    this.skillGemWasDragged = false;
                    dragMoved = false;
                    dragStartX = pointer.worldX;
                    dragStartY = pointer.worldY;
                    tileBg.setDepth(1200);
                    iconText.setDepth(1201);
                    tileSkillIcon.setDepth(1201);
                    nameText.setDepth(1201);
                    typeText.setDepth(1201);
                });

                tileBg.on('drag', (pointer, dragX, dragY) => {
                    if (!dragMoved) {
                        const dx = pointer.worldX - dragStartX;
                        const dy = pointer.worldY - dragStartY;
                        dragMoved = (dx * dx + dy * dy) >= (dragTapThreshold * dragTapThreshold);
                    }
                    this.skillGemWasDragged = dragMoved;
                    tileBg.x = dragX;
                    tileBg.y = dragY;
                    iconText.x = dragX;
                    iconText.y = dragY;
                    tileSkillIcon.x = dragX;
                    tileSkillIcon.y = dragY;
                    nameText.x = dragX;
                    nameText.y = dragY + 27;
                    typeText.x = dragX;
                    typeText.y = dragY + 39;
                });

                tileBg.on('dragend', (pointer) => {
                    if (dragMoved) {
                        this.handleSkillGemDrop({ index: tileIndex }, pointer.worldX, pointer.worldY);
                    } else {
                        const selectedGem = this.skillsInventoryGems[tileIndex];
                        if (selectedGem && (!this.skillsGemModal || !this.skillsGemModal.visible)) {
                            this.openSkillGemPopup(selectedGem, tileIndex);
                        }
                    }
                    tileBg.setDepth(0);
                    iconText.setDepth(0);
                    tileSkillIcon.setDepth(0);
                    nameText.setDepth(0);
                    typeText.setDepth(0);
                    this.draggingSkillGemTile = null;
                    dragMoved = false;
                    this.refreshSkillsScreenUI();
                });

                this.input.setDraggable(tileBg);

                this.skillsInventoryTiles.push({
                    tileBg,
                    iconText,
                    tileSkillIcon,
                    nameText,
                    typeText,
                    index: tileIndex,
                    homeX: centerX,
                    homeY: centerY,
                    gem
                });
                gemScrollContainer.add([tileBg, iconText, tileSkillIcon, nameText, typeText]);
                gemIndex += 1;
            }
        }

        // Enable drag-to-scroll for gem inventory
        let scrollStartY = 0;
        let scrollDragStart = 0;
        let isScrolling = false;
        scrollMask.setInteractive(new Phaser.Geom.Rectangle(width / 2 - (width - 60) / 2, 560, width - 60, 220), Phaser.Geom.Rectangle.Contains);
        scrollMask.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown()) {
                isScrolling = true;
                scrollDragStart = pointer.position.y;
                scrollStartY = gemScrollContainer.y;
            }
        });
        scrollMask.on('pointermove', (pointer) => {
            if (isScrolling && pointer.isDown) {
                let newY = scrollStartY + (pointer.position.y - scrollDragStart);
                // Clamp scrolling
                const minY = Math.min(0, 560 + 220 - (totalRows * (cellH + gapY)));
                const maxY = 0;
                gemScrollContainer.y = Phaser.Math.Clamp(newY, minY, maxY);
            }
        });
        scrollMask.on('pointerup', () => {
            isScrolling = false;
        });
        scrollMask.on('pointerout', () => {
            isScrolling = false;
        });

        const gemModalOverlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.7)
            .setInteractive({ useHandCursor: true });
        const gemModalCard = this.add.rectangle(width / 2, height / 2, 350, 340, 0x111111, 1)
            .setStrokeStyle(2, 0xffffff, 1);
        this.skillsGemModalTitle = this.add.text(width / 2, height / 2 - 118, 'Gem Details', {
            fontSize: '20px',
            color: '#ffd56b',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        this.skillsGemModalIcon = this.add.text(width / 2, height / 2 - 70, '', {
            fontSize: '28px'
        }).setOrigin(0.5);
        this.skillsGemModalIconImage = this.add.image(width / 2, height / 2 - 70, 'skill_cleave')
            .setOrigin(0.5).setVisible(false);
        this.skillsGemModalIconImage.setDisplaySize(56, 56);
        this.skillsGemModalName = this.add.text(width / 2, height / 2 - 30, '', {
            fontSize: '16px',
            color: '#ffffff',
            fontStyle: 'bold',
            align: 'center',
            wordWrap: { width: 320, useAdvancedWrap: true }
        }).setOrigin(0.5);
        this.skillsGemModalType = this.add.text(width / 2, height / 2 - 4, '', {
            fontSize: '12px',
            color: '#9de9ff'
        }).setOrigin(0.5);
        this.skillsGemModalDesc = this.add.text(width / 2, height / 2 + 55, '', {
            fontSize: '12px',
            color: '#d8d8d8',
            align: 'center',
            wordWrap: { width: 320, useAdvancedWrap: true }
        }).setOrigin(0.5);

        const gemCloseBtn = this.add.text(width / 2 - 90, height / 2 + 130, 'Close', {
            fontSize: '14px',
            color: '#ffffff',
            backgroundColor: '#444444',
            padding: { left: 8, right: 8, top: 4, bottom: 4 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        this.skillsGemModalDiscardBtn = this.add.text(width / 2, height / 2 + 130, 'Discard', {
            fontSize: '14px',
            color: '#ffffff',
            backgroundColor: '#aa3f3f',
            padding: { left: 8, right: 8, top: 4, bottom: 4 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        this.skillsGemModalEquipBtn = this.add.text(width / 2 + 92, height / 2 + 130, 'Equip', {
            fontSize: '14px',
            color: '#111111',
            backgroundColor: '#86ff9e',
            padding: { left: 8, right: 8, top: 4, bottom: 4 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        gemModalOverlay.on('pointerup', () => this.closeSkillGemPopup());
        gemCloseBtn.on('pointerup', () => this.closeSkillGemPopup());
        this.skillsGemModalDiscardBtn.on('pointerup', () => this.discardSelectedGemFromPopup());
        this.skillsGemModalEquipBtn.on('pointerup', () => this.equipSelectedGemFromPopup());

        this.skillsGemModal = this.add.container(0, 0, [
            gemModalOverlay,
            gemModalCard,
            this.skillsGemModalTitle,
            this.skillsGemModalIcon,
            this.skillsGemModalIconImage,
            this.skillsGemModalName,
            this.skillsGemModalType,
            this.skillsGemModalDesc,
            gemCloseBtn,
            this.skillsGemModalDiscardBtn,
            this.skillsGemModalEquipBtn
        ]).setVisible(false);

        this.skillsScreenGroup.add(this.skillsGemModal);

        this.refreshSkillsScreenUI();
    }

    createEquipmentScreen() {
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;

        this.equipmentScreenGroup = this.add.container(0, 0).setVisible(false);

        const topCenterX = Math.floor(width * 0.5);
        const topPanelTopY = 86;
        const slotSize = 56;

        const bg = this.add.rectangle(width / 2, height / 2, width - 40, height - 40, 0x1a1a1a, 1).setStrokeStyle(2, 0xffffff);
        const splitY = 446;
        const divider = this.add.rectangle(width / 2, splitY, width - 52, 2, 0x555555, 1);

        const topPanelBg = this.add.rectangle(width / 2, 260, width - 56, 352, 0x222222, 0.95).setStrokeStyle(1, 0x666666);
        const bottomPanelBg = this.add.rectangle(width / 2, 610, width - 56, 292, 0x232323, 0.95).setStrokeStyle(1, 0x666666);

        const title = this.add.text(width / 2, 50, 'Equipment', { fontSize: '22px', color: '#ffff00', fontStyle: 'bold' }).setOrigin(0.5);
        const tabInfo = this.add.text(10, 14, '', { fontSize: '12px', color: '#ffffff' }).setOrigin(0, 0);
        const switchButton = this.add.text(10, 12, 'Back to Game', { fontSize: '14px', color: '#00ffcc', backgroundColor: '#333333', padding: { left: 5, right: 5, top: 3, bottom: 3 } }).setOrigin(0, 0).setInteractive({ useHandCursor: true });
        switchButton.on('pointerup', () => this.showGameScreen());

        const slotsHeader = this.add.text(topCenterX, 76, 'Loadout', { fontSize: '15px', color: '#00ffcc', fontStyle: 'bold' }).setOrigin(0.5);
        const inventoryHeader = this.add.text(topCenterX, 468, 'Inventory', { fontSize: '15px', color: '#00ffcc', fontStyle: 'bold' }).setOrigin(0.5);

        const inventoryHint = this.add.text(topCenterX, 486, 'Tap item to inspect & equip.', {
            fontSize: '10px',
            color: '#aaaaaa',
            wordWrap: { width: Math.floor(width * 0.72), useAdvancedWrap: true }
        }).setOrigin(0.5, 0);

        // Draw a high-contrast translucent warrior body so slot placement is easy to parse.
        const silhouette = this.add.graphics();
        silhouette.fillStyle(0x88a3b8, 0.28);
        silhouette.lineStyle(3, 0xdde8f3, 0.82);
        silhouette.fillCircle(topCenterX, topPanelTopY + 34, 28); // head
        silhouette.strokeCircle(topCenterX, topPanelTopY + 34, 28);
        silhouette.fillRoundedRect(topCenterX - 30, topPanelTopY + 64, 60, 96, 12); // torso
        silhouette.strokeRoundedRect(topCenterX - 30, topPanelTopY + 64, 60, 96, 12);
        silhouette.fillRoundedRect(topCenterX - 66, topPanelTopY + 84, 24, 72, 10); // left arm
        silhouette.strokeRoundedRect(topCenterX - 66, topPanelTopY + 84, 24, 72, 10);
        silhouette.fillRoundedRect(topCenterX + 42, topPanelTopY + 84, 24, 72, 10); // right arm
        silhouette.strokeRoundedRect(topCenterX + 42, topPanelTopY + 84, 24, 72, 10);
        silhouette.fillRoundedRect(topCenterX - 24, topPanelTopY + 164, 20, 76, 9); // left leg
        silhouette.strokeRoundedRect(topCenterX - 24, topPanelTopY + 164, 20, 76, 9);
        silhouette.fillRoundedRect(topCenterX + 4, topPanelTopY + 164, 20, 76, 9); // right leg
        silhouette.strokeRoundedRect(topCenterX + 4, topPanelTopY + 164, 20, 76, 9);
        silhouette.fillStyle(0xffffff, 0.14);
        silhouette.fillEllipse(topCenterX, topPanelTopY + 136, 48, 26);
        const warriorGlyph = this.add.text(topCenterX, topPanelTopY + 116, '⚔', { fontSize: '54px', color: '#eaf4ff' }).setOrigin(0.5).setAlpha(0.32);

        this.equipmentScreenGroup.add([
            bg,
            divider,
            topPanelBg,
            bottomPanelBg,
            title,
            tabInfo,
            switchButton,
            slotsHeader,
            inventoryHeader,
            inventoryHint,
            silhouette,
            warriorGlyph
        ]);

        const statsHeaderText = this.add.text(topCenterX, 354, 'Character Stats', {
            fontSize: '11px',
            color: '#00ffcc',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        const statCardConfig = [
            { key: 'strength', short: 'STR', icon: '⚔', x: topCenterX - 108, color: 0xff8a5b, accent: '#ffb08b' },
            { key: 'intelligence', short: 'INT', icon: '✦', x: topCenterX, color: 0x4c8dff, accent: '#8bb7ff' },
            { key: 'dexterity', short: 'DEX', icon: '➶', x: topCenterX + 108, color: 0x49c46b, accent: '#8ae2a0' }
        ];

        this.characterStatTiles = {};
        statCardConfig.forEach(card => {
            const cardBg = this.add.rectangle(card.x, 394, 96, 78, 0x151515, 0.98)
                .setStrokeStyle(2, card.color, 1);
            cardBg.setInteractive({ useHandCursor: true });
            const cardIcon = this.add.text(card.x, 368, card.icon, {
                fontSize: '18px',
                color: card.accent
            }).setOrigin(0.5);
            const cardTitle = this.add.text(card.x, 383, card.short, {
                fontSize: '10px',
                color: card.accent,
                fontStyle: 'bold'
            }).setOrigin(0.5);
            const cardValue = this.add.text(card.x, 400, '', {
                fontSize: '18px',
                color: '#ffffff',
                fontStyle: 'bold'
            }).setOrigin(0.5);
            const cardBonus = this.add.text(card.x, 422, '', {
                fontSize: '8px',
                color: '#cfd6dd',
                align: 'center',
                wordWrap: { width: 82, useAdvancedWrap: true }
            }).setOrigin(0.5);

            this.characterStatTiles[card.key] = {
                cardBg,
                icon: cardIcon,
                valueText: cardValue,
                bonusText: cardBonus,
                delay: card.key === 'strength' ? 0 : (card.key === 'intelligence' ? 110 : 220)
            };

            cardBg.on('pointerup', () => {
                this.pulseUiTargets([cardBg, cardIcon, cardValue], 1.06, 110);
            });

            this.equipmentScreenGroup.add([
                cardBg,
                cardIcon,
                cardTitle,
                cardValue,
                cardBonus
            ]);
        });

        this.charStatsFooter = this.add.text(topCenterX, 436, '', {
            fontSize: '9px',
            color: '#9aa7b5',
            align: 'center'
        }).setOrigin(0.5);
        this.equipmentScreenGroup.add([statsHeaderText, this.charStatsFooter]);

        const slotConfig = [
            { key: 'helmet', label: 'Helmet', x: topCenterX, y: topPanelTopY + 28 },
            { key: 'necklace', label: 'Necklace', x: topCenterX - 84, y: topPanelTopY + 80 },
            { key: 'mainhand', label: 'Main Hand', x: topCenterX - 108, y: topPanelTopY + 134 },
            { key: 'chest', label: 'Chest', x: topCenterX, y: topPanelTopY + 104 },
            { key: 'offhand', label: 'Off Hand', x: topCenterX + 108, y: topPanelTopY + 134 },
            { key: 'gloves', label: 'Gloves', x: topCenterX - 108, y: topPanelTopY + 196 },
            { key: 'belt', label: 'Belt', x: topCenterX, y: topPanelTopY + 160 },
            { key: 'ring1', label: 'Ring 1', x: topCenterX + 84, y: topPanelTopY + 196 },
            { key: 'ring2', label: 'Ring 2', x: topCenterX + 134, y: topPanelTopY + 196 },
            { key: 'boots', label: 'Boots', x: topCenterX, y: topPanelTopY + 236 }
        ];

        this.equipmentText = {};
        this.equipmentIconText = {};
        this.equipmentSlotFrames = {};
        this.equipmentSlotGhostIcons = {};
        this.equipmentSlotShells = {};
        this.equipmentSlotGlows = {};

        slotConfig.forEach(slot => {
            const slotGlow = this.add.rectangle(slot.x, slot.y, slotSize + 10, slotSize + 10, 0xffffff, 0)
                .setStrokeStyle(3, 0xffffff, 0)
                .setOrigin(0.5);

            // Square slot for equipment
            const slotBg = this.add.rectangle(slot.x, slot.y, slotSize, slotSize, 0x26303a, 0.9)
                .setStrokeStyle(2, 0x6d7d8a, 1)
                .setOrigin(0.5)
                .setInteractive({ useHandCursor: true });

            // Inner tile area for item image/icon
            const slotImageBg = this.add.rectangle(slot.x, slot.y, slotSize * 0.7, slotSize * 0.7, 0x0e1318, 0.8)
                .setStrokeStyle(1, 0x8ea2b3, 0.9)
                .setOrigin(0.5)
                .setInteractive({ useHandCursor: true });
            const slotGhostIcon = this.add.text(slot.x, slot.y - 4, this.getEmptySlotIcon(slot.key), {
                fontSize: '19px',
                color: '#778593'
            }).setOrigin(0.5).setAlpha(0.52);
            const slotIcon = this.add.text(slot.x, slot.y - 2, '', { fontSize: '24px', color: '#ffffff' }).setOrigin(0.5);

            const inspectEquippedItem = () => {
                const equippedItem = this.equippedItems[slot.key];
                if (equippedItem) {
                    this.openInventoryItemPopup(equippedItem, 'equipped', slot.key);
                }
            };
            const pulseSlot = () => {
                this.pulseUiTargets([slotBg, slotImageBg, slotIcon, slotGhostIcon], 1.08, 95);
            };
            slotBg.on('pointerdown', pulseSlot);
            slotImageBg.on('pointerdown', pulseSlot);
            slotBg.on('pointerup', inspectEquippedItem);
            slotImageBg.on('pointerup', inspectEquippedItem);

            this.equipmentText[slot.key] = null;
            this.equipmentIconText[slot.key] = slotIcon;
            this.equipmentSlotFrames[slot.key] = slotImageBg;
            this.equipmentSlotGhostIcons[slot.key] = slotGhostIcon;
            this.equipmentSlotShells[slot.key] = slotBg;
            this.equipmentSlotGlows[slot.key] = slotGlow;

            this.equipmentScreenGroup.add([slotGlow, slotBg, slotImageBg, slotGhostIcon, slotIcon]);
        });

        this.inventoryTiles = [];
        const inventoryColumns = 4;
        const inventoryCellSize = 64;
        const inventoryCellGap = 8;
        const inventoryGridTop = 514;
        const inventoryGridLeft = (width - (inventoryColumns * inventoryCellSize + (inventoryColumns - 1) * inventoryCellGap)) / 2;

        for (let index = 0; index < 12; index++) {
            const column = index % inventoryColumns;
            const row = Math.floor(index / inventoryColumns);
            const cellX = inventoryGridLeft + column * (inventoryCellSize + inventoryCellGap);
            const cellY = inventoryGridTop + row * (inventoryCellSize + inventoryCellGap);

            const tileBg = this.add.rectangle(cellX, cellY, inventoryCellSize, inventoryCellSize, 0x2d2d2d, 1)
                .setOrigin(0, 0)
                .setStrokeStyle(2, 0x666666)
                .setInteractive({ useHandCursor: true });
            const tileInner = this.add.rectangle(cellX + 5, cellY + 5, inventoryCellSize - 10, inventoryCellSize - 10, 0x111111, 1)
                .setOrigin(0, 0)
                .setStrokeStyle(1, 0x444444);
            const tileIcon = this.add.text(cellX + inventoryCellSize / 2, cellY + 20, '', { fontSize: '22px' }).setOrigin(0.5);
            const tileName = this.add.text(cellX + inventoryCellSize / 2, cellY + 48, '', {
                fontSize: '9px',
                fontFamily: 'Verdana, Georgia, sans-serif',
                color: '#ffffff',
                align: 'center',
                wordWrap: { width: inventoryCellSize - 6, useAdvancedWrap: true }
            }).setOrigin(0.5);

            tileBg.on('pointerup', () => {
                const item = this.inventory[index];
                if (item) this.openInventoryItemPopup(item);
            });

            this.inventoryTiles.push({ tileBg, tileInner, tileIcon, tileName, index });
            this.equipmentScreenGroup.add([tileBg, tileInner, tileIcon, tileName]);
        }

        const modalOverlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.78)
            .setInteractive({ useHandCursor: true });
        const modalCard = this.add.rectangle(width / 2, height / 2, 370, 410, 0x111111, 1)
            .setStrokeStyle(2, 0x555555);

        this.inventoryModalTitle = this.add.text(width / 2, height / 2 - 198, '', {
            fontSize: '18px',
            fontFamily: 'Georgia, Verdana, sans-serif',
            color: '#ffdd44',
            fontStyle: 'bold'
        }).setOrigin(0.5, 0);
        this.inventoryModalFrame = this.add.rectangle(width / 2, height / 2 - 162, 46, 46, 0x1f1f1f, 1).setStrokeStyle(2, 0x888888);
        this.inventoryModalIcon = this.add.text(width / 2, height / 2 - 162, '', { fontSize: '24px' }).setOrigin(0.5);
        this.inventoryModalName = this.add.text(width / 2, height / 2 - 130, '', {
            fontSize: '16px',
            fontFamily: 'Georgia, Verdana, sans-serif',
            color: '#ffffff',
            fontStyle: 'bold',
            wordWrap: { width: 340, useAdvancedWrap: true },
            align: 'center'
        }).setOrigin(0.5);
        this.inventoryModalSlotBadge = this.add.text(width / 2, height / 2 - 110, '', {
            fontSize: '12px',
            fontFamily: 'Verdana, Georgia, sans-serif',
            color: '#111111',
            backgroundColor: '#8bb7ff',
            padding: { left: 7, right: 7, top: 3, bottom: 3 }
        }).setOrigin(0.5);
        this.inventoryModalType = this.add.text(width / 2, height / 2 - 92, '', {
            fontSize: '12px',
            fontFamily: 'Verdana, Georgia, sans-serif',
            color: '#00ffcc',
            align: 'center',
            wordWrap: { width: 340, useAdvancedWrap: true }
        }).setOrigin(0.5);

        const modalStatsDivider = this.add.rectangle(width / 2, height / 2 - 78, 340, 1, 0x444444, 1);

        // 8 pre-allocated per-stat comparison lines
        this.inventoryAffixLines = [];
        for (let li = 0; li < 8; li++) {
            const lineObj = this.add.text(width / 2, height / 2 - 68 + li * 20, '', {
                fontSize: '13px',
                fontFamily: 'Verdana, Georgia, sans-serif',
                color: '#ffd966',
                align: 'center',
                wordWrap: { width: 340, useAdvancedWrap: true }
            }).setOrigin(0.5).setVisible(false);
            this.inventoryAffixLines.push(lineObj);
        }

        this.inventoryAffixCompareLabel = this.add.text(width / 2, height / 2 + 92, '', {
            fontSize: '11px',
            fontFamily: 'Verdana, Georgia, sans-serif',
            color: '#888888',
            align: 'center',
            wordWrap: { width: 340, useAdvancedWrap: true }
        }).setOrigin(0.5);

        const closeModalBtn = this.add.text(width / 2 - 120, height / 2 + 164, 'Close', {
            fontSize: '14px',
            fontFamily: 'Verdana, Georgia, sans-serif',
            color: '#ffffff',
            backgroundColor: '#444444',
            padding: { left: 8, right: 8, top: 4, bottom: 4 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        const removeBtn = this.add.text(width / 2 - 40, height / 2 + 164, 'Unequip', {
            fontSize: '14px',
            fontFamily: 'Verdana, Georgia, sans-serif',
            color: '#ffffff',
            backgroundColor: '#a33d3d',
            padding: { left: 8, right: 8, top: 4, bottom: 4 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        const equipBtn = this.add.text(width / 2 + 40, height / 2 + 164, 'Equip', {
            fontSize: '14px',
            fontFamily: 'Verdana, Georgia, sans-serif',
            color: '#111111',
            backgroundColor: '#00ff99',
            padding: { left: 8, right: 8, top: 4, bottom: 4 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        const sellBtn = this.add.text(width / 2 + 120, height / 2 + 164, 'Sell', {
            fontSize: '14px',
            fontFamily: 'Verdana, Georgia, sans-serif',
            color: '#ffd966',
            backgroundColor: '#4a3d1a',
            padding: { left: 8, right: 8, top: 4, bottom: 4 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        modalOverlay.on('pointerup', () => this.closeInventoryItemPopup());
        closeModalBtn.on('pointerup', () => this.closeInventoryItemPopup());
        equipBtn.on('pointerup', () => this.equipSelectedInventoryItem());
        removeBtn.on('pointerup', () => this.removeSelectedEquippedItem());
        sellBtn.on('pointerup', () => this.sellSelectedItem());

        this.inventoryModalEquipBtn = equipBtn;
        this.inventoryModalRemoveBtn = removeBtn;
        this.inventoryModalSellBtn = sellBtn;

        this.inventoryModal = this.add.container(0, 0, [
            modalOverlay,
            modalCard,
            this.inventoryModalTitle,
            this.inventoryModalFrame,
            this.inventoryModalIcon,
            this.inventoryModalName,
            this.inventoryModalSlotBadge,
            this.inventoryModalType,
            modalStatsDivider,
            ...this.inventoryAffixLines,
            this.inventoryAffixCompareLabel,
            closeModalBtn,
            removeBtn,
            equipBtn,
            sellBtn
        ]).setVisible(false);

        this.equipmentScreenGroup.add(this.inventoryModal);

        this.updateInventoryGridUI();

        const backBtn = this.add.text(width / 2, height - 28, 'Back to Game', { fontSize: '16px', color: '#00ff00', backgroundColor: '#333333', padding: { left: 10, right: 10, top: 5, bottom: 5 } }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        backBtn.on('pointerup', () => this.showGameScreen());
        this.equipmentScreenGroup.add(backBtn);
    }

    showEquipmentScreen() {
        this.currentScreen = 'equipment';
        this.armedEquipGem = null;
        this.closeSkillGemPopup();
        if (this.equipmentScreenGroup) this.equipmentScreenGroup.setVisible(true);
        if (this.rewardScreenGroup) this.rewardScreenGroup.setVisible(false);
        if (this.skillsScreenGroup) this.skillsScreenGroup.setVisible(false);
        if (this.talentScreenGroup) this.talentScreenGroup.setVisible(false);
        if (this.storeScreenGroup) this.storeScreenGroup.setVisible(false);
        this.boardContainer.setVisible(false);
        this.hudContainer.setVisible(false);
        if (this.skillBarContainer) this.skillBarContainer.setVisible(false);
        if (this.skillInfoPopup) this.skillInfoPopup.setVisible(false);
        this.setGameBoardActive(false);
        this.updateEquipmentScreen();
        this.refreshEquipmentScreenAnimations();
    }

    showSkillsScreen() {
        this.currentScreen = 'skills';
        this.closeInventoryItemPopup();
        if (this.skillsScreenGroup) this.skillsScreenGroup.setVisible(true);
        if (this.equipmentScreenGroup) this.equipmentScreenGroup.setVisible(false);
        if (this.rewardScreenGroup) this.rewardScreenGroup.setVisible(false);
        if (this.talentScreenGroup) this.talentScreenGroup.setVisible(false);
        if (this.storeScreenGroup) this.storeScreenGroup.setVisible(false);
        this.boardContainer.setVisible(false);
        this.hudContainer.setVisible(false);
        if (this.skillBarContainer) this.skillBarContainer.setVisible(false);
        if (this.skillInfoPopup) this.skillInfoPopup.setVisible(false);
        this.setGameBoardActive(false);
        this.refreshSkillsScreenUI();
    }

    showGameScreen() {
        this.currentScreen = 'game';
        this.armedEquipGem = null;
        this.closeSkillGemPopup();
        if (this.equipmentScreenGroup) this.equipmentScreenGroup.setVisible(false);
        if (this.skillsScreenGroup) this.skillsScreenGroup.setVisible(false);
        if (this.rewardScreenGroup) this.rewardScreenGroup.setVisible(false);
        if (this.talentScreenGroup) this.talentScreenGroup.setVisible(false);
        if (this.storeScreenGroup) this.storeScreenGroup.setVisible(false);
        this.closeInventoryItemPopup();
        this.boardContainer.setVisible(true);
        this.hudContainer.setVisible(true);
        if (this.skillBarContainer) this.skillBarContainer.setVisible(true);
        if (this.skillChargeFxContainer) this.skillChargeFxContainer.setVisible(true);
        this.setGameBoardActive(true);
    }

    updateEquipmentScreen() {
        if (!this.equipmentText || !this.equipmentIconText) return;

        Object.entries(this.player.equipment).forEach(([key, value]) => {
            const equippedItem = this.equippedItems[key] || null;
            const offhandBlockedByBow = key === 'offhand' && this.isTwoHandedItem(this.equippedItems.mainhand || null);
            if (this.equipmentText[key]) {
                const slotText = this.getEquipmentSlotText(key, equippedItem, offhandBlockedByBow);
                this.equipmentText[key].setText(slotText);
                this.equipmentText[key].setColor(
                    offhandBlockedByBow
                        ? '#d7e26f'
                        : (equippedItem ? (equippedItem.rarityTextColor || '#ffffff') : '#94a1ab')
                );
            }
            if (this.equipmentIconText[key]) {
                this.equipmentIconText[key].setText(offhandBlockedByBow ? '🏹' : (equippedItem ? equippedItem.icon : ''));
            }
            if (this.equipmentSlotFrames[key]) {
                this.equipmentSlotFrames[key].setStrokeStyle(
                    2,
                    offhandBlockedByBow ? 0xd0e060 : (equippedItem ? equippedItem.frameColor : 0x8ea2b3),
                    offhandBlockedByBow ? 1 : (equippedItem ? 1 : 0.8)
                );
            }
            if (this.equipmentSlotGhostIcons[key]) {
                this.equipmentSlotGhostIcons[key].setVisible(!equippedItem && !offhandBlockedByBow);
            }
            if (this.equipmentSlotShells[key]) {
                this.equipmentSlotShells[key]
                    .setFillStyle(
                        offhandBlockedByBow ? 0x334022 : (equippedItem ? 0x2d3640 : 0x26303a),
                        offhandBlockedByBow ? 0.95 : (equippedItem ? 0.98 : 0.9)
                    )
                    .setStrokeStyle(
                        2,
                        offhandBlockedByBow ? 0xd0e060 : (equippedItem ? equippedItem.frameColor : 0x6d7d8a),
                        offhandBlockedByBow ? 1 : (equippedItem ? 1 : 0.95)
                    );
            }
            if (this.equipmentSlotGlows[key]) {
                this.equipmentSlotGlows[key].setStrokeStyle(
                    3,
                    offhandBlockedByBow ? 0xd0e060 : (equippedItem ? equippedItem.frameColor : 0xffffff),
                    offhandBlockedByBow ? 0.35 : (equippedItem ? 0.45 : 0)
                );
            }
        });

        // Update character stats display
        if (this.characterStatTiles && this.charStatsFooter) {
            const p = this.player;
            const b = this.getCharacterStatBonuses();
            this.characterStatTiles.strength.valueText.setText(String(p.strength));
            this.characterStatTiles.strength.bonusText.setText(`+${b.physicalDamageBonus} DMG\n+${b.armorBonus} ARMOR`);

            this.characterStatTiles.intelligence.valueText.setText(String(p.intelligence));
            this.characterStatTiles.intelligence.bonusText.setText(`+${b.magicDamageBonus} MAGIC\n${b.energyShield} SHIELD`);

            this.characterStatTiles.dexterity.valueText.setText(String(p.dexterity));
            this.characterStatTiles.dexterity.bonusText.setText(`+${b.rangedDamageBonus} RANGED\n${b.critChance.toFixed(0)}% CRIT  ${b.evasionChance.toFixed(0)}% EVA`);

            this.charStatsFooter.setText('Strength powers steel. Intelligence powers wards. Dexterity powers precision.');
        }

        this.refreshEquipmentScreenAnimations();
        this.updateInventoryGridUI();
    }

    updateInventoryGridUI() {
        if (!this.inventoryTiles) return;

        this.inventoryTiles.forEach(({ tileBg, tileInner, tileIcon, tileName, index }) => {
            const item = this.inventory[index];
            if (!item) {
                tileBg.setVisible(false);
                tileInner.setVisible(false);
                tileIcon.setVisible(false);
                tileName.setVisible(false);
                return;
            }

            tileBg.setVisible(true);
            tileInner.setVisible(true);
            tileIcon.setVisible(true);
            tileName.setVisible(true);

            tileBg.fillColor = 0x2d2d2d;
            tileBg.setStrokeStyle(2, item.frameColor, 1);
            tileInner.setStrokeStyle(1, item.frameColor, 0.8);
            tileIcon.setText(item.icon);
            tileName.setText(item.name);
            tileName.setColor(item.rarityTextColor || '#ffffff');
        });
    }

    openInventoryItemPopup(item, source = 'inventory', equippedSlot = null) {
        if (!this.inventoryModal) return;
        this.selectedInventoryItem = item;
        this.selectedItemSource = source;
        this.selectedEquippedSlot = equippedSlot;

        // Determine comparison item:
        //   'equipped' view → compare vs empty (all green)
        //   'inventory' view   → compare vs whatever is currently in the target slot
        let compareItem = null;
        if (source === 'inventory') {
            const targetSlot = this.getEquipTargetSlot(item);
            if (targetSlot) {
                compareItem = this.equippedItems[targetSlot] || null;
            }
        }

        const itemStats = item.stats || {};
        const compareStats = (compareItem && compareItem.stats) || {};
        const allStatKeys = Array.from(new Set([
            ...Object.keys(itemStats),
            ...Object.keys(compareStats)
        ]));

        // Build one line per unique stat type with colored ↑/↓ arrows
        const statLines = allStatKeys.map(stat => {
            const newVal = itemStats[stat] || 0;
            const oldVal = compareStats[stat] || 0;
            const delta = newVal - oldVal;
            const label = this.getStatLabel(stat);

            if (!compareItem) {
                return { text: `${label}:  +${newVal}  ↑`, color: '#4eff8a' };
            } else if (delta > 0) {
                return { text: `${label}:  +${newVal}  ↑  (+${delta})`, color: '#4eff8a' };
            } else if (delta < 0) {
                return { text: `${label}:  +${newVal}  ↓  (${delta})`, color: '#ff6b6b' };
            } else {
                return { text: `${label}:  +${newVal}  =`, color: '#ffd966' };
            }
        });

        // Populate pre-allocated line objects
        if (this.inventoryAffixLines) {
            this.inventoryAffixLines.forEach((lineObj, i) => {
                if (i < statLines.length) {
                    lineObj.setText(statLines[i].text);
                    lineObj.setColor(statLines[i].color);
                    lineObj.setVisible(true);
                } else {
                    lineObj.setText('');
                    lineObj.setVisible(false);
                }
            });
        }

        // Footer: what we're comparing against
        if (this.inventoryAffixCompareLabel) {
            if (source === 'equipped') {
                this.inventoryAffixCompareLabel.setText('Currently equipped  —  tap Unequip to remove');
            } else if (compareItem) {
                this.inventoryAffixCompareLabel.setText(`Replacing: ${compareItem.name}`);
            } else {
                this.inventoryAffixCompareLabel.setText('Filling an empty slot');
            }
        }

        if (this.inventoryModalTitle) {
            this.inventoryModalTitle.setText('');
        }
        this.inventoryModalFrame.setStrokeStyle(2, item.frameColor, 1);
        this.inventoryModalIcon.setText(item.icon);
        this.inventoryModalName.setText(item.name);
        this.inventoryModalName.setColor(item.rarityTextColor || '#ffffff');
        if (this.inventoryModalSlotBadge) {
            this.inventoryModalSlotBadge.setText(`${this.getEmptySlotIcon(item.slotGroup === 'ring' ? 'ring1' : item.slotGroup)}  ${this.getSlotLabel(item.slotGroup)}`);
            this.inventoryModalSlotBadge.setBackgroundColor(item.rarityTextColor || '#8bb7ff');
            this.inventoryModalSlotBadge.setColor('#111111');
        }
        const handlingLabel = item.twoHanded ? '  |  Two-Handed' : '';
        this.inventoryModalType.setText(`iLvl ${item.itemLevel || 1} ${item.rarity}  |  ${this.getSlotLabel(item.slotGroup)}${handlingLabel}`);
        if (this.inventoryModalEquipBtn) {
            this.inventoryModalEquipBtn.setVisible(source === 'inventory');
        }
        if (this.inventoryModalRemoveBtn) {
            this.inventoryModalRemoveBtn.setVisible(source === 'equipped');
        }
        if (this.inventoryModalSellBtn) {
            const sellPrice = Math.max(1, Math.floor(this.getItemPrice(item) / 2));
            this.inventoryModalSellBtn.setText(`Sell 🪙${sellPrice}`);
            this.inventoryModalSellBtn.setVisible(true);
        }
        this.inventoryModal.setVisible(true);
    }

    closeInventoryItemPopup() {
        this.selectedInventoryItem = null;
        this.selectedItemSource = null;
        this.selectedEquippedSlot = null;
        if (this.inventoryModal) {
            this.inventoryModal.setVisible(false);
        }
    }

    sellSelectedItem() {
        if (!this.selectedInventoryItem) return;
        const item = this.selectedInventoryItem;
        const source = this.selectedItemSource;
        const sellPrice = Math.max(1, Math.floor(this.getItemPrice(item) / 2));

        if (source === 'inventory') {
            const idx = this.inventory.indexOf(item);
            if (idx === -1) return;
            this.inventory.splice(idx, 1);
        } else if (source === 'equipped') {
            const slot = this.selectedEquippedSlot;
            if (!slot) return;
            this.equippedItems[slot] = null;
            this.player.equipment[slot] = 0;
        }

        this.player.gold += sellPrice;
        this.addCombatLog(`Sold ${item.rarity} ${item.name} for ${sellPrice} gold!`, '#ffd966');
        this.updateGoldDisplay();
        this.updateInventoryGridUI();
        this.updateEquipmentScreen();
        this.closeInventoryItemPopup();
    }

    equipSelectedInventoryItem() {
        if (!this.selectedInventoryItem || this.selectedItemSource !== 'inventory') return;

        const item = this.selectedInventoryItem;
        const targetSlot = this.resolveEquipSlot(item.slotGroup);
        if (!targetSlot || !this.canEquipItemInSlot(item, targetSlot)) {
            this.addCombatLog(`Cannot equip ${item.name}: invalid slot`, '#ff8888');
            this.closeInventoryItemPopup();
            return;
        }
        const displacedItems = this.getDisplacedItemsForEquip(item, targetSlot);
        if (!this.canStoreDisplacedItems(displacedItems, 1)) {
            this.addCombatLog('Not enough inventory space to swap gear.', '#ff8888');
            this.closeInventoryItemPopup();
            return;
        }

        const inventoryIndex = this.inventory.findIndex(inventoryItem => inventoryItem.id === item.id);

        if (inventoryIndex === -1) {
            this.closeInventoryItemPopup();
            return;
        }

        this.inventory.splice(inventoryIndex, 1);
        for (let i = 0; i < displacedItems.length; i++) {
            const displaced = displacedItems[i];
            if (displaced && displaced.item) {
                this.inventory.push(displaced.item);
                this.clearEquippedSlot(displaced.slotKey);
            }
        }

        this.applyEquippedItemToSlot(item, targetSlot);
        this.updateEquipmentScreen();
        this.addCombatLog(`Equipped ${item.name} in ${targetSlot}${this.isTwoHandedItem(item) ? ' (2H)' : ''}`, '#99ff99');
        this.closeInventoryItemPopup();
    }

    removeSelectedEquippedItem() {
        if (!this.selectedInventoryItem || this.selectedItemSource !== 'equipped' || !this.selectedEquippedSlot) return;

        if (this.inventory.length >= this.maxInventorySlots) {
            this.addCombatLog('Inventory full. Cannot remove equipped item.', '#ff8888');
            return;
        }

        const slotKey = this.selectedEquippedSlot;
        const equippedItem = this.equippedItems[slotKey];
        if (!equippedItem) {
            this.closeInventoryItemPopup();
            return;
        }

        this.inventory.push(equippedItem);
        this.clearEquippedSlot(slotKey);

        if (slotKey === 'mainhand' && this.player.equipment.offhand === 'Occupied by Bow') {
            this.player.equipment.offhand = 'None';
        }

        this.updateEquipmentScreen();
        this.addCombatLog(`Removed ${equippedItem.name} from ${slotKey}`, '#ffcc88');
        this.closeInventoryItemPopup();
    }

    setGameBoardActive(active) {
        if (!this.tileSprites) return;
        for (let y = 0; y < this.tileSprites.length; y++) {
            for (let x = 0; x < this.tileSprites[y].length; x++) {
                const tile = this.tileSprites[y][x];
                if (!tile || !tile.rect) continue;

                if (!tile.rect.input) {
                    if (active) {
                        tile.rect.setInteractive({ draggable: true });
                    }
                } else {
                    tile.rect.input.enabled = active;
                }
            }
        }
    }

    updatePlayerUI() {
        const gear = this.getEquippedStatTotals();
        const charBonuses = this.getCharacterStatBonuses();

        if (this.playerHealthBar) {
            const fraction = Phaser.Math.Clamp(this.player.health / this.getMaxHealth(), 0, 1);
            const targetWidth = 166 * fraction;
            const targetColor = (fraction > 0.5 ? 0x00cc00 : (fraction > 0.25 ? 0xffcc00 : 0xff0000));
            this.tweens.killTweensOf(this.playerHealthBar);
            this.tweens.add({
                targets: this.playerHealthBar,
                width: targetWidth,
                duration: 300,
                ease: 'Power2'
            });
            this.playerHealthBar.fillColor = targetColor;
        }
        if (this.playerHealthText) {
            this.playerHealthText.setText(`${Math.ceil(this.player.health)} / ${this.getMaxHealth()}`);
        }

        // Update energy shield bar
        if (this.playerShieldBar) {
            const maxES = this.getMaxEnergyShield();
            const currentES = this.player.currentShield;
            const hasShield = maxES > 0;
            this.playerShieldBarBg.setVisible(hasShield);
            this.playerShieldBar.setVisible(hasShield);
            this.playerShieldLabel.setVisible(hasShield);
            this.playerShieldText.setVisible(hasShield);
            if (hasShield) {
                const fraction = Phaser.Math.Clamp(currentES / maxES, 0, 1);
                const shieldWidth = 166 * fraction;
                this.tweens.killTweensOf(this.playerShieldBar);
                this.tweens.add({
                    targets: this.playerShieldBar,
                    width: shieldWidth,
                    duration: 300,
                    ease: 'Power2'
                });
                this.playerShieldText.setText(`${currentES} / ${maxES}`);
            }
        }

        this.updateGoldDisplay();
    }

    updateGoldDisplay() {
        if (this.goldDisplayText) {
            this.goldDisplayText.setText(`${this.player.gold}`);
        }
    }

    updateEnemyUI() {
        this.enemies.forEach(enemy => {
            if (!enemy.healthBar) return;
            if (!enemy.alive) {
                enemy.healthBar.width = 0;
                return;
            }
            const fraction = Phaser.Math.Clamp(enemy.health / enemy.maxHealth, 0, 1);
            const maxBarW = enemy.pos.barW;
            const targetWidth = maxBarW * fraction;
            const targetColor = (fraction > 0.5 ? 0xff5555 : (fraction > 0.25 ? 0xffcc00 : 0xff0000));
            this.tweens.killTweensOf(enemy.healthBar);
            this.tweens.add({
                targets: enemy.healthBar,
                width: targetWidth,
                duration: 300,
                ease: 'Power2'
            });
            enemy.healthBar.fillColor = targetColor;
            if (enemy.healthText) {
                enemy.healthText.setText(`${Math.ceil(enemy.health)} / ${enemy.maxHealth}`);
            }
        });
    }

    showCombatMessage(text, color, x, y) {
        const combatText = this.add.text(x, y, text, { fontSize: '20px', color, fontStyle: 'bold', stroke: '#000000', strokeThickness: 2 }).setOrigin(0.5);
        this.tweens.add({
            targets: combatText,
            y: y - 40,
            alpha: 0,
            duration: 1000,
            ease: 'Cubic.easeOut',
            onComplete: () => combatText.destroy()
        });
    }

    handleEnemyDeath(enemy) {
        if (!enemy) return;
        enemy.alive = false;

        // Stop this enemy's idle tweens
        enemy.idleTweens.forEach(t => t.remove());
        enemy.idleTweens.length = 0;

        if (enemy.enemySprite) {
            // Sprite-based enemy: play death animation then fade out
            const spriteKey = MONSTER_BODIES[enemy.bodyIndex].spriteKey;
            enemy.enemySprite.play(spriteKey + '_death');
            enemy.enemySprite.once('animationcomplete', () => {
                this.tweens.add({
                    targets: enemy.enemySprite,
                    alpha: 0,
                    duration: 400,
                    ease: 'Power2'
                });
            });
        } else if (enemy.bodyContainer) {
            this.tweens.add({
                targets: enemy.bodyContainer,
                y: enemy.bodyContainer.y + 20,
                angle: 90,
                alpha: 0,
                duration: 600,
                ease: 'Power2',
            });
        }

        // Update target markers
        this.updateEnemyTargetMarkers();

        // Update encounter label with remaining count
        const aliveCount = this.getAliveEnemies().length;
        if (this.enemyEncounterLabel && this.encounterSize > 1 && aliveCount > 0) {
            this.enemyEncounterLabel.setText(`Lv.${this.battleNumber} - ${aliveCount} remaining`);
        }
        this.addCombatLog(`${enemy.name} defeated!`, '#66ff66');
    }

    showVictoryPopup() {
        const popup = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'Victory!', {
            fontSize: '52px',
            color: '#00ff00',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 5
        }).setOrigin(0.5);

        this.tweens.add({
            targets: popup,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 300,
            ease: 'Back.easeOut'
        });

        this.time.delayedCall(3000, () => {
            this.tweens.add({
                targets: popup,
                alpha: 0,
                duration: 900,
                ease: 'Power2',
                onComplete: () => popup.destroy()
            });
        });
    }

    createGrid() {
        console.log('Creating grid...');
        for (let y = 0; y < GRID_HEIGHT; y++) {
            this.grid[y] = [];
            for (let x = 0; x < GRID_WIDTH; x++) {
                let type;
                do {
                    type = this.getRandomTileType();
                } while (!this.isValidPlacement(x, y, type));
                this.grid[y][x] = type;
            }
        }
        console.log('Grid created:', this.grid);
    }

    renderGrid() {
        console.log('Rendering grid...');
        
        // Clear existing sprites and board container children
        if (this.boardContainer) {
            this.boardContainer.removeAll(true);
        }
        this.tileSprites.forEach(row => {
            row.forEach(sprite => {
                if (sprite && sprite.rect) sprite.rect.destroy();
                if (sprite && sprite.icon) sprite.icon.destroy();
            });
        });
        this.tileSprites = [];

        // Create new sprites
        for (let y = 0; y < GRID_HEIGHT; y++) {
            this.tileSprites[y] = [];
            for (let x = 0; x < GRID_WIDTH; x++) {
                const type = this.grid[y][x];
                const posX = GRID_OFFSET_X + x * TILE_SIZE + TILE_SIZE / 2;
                const posY = GRID_OFFSET_Y + y * TILE_SIZE + TILE_SIZE / 2;

                if (type === -1) {
                    this.tileSprites[y][x] = { x, y, type };
                    continue;
                }

                const tileInfo = TILE_TYPES[type];
                if (!tileInfo) {
                    this.tileSprites[y][x] = { x, y, type };
                    continue;
                }

                // Background rectangle
                const rect = this.add.rectangle(posX, posY, TILE_SIZE - 4, TILE_SIZE - 4, tileInfo.color);
                rect.setStrokeStyle(2, 0xffffff);
                rect.setInteractive({ draggable: true });
                rect.on('dragstart', () => this.handleDragStart(x, y));
                rect.on('drag', (pointer) => this.handleDrag(pointer, x, y));
                rect.on('dragend', (pointer) => this.handleDragEnd(pointer, x, y));

                // Tile image icon (falls back to emoji text if image not loaded)
                let icon;
                if (this.textures.exists('tile_' + tileInfo.name)) {
                    icon = this.add.image(posX, posY, 'tile_' + tileInfo.name)
                        .setDisplaySize(TILE_SIZE - 4, TILE_SIZE - 4)
                        .setOrigin(0.5);
                } else {
                    icon = this.add.text(posX, posY, tileInfo.icon, {
                        fontSize: '32px',
                        color: '#000000',
                        stroke: '#ffffff',
                        strokeThickness: 4
                    }).setOrigin(0.5);
                }

                this.tileSprites[y][x] = { rect, icon, x, y, type };
                this.boardContainer.add(rect);
                this.boardContainer.add(icon);
            }
        }
        console.log('Grid rendered!');
    }

    handleDragStart(x, y) {
        if (this.isSwapping || this.isShowingEquipment) return;
        console.log(`Drag start: ${x}, ${y}`);
        this.dragStart = { x, y };
        // Bring tile to front while dragging
        const tile = this.tileSprites[y][x];
        if (tile && tile.rect) {
            tile.rect.setDepth(1000);
            if (this.boardContainer) this.boardContainer.bringToTop(tile.rect);
            if (this.children) this.children.bringToTop(tile.rect);
        }
        if (tile && tile.icon) {
            tile.icon.setDepth(1000);
            if (this.boardContainer) this.boardContainer.bringToTop(tile.icon);
            if (this.children) this.children.bringToTop(tile.icon);
        }
    }

    handleDrag(pointer, x, y) {
        const tile = this.tileSprites[y][x];
        if (tile && tile.rect && tile.icon) {
            tile.rect.x = pointer.x;
            tile.rect.y = pointer.y;
            tile.icon.x = pointer.x;
            tile.icon.y = pointer.y;
        }
    }

    handleDragEnd(pointer, x, y) {
        const tile = this.tileSprites[y][x];
        if (!tile || !tile.rect || !tile.icon) return;

        // Snap back to original position and reset depth
        const posX = GRID_OFFSET_X + x * TILE_SIZE + TILE_SIZE / 2;
        const posY = GRID_OFFSET_Y + y * TILE_SIZE + TILE_SIZE / 2;
        tile.rect.x = posX;
        tile.rect.y = posY;
        tile.icon.x = posX;
        tile.icon.y = posY;
        tile.rect.setDepth(0);
        tile.icon.setDepth(0);

        if (!this.dragStart) return;

        // Calculate which grid cell the pointer is over
        const gridX = Math.floor((pointer.x - GRID_OFFSET_X) / TILE_SIZE);
        const gridY = Math.floor((pointer.y - GRID_OFFSET_Y) / TILE_SIZE);

        console.log(`Drag end: pointer at grid (${gridX}, ${gridY}), started at (${this.dragStart.x}, ${this.dragStart.y})`);

        // Check if it's a valid grid position
        if (gridX < 0 || gridX >= GRID_WIDTH || gridY < 0 || gridY >= GRID_HEIGHT) {
            this.dragStart = null;
            return;
        }

        const dx = Math.abs(this.dragStart.x - gridX);
        const dy = Math.abs(this.dragStart.y - gridY);

        if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) {
            console.log('Adjacent tiles - swapping!');
            this.swapTiles(this.dragStart.x, this.dragStart.y, gridX, gridY);
        }

        this.dragStart = null;
    }

    swapTiles(x1, y1, x2, y2) {
        this.isSwapping = true;

        // Swap in grid
        const temp = this.grid[y1][x1];
        this.grid[y1][x1] = this.grid[y2][x2];
        this.grid[y2][x2] = temp;

        this.renderGrid();

        const matchData = this.findMatchData();
        if (matchData.matched.length > 0) {
            this.time.delayedCall(300, () => {
                this.clearMatches(matchData.matched, matchData.runs, matchData.lShapes);
                this.applyGravity();
            });
        } else {
            this.time.delayedCall(350, () => {
                const temp = this.grid[y1][x1];
                this.grid[y1][x1] = this.grid[y2][x2];
                this.grid[y2][x2] = temp;
                this.renderGrid();
                this.isSwapping = false;
            });
        }
    }

    findMatchData() {
        const matched = new Set();
        const runs = [];

        // Horizontal runs
        for (let y = 0; y < GRID_HEIGHT; y++) {
            let x = 0;
            while (x < GRID_WIDTH) {
                const type = this.grid[y][x];
                if (type === -1) {
                    x++;
                    continue;
                }

                let count = 1;
                while (x + count < GRID_WIDTH && this.grid[y][x + count] === type) {
                    count++;
                }

                if (count >= 3) {
                    const tiles = [];
                    for (let i = 0; i < count; i++) {
                        matched.add(`${x + i},${y}`);
                        tiles.push({ x: x + i, y });
                    }

                    const tileType = TILE_TYPES[type];
                    runs.push({
                        length: count,
                        orientation: 'horizontal',
                        type,
                        effect: tileType ? tileType.effect : null,
                        color: tileType ? tileType.color : 0xffffff,
                        tiles
                    });
                }

                x += count;
            }
        }

        // Vertical runs
        for (let x = 0; x < GRID_WIDTH; x++) {
            let y = 0;
            while (y < GRID_HEIGHT) {
                const type = this.grid[y][x];
                if (type === -1) {
                    y++;
                    continue;
                }

                let count = 1;
                while (y + count < GRID_HEIGHT && this.grid[y + count][x] === type) {
                    count++;
                }

                if (count >= 3) {
                    const tiles = [];
                    for (let i = 0; i < count; i++) {
                        matched.add(`${x},${y + i}`);
                        tiles.push({ x, y: y + i });
                    }

                    const tileType = TILE_TYPES[type];
                    runs.push({
                        length: count,
                        orientation: 'vertical',
                        type,
                        effect: tileType ? tileType.effect : null,
                        color: tileType ? tileType.color : 0xffffff,
                        tiles
                    });
                }

                y += count;
            }
        }

        const lShapes = this.findLShapeMatches(runs);

        return {
            matched: Array.from(matched),
            runs,
            lShapes
        };
    }

    isRunEndpoint(run, x, y) {
        if (!run || !run.tiles || run.tiles.length === 0) return false;
        const first = run.tiles[0];
        const last = run.tiles[run.tiles.length - 1];
        return (first.x === x && first.y === y) || (last.x === x && last.y === y);
    }

    findLShapeMatches(runs) {
        const horizontalRuns = runs.filter(run => run.orientation === 'horizontal' && run.length >= 3 && run.type >= 0);
        const verticalRuns = runs.filter(run => run.orientation === 'vertical' && run.length >= 3 && run.type >= 0);
        const lShapes = [];
        const seen = new Set();

        horizontalRuns.forEach(hRun => {
            const hStartX = hRun.tiles[0].x;
            const hEndX = hRun.tiles[hRun.tiles.length - 1].x;
            const hY = hRun.tiles[0].y;

            verticalRuns.forEach(vRun => {
                if (vRun.type !== hRun.type) return;

                const vX = vRun.tiles[0].x;
                const vStartY = vRun.tiles[0].y;
                const vEndY = vRun.tiles[vRun.tiles.length - 1].y;

                const intersects = vX >= hStartX && vX <= hEndX && hY >= vStartY && hY <= vEndY;
                if (!intersects) return;

                // L-shapes share a corner tile that is an endpoint on both runs.
                if (!this.isRunEndpoint(hRun, vX, hY) || !this.isRunEndpoint(vRun, vX, hY)) return;

                const tileMap = new Map();
                hRun.tiles.forEach(tile => tileMap.set(`${tile.x},${tile.y}`, tile));
                vRun.tiles.forEach(tile => tileMap.set(`${tile.x},${tile.y}`, tile));
                const tiles = Array.from(tileMap.values());

                const signature = tiles
                    .map(tile => `${tile.x},${tile.y}`)
                    .sort()
                    .join('|');

                if (seen.has(signature)) return;
                seen.add(signature);

                lShapes.push({
                    effect: hRun.effect,
                    color: hRun.color,
                    corner: { x: vX, y: hY },
                    tiles
                });
            });
        });

        return lShapes;
    }

    findMatches() {
        return this.findMatchData().matched;
    }

    clearMatches(matches, comboRuns = [], lShapeCombos = []) {
        const gear = this.getEquippedStatTotals();
        let totalEnemyDamage = 0;
        let totalPlayerHeal = 0;
        let physicalDamage = 0;
        let magicDamage = 0;
        let rangedDamage = 0;
        let healAmount = 0;
        let goldGain = 0;
        const matchCounts = {
            physical: 0,
            magic: 0,
            ranged: 0,
            health: 0,
            gold: 0
        };
        const matchedTilesForEffects = [];
        const comboChargeSources = [];

        lShapeCombos.forEach((shape, index) => {
            this.spawnLShapeMatchEffect(shape, index * 90);
            this.addCombatLog('L-Shape Match!', this.toHexColor(shape.color || 0xffffff));
        });

        // Regular tile clears charge skills. Heart tiles now also heal directly.
        matches.forEach(match => {
            const [x, y] = match.split(',').map(Number);
            const tileType = this.grid[y][x];
            if (tileType >= 0 && TILE_TYPES[tileType]) {
                const effect = TILE_TYPES[tileType].effect;
                matchedTilesForEffects.push({
                    x: GRID_OFFSET_X + x * TILE_SIZE + TILE_SIZE / 2,
                    y: GRID_OFFSET_Y + y * TILE_SIZE + TILE_SIZE / 2,
                    effect,
                    color: TILE_TYPES[tileType].color
                });
                if (matchCounts[effect] !== undefined) {
                    matchCounts[effect] += 1;
                }
                // Gold tiles give gold on any match (including 3s)
                if (effect === 'gold') {
                    goldGain += 3;
                }
                if (effect === 'physical') {
                    const tileDamage = Math.max(1, 2 + Math.floor(gear.physical * 0.5));
                    physicalDamage += tileDamage;
                    totalEnemyDamage += tileDamage;
                }
                if (effect === 'magic') {
                    const tileDamage = Math.max(1, 2 + Math.floor(gear.magic * 0.5));
                    magicDamage += tileDamage;
                    totalEnemyDamage += tileDamage;
                }
                if (effect === 'ranged') {
                    const tileDamage = Math.max(1, 2 + Math.floor(gear.ranged * 0.5));
                    rangedDamage += tileDamage;
                    totalEnemyDamage += tileDamage;
                }
                if (effect === 'health') {
                    const perTileHeal = 3 + Math.floor(gear.health / 80);
                    const tileHeal = Math.max(2, perTileHeal);
                    healAmount += tileHeal;
                    totalPlayerHeal += tileHeal;
                }
            }
            this.grid[y][x] = -1;
            this.score += 10;
        });

        // --- 4 and 5-row combos: crit damage / heal / gold boost ---
        comboRuns.forEach(run => {
            if (!run || !run.effect || !run.tiles || run.tiles.length === 0) return;
            if (run.length < 4) return;

            const center = run.tiles.reduce((acc, tile) => {
                acc.x += GRID_OFFSET_X + tile.x * TILE_SIZE + TILE_SIZE / 2;
                acc.y += GRID_OFFSET_Y + tile.y * TILE_SIZE + TILE_SIZE / 2;
                return acc;
            }, { x: 0, y: 0 });
            center.x /= run.tiles.length;
            center.y /= run.tiles.length;

            const is5 = run.length >= 5;
            const critMultiplier = is5 ? 3.0 : 1.5;
            const comboLabel = is5 ? '5-Row CRIT' : '4-Row CRIT';

            const charBonuses = this.getCharacterStatBonuses();

            switch (run.effect) {
                case 'physical': {
                    const baseDmg = 8 + gear.physical + charBonuses.physicalDamageBonus;
                    let critDmg = Math.floor(baseDmg * critMultiplier);
                    if (Math.random() * 100 < charBonuses.critChance) {
                        critDmg = Math.floor(critDmg * 1.5);
                        this.addCombatLog(`CRIT! (DEX)`, '#ffff00');
                    }
                    physicalDamage += critDmg;
                    totalEnemyDamage += critDmg;
                    this.spawnComboTierEffect(center.x, center.y, run.color, run.length, critDmg);
                    this.addCombatLog(`${comboLabel} ⚔️ Physical: ${critDmg}`, '#ff4444');
                    break;
                }
                case 'magic': {
                    const baseDmg = 9 + gear.magic + charBonuses.magicDamageBonus;
                    let critDmg = Math.floor(baseDmg * critMultiplier);
                    if (Math.random() * 100 < charBonuses.critChance) {
                        critDmg = Math.floor(critDmg * 1.5);
                        this.addCombatLog(`CRIT! (DEX)`, '#ffff00');
                    }
                    magicDamage += critDmg;
                    totalEnemyDamage += critDmg;
                    this.spawnComboTierEffect(center.x, center.y, run.color, run.length, critDmg);
                    this.addCombatLog(`${comboLabel} 📖 Magic: ${critDmg}`, '#5a7aff');
                    break;
                }
                case 'ranged': {
                    const baseDmg = 7 + gear.ranged + charBonuses.rangedDamageBonus;
                    let critDmg = Math.floor(baseDmg * critMultiplier);
                    if (Math.random() * 100 < charBonuses.critChance) {
                        critDmg = Math.floor(critDmg * 1.5);
                        this.addCombatLog(`CRIT! (DEX)`, '#ffff00');
                    }
                    rangedDamage += critDmg;
                    totalEnemyDamage += critDmg;
                    this.spawnComboTierEffect(center.x, center.y, run.color, run.length, critDmg);
                    this.addCombatLog(`${comboLabel} 🏹 Ranged: ${critDmg}`, '#55ff55');
                    break;
                }
                case 'health': {
                    const baseHeal = 15 + Math.floor(gear.health / 5);
                    const critHeal = Math.floor(baseHeal * critMultiplier);
                    healAmount += critHeal;
                    totalPlayerHeal += critHeal;
                    this.spawnComboTierEffect(center.x, center.y, run.color, run.length, critHeal);
                    this.addCombatLog(`${comboLabel} ♥ Heal: +${critHeal}`, '#ff69b4');
                    break;
                }
                case 'gold': {
                    const baseGold = is5 ? 25 : 12;
                    goldGain += baseGold;
                    this.spawnComboTierEffect(center.x, center.y, run.color, run.length, baseGold);
                    this.addCombatLog(`${comboLabel} 🪙 Gold +${baseGold}`, '#ffd966');
                    break;
                }
            }

            // Bonus skill charge from combos
            const bonusCharge = is5 ? 3 : 1;
            if (matchCounts[run.effect] !== undefined) {
                matchCounts[run.effect] += bonusCharge;
            }

            comboChargeSources.push({
                x: center.x,
                y: center.y,
                effect: run.effect,
                color: run.color,
                bonusUnits: bonusCharge
            });
        });

        // Apply talent damage % bonuses
        const talentBonuses = this.getTalentPercentBonuses();
        if (physicalDamage > 0) {
            physicalDamage = Math.floor(physicalDamage * (1 + talentBonuses.physicalDamage / 100) * (talentBonuses.seeRed ? 2 : 1));
        }
        if (magicDamage > 0) {
            magicDamage = Math.floor(magicDamage * (1 + talentBonuses.magicDamage / 100));
        }
        if (rangedDamage > 0) {
            rangedDamage = Math.floor(rangedDamage * (1 + talentBonuses.rangedDamage / 100));
        }
        totalEnemyDamage = physicalDamage + magicDamage + rangedDamage;

        // Apply gold gains
        if (goldGain > 0) {
            this.player.gold += goldGain;
            this.addCombatLog(`Gold +${goldGain}`, '#ffd966');
            this.updateGoldDisplay();
        }

        if (physicalDamage > 0) {
            this.addCombatLog(`Physical Damage: ${physicalDamage}`, '#ff0000');
        }
        if (magicDamage > 0) {
            this.addCombatLog(`Magic Damage: ${magicDamage}`, '#0000ff');
        }
        if (rangedDamage > 0) {
            this.addCombatLog(`Ranged Damage: ${rangedDamage}`, '#00ff00');
        }
        if (healAmount > 0) {
            this.addCombatLog(`Heart Heal: +${healAmount}`, '#ff79bf');
        }

        this.addSkillChargeFromMatches(matchCounts);
        this.spawnSkillChargeParticles(matchedTilesForEffects);
        this.spawnComboBonusChargeParticles(comboChargeSources);

        if (totalEnemyDamage > 0) {
            const target = this.getTargetEnemy();
            if (target) {
                target.health = Math.max(0, target.health - totalEnemyDamage);
                this.showCombatMessage(`${target.name} -${totalEnemyDamage}`, '#ff5555', GRID_OFFSET_X + (GRID_WIDTH * TILE_SIZE) / 2, GRID_OFFSET_Y - 15);

                // Player attack animation
                if (this.playerSprite) {
                    this.playPlayerAttackAnim();
                }
                // Enemy hit reaction
                if (target.health > 0) {
                    this.time.delayedCall(100, () => this.playEnemyHitAnim(target));
                }

                if (target.health <= 0) {
                    this.handleEnemyDeath(target);
                }
            }

            if (this.allEnemiesDead()) {
                if (!this.awaitingRewardChoice) {
                    this.awaitingRewardChoice = true;
                    this.stopAllParticleEffects();
                    this.time.delayedCall(1500, () => this.showRewardScreen());
                }
                this.isSwapping = true;
            }
        }

        if (totalPlayerHeal > 0) {
            this.player.health = Math.min(this.getMaxHealth(), this.player.health + totalPlayerHeal);
            this.showCombatMessage(`Hero +${totalPlayerHeal}`, '#55ff55', GRID_OFFSET_X + (GRID_WIDTH * TILE_SIZE) / 2, GRID_OFFSET_Y + 20);
        }

        this.player.health = Math.min(this.getMaxHealth(), this.player.health);

        document.getElementById('score').textContent = `Score: ${this.score}`;
        this.updatePlayerUI();
        this.updateEnemyUI();
        this.renderGrid();
    }

    applyGravity() {
        // Calculate which tiles move where
        const newGrid = this.grid.map(row => [...row]);
        const animations = [];
        const newTiles = []; // Track newly spawned tiles {x, y, type}

        // Drop existing tiles down
        for (let x = 0; x < GRID_WIDTH; x++) {
            for (let y = GRID_HEIGHT - 1; y > 0; y--) {
                if (newGrid[y][x] === -1) {
                    let sourceY = y - 1;
                    while (sourceY >= 0 && newGrid[sourceY][x] === -1) {
                        sourceY--;
                    }
                    if (sourceY >= 0) {
                        newGrid[y][x] = newGrid[sourceY][x];
                        newGrid[sourceY][x] = -1;
                        animations.push({ x, fromY: sourceY, toY: y });
                    }
                }
            }
        }

        // Fill empty at top with new tiles
        for (let x = 0; x < GRID_WIDTH; x++) {
            for (let y = 0; y < GRID_HEIGHT; y++) {
                if (newGrid[y][x] === -1) {
                    const type = this.getRandomTileType();
                    newGrid[y][x] = type;
                    newTiles.push({ x, y, type });
                }
            }
        }

        this.grid = newGrid;

        // Animate falling tiles
        const allAnimations = [];
        
        animations.forEach(anim => {
            const sprite = this.tileSprites[anim.fromY][anim.x];
            if (sprite && sprite.rect) {
                const toWorldY = GRID_OFFSET_Y + anim.toY * TILE_SIZE + TILE_SIZE / 2;
                allAnimations.push(
                    this.tweens.add({
                        targets: sprite.rect,
                        y: toWorldY,
                        duration: 250,
                        ease: 'Power2'
                    })
                );
            }
        });

        // After existing tiles fall, re-render to add new tiles, then animate them
        this.time.delayedCall(50, () => {
            // Recreate all sprites (will place new tiles at top of screen temporarily)
            const savedAnimations = this.tweens.getAllTweens();
            this.renderGrid();
            
            // Now animate new tiles falling down
            newTiles.forEach(newTile => {
                const toWorldY = GRID_OFFSET_Y + newTile.y * TILE_SIZE + TILE_SIZE / 2;
                const sprite = this.tileSprites[newTile.y][newTile.x];
                if (sprite && sprite.rect) {
                    sprite.rect.y = GRID_OFFSET_Y - TILE_SIZE; // Start above screen
                }
                if (sprite && sprite.icon) {
                    sprite.icon.y = GRID_OFFSET_Y - TILE_SIZE;
                }

                if (sprite && sprite.rect) {
                    this.tweens.add({
                        targets: sprite.rect,
                        y: toWorldY,
                        duration: 200,
                        ease: 'Power2'
                    });
                }

                if (sprite && sprite.icon) {
                    this.tweens.add({
                        targets: sprite.icon,
                        y: toWorldY,
                        duration: 200,
                        ease: 'Power2'
                    });
                }
            });

            // Check for cascading matches after new tiles fall
            this.time.delayedCall(250, () => {
                // Skip cascades if the fight is already over
                if (this.awaitingRewardChoice) {
                    this.isSwapping = false;
                    return;
                }
                const matchData = this.findMatchData();
                if (matchData.matched.length > 0) {
                    this.time.delayedCall(300, () => {
                        this.clearMatches(matchData.matched, matchData.runs, matchData.lShapes);
                        this.applyGravity();
                    });
                } else {
                    this.isSwapping = false;
                        // Enemy attacks only after player's turn is fully complete
                        // Add a longer delay between hero attack and enemy attack for better pacing
                        if (!this.allEnemiesDead()) {
                            this.time.delayedCall(700, () => {
                                this.enemyAttack();
                            });
                        }
                }
            });
        });
    }

    enemyAttack() {
        const alive = this.getAliveEnemies();
        if (alive.length === 0 || this.awaitingRewardChoice) return;

        const gear = this.getEquippedStatTotals();
        const charBonuses = this.getCharacterStatBonuses();
        const tb = this.getTalentPercentBonuses();
        const baseArmor = gear.armor + charBonuses.armorBonus;
        const totalArmor = Math.floor(baseArmor * (1 + tb.armor / 100));
        const armorReduction = Math.floor(totalArmor / 4);
        const totalEvasionChance = Math.min(75, charBonuses.evasionChance + gear.evasion * 0.3 + tb.evasion);
        const totalBlockChance = Math.min(75, tb.blockChance);

        alive.forEach((enemy, idx) => {
            this.time.delayedCall(idx * 600, () => {
                if (this.player.health <= 0) return;

                // Block check per attack
                if (totalBlockChance > 0 && Math.random() * 100 < totalBlockChance) {
                    this.addCombatLog(`Blocked ${enemy.name}'s attack! (${totalBlockChance}%)`, '#ffd700');
                    this.showCombatMessage('BLOCK!', '#ffd700', GRID_OFFSET_X + (GRID_WIDTH * TILE_SIZE) / 2, GRID_OFFSET_Y + GRID_HEIGHT * TILE_SIZE - 20 - idx * 18);
                    this.playEnemyAttackAnim(enemy);
                    this.updatePlayerUI();
                    return;
                }

                // Evasion check per attack
                if (Math.random() * 100 < totalEvasionChance) {
                    this.addCombatLog(`Evaded ${enemy.name}'s attack! (${totalEvasionChance.toFixed(0)}%)`, '#00ffcc');
                    this.showCombatMessage('EVADE!', '#00ffcc', GRID_OFFSET_X + (GRID_WIDTH * TILE_SIZE) / 2, GRID_OFFSET_Y + GRID_HEIGHT * TILE_SIZE - 20 - idx * 18);
                    this.playEnemyAttackAnim(enemy);
                    this.updatePlayerUI();
                    return;
                }

                const damage = enemy.attack;
                let remainingDamage = Math.max(1, damage - armorReduction);

                let shieldAbsorbed = 0;
                if (this.player.currentShield > 0 && remainingDamage > 0) {
                    shieldAbsorbed = Math.min(remainingDamage, this.player.currentShield);
                    this.player.currentShield -= shieldAbsorbed;
                    remainingDamage -= shieldAbsorbed;
                }

                this.player.health -= remainingDamage;
                if (this.player.health < 0) this.player.health = 0;
                const shieldMsg = shieldAbsorbed > 0 ? `, ${shieldAbsorbed} shielded` : '';
                this.addCombatLog(`${enemy.name}: -${remainingDamage} HP (${armorReduction} blocked${shieldMsg})`, '#ff6666');
                const totalTaken = remainingDamage + shieldAbsorbed;
                this.showCombatMessage(`-${totalTaken}`, '#ff4444', GRID_OFFSET_X + (GRID_WIDTH * TILE_SIZE) / 2, GRID_OFFSET_Y + GRID_HEIGHT * TILE_SIZE - 20 - idx * 18);

                // Enemy attack animation
                this.playEnemyAttackAnim(enemy);
                // Player hit reaction
                if (this.playerSprite) {
                    this.time.delayedCall(100, () => this.playPlayerHitAnim());
                }

                this.updatePlayerUI();
                if (this.player.health <= 0) {
                    if (this.playerSprite) {
                        this.playerSprite.play('warrior_death');
                    }
                    this.add.text(GRID_OFFSET_X + (GRID_WIDTH * TILE_SIZE) / 2, GRID_OFFSET_Y + (GRID_HEIGHT * TILE_SIZE) / 2, 'Game Over', { fontSize: '48px', color: '#ff0000', fontStyle: 'bold' }).setOrigin(0.5);
                    this.isSwapping = true;
                }
            });
        });
    }

    isValidPlacement(x, y, type) {
        // Check horizontal
        let count = 1;
        for (let checkX = x - 1; checkX >= 0 && this.grid[y] && this.grid[y][checkX] === type; checkX--) {
            count++;
        }
        for (let checkX = x + 1; checkX < GRID_WIDTH && this.grid[y] && this.grid[y][checkX] === type; checkX++) {
            count++;
        }
        if (count >= 3) return false;

        // Check vertical
        count = 1;
        for (let checkY = y - 1; checkY >= 0 && this.grid[checkY] && this.grid[checkY][x] === type; checkY--) {
            count++;
        }
        for (let checkY = y + 1; checkY < GRID_HEIGHT && this.grid[checkY] && this.grid[checkY][x] === type; checkY++) {
            count++;
        }
        if (count >= 3) return false;

        return true;
    }
}

class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        this.load.image('loadscreen', 'assets/LoadScreens/Load Screen.jpg');
    }

    create() {
        this.scene.start('LoadScreen');
    }
}

class LoadScreen extends Phaser.Scene {
    constructor() {
        super('LoadScreen');
    }

    preload() {
        // Show the load screen image immediately (already cached by BootScene)
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;
        const img = this.add.image(width / 2, height / 2, 'loadscreen');
        const scaleX = width / img.width;
        const scaleY = height / img.height;
        img.setScale(Math.max(scaleX, scaleY));

        // Loading bar on top of the image
        const barW = 260;
        const barH = 18;
        const barX = (width - barW) / 2;
        const barY = height - 100;

        const barBg = this.add.rectangle(width / 2, barY, barW + 4, barH + 4, 0x000000, 0.7).setOrigin(0.5);
        const barFill = this.add.rectangle(barX, barY - barH / 2, 0, barH, 0x00ff88).setOrigin(0, 0);
        const loadText = this.add.text(width / 2, barY - 20, 'Loading...', {
            fontSize: '14px', color: '#ffffff', stroke: '#000000', strokeThickness: 3
        }).setOrigin(0.5);

        this.load.on('progress', (value) => {
            barFill.width = barW * value;
        });
        this.load.on('complete', () => {
            barBg.destroy();
            barFill.destroy();
            loadText.destroy();
        });

        // Load ALL game assets here
        TILE_TYPES.forEach(t => {
            this.load.image('tile_' + t.name, 'assets/' + t.name + '.png');
        });
        this.load.spritesheet('warrior', 'assets/sprites/warrior_anim.png', {
            frameWidth: 155,
            frameHeight: 130
        });
        this.load.spritesheet('redsquirrel', 'assets/sprites/redsquirrel_anim.png', {
            frameWidth: 155,
            frameHeight: 130
        });
        this.load.spritesheet('skinnypiggoblin', 'assets/sprites/skinnypiggoblin_anim.png', {
            frameWidth: 155,
            frameHeight: 130
        });
        this.load.spritesheet('orcpig', 'assets/sprites/orcpig_anim.png', {
            frameWidth: 155,
            frameHeight: 130
        });
        this.load.spritesheet('slothtroll', 'assets/sprites/slothtroll_anim.png', {
            frameWidth: 155,
            frameHeight: 130
        });
        this.load.spritesheet('bunnywarlock', 'assets/sprites/bunnywarlock_anim.png', {
            frameWidth: 155,
            frameHeight: 130
        });
        this.load.spritesheet('hamsterskeleton', 'assets/sprites/hamsterskeleton_anim.png', {
            frameWidth: 155,
            frameHeight: 130
        });

        // Skill icon assets
        this.load.image('skill_cleave', 'assets/Skills/CleaveSkill.png');
        this.load.image('skill_minutemissles', 'assets/Skills/MinuteMisslesSkill.png');
        this.load.image('skill_multishot', 'assets/Skills/MultishotSkill.png');
        this.load.image('skill_duckandroll', 'assets/Skills/Duckandrollskill.png');
        this.load.image('skill_energybeam', 'assets/Skills/EnergyBeamskill.png');
        this.load.image('skill_recklessattack', 'assets/Skills/RecklessAttackSkill.png');
    }

    create() {
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;

        const prompt = this.add.text(width / 2, height - 60, 'Tap to Start', {
            fontSize: '24px',
            color: '#ffffff',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.tweens.add({
            targets: prompt,
            alpha: 0.3,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        this.input.once('pointerup', () => {
            this.scene.start('Match3Scene');
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 390,
    height: 780,
    backgroundColor: '#2c3e50',
    render: {
        antialias: true,
        pixelArt: false,
        roundPixels: true
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    input: {
        activePointers: 2
    },
    scene: [BootScene, LoadScreen, Match3Scene]
};

const game = new Phaser.Game(config);
