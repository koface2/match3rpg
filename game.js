const GRID_WIDTH = 6;
const GRID_HEIGHT = 6;
const TILE_SIZE = 52;
const GRID_OFFSET_X = 39;
const GRID_OFFSET_Y = 282;

const TILE_TYPES = [
    { name: 'health', color: 0xff1493, icon: '♥', effect: 'health' },
    { name: 'magic', color: 0x0000ff, icon: '📖', effect: 'magic' },
    { name: 'ranged', color: 0x00ff00, icon: '🏹', effect: 'ranged' },
    { name: 'physical', color: 0xff0000, icon: '⚔️', effect: 'physical' },
    { name: 'loot', color: 0xffff00, icon: '🪙', effect: 'loot' }
];

const MONSTER_AVATARS = ['👹', '👺', '🧟', '👾', '🤖', '🐉', '🕷️', '🦑'];
const MONSTER_NAMES = ['Ogre', 'Oni', 'Zombie', 'Ghost', 'Robot', 'Dragon', 'Spider', 'Squid'];
const PLAYER_AVATAR = '👸';

const ITEM_RARITIES = [
    { name: 'Normal', weight: 60, affixes: 0, statMultiplier: 1.0, frameColor: 0xa3a3a3, textColor: '#d0d0d0' },
    { name: 'Magic', weight: 25, affixes: 2, statMultiplier: 1.15, frameColor: 0x5aa9ff, textColor: '#8ec5ff' },
    { name: 'Rare', weight: 12, affixes: 4, statMultiplier: 1.35, frameColor: 0xffd166, textColor: '#ffe08f' },
    { name: 'Legendary', weight: 3, affixes: 6, statMultiplier: 1.65, frameColor: 0xff7f11, textColor: '#ffb35c' }
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
    { name: 'Brutal', stats: { physical: [2, 6] }, tags: ['strength'] },
    { name: 'Arcane', stats: { magic: [2, 6] }, tags: ['intelligence'] },
    { name: 'Deadeye', stats: { ranged: [2, 6] }, tags: ['dexterity'] },
    { name: 'Stalwart', stats: { armor: [2, 7] }, tags: ['strength'] },
    { name: 'Vital', stats: { health: [8, 20] }, tags: [] },
    { name: 'Prosperous', stats: { loot: [4, 14] }, tags: [] },
    { name: 'Cruel', stats: { physical: [4, 10] }, tags: ['strength'] },
    { name: 'Runic', stats: { magic: [4, 10] }, tags: ['intelligence'] },
    { name: 'Sharpened', stats: { ranged: [3, 8], physical: [1, 3] }, tags: ['dexterity', 'strength'] },
    { name: 'Fortified', stats: { armor: [4, 12], health: [4, 10] }, tags: ['strength'] },
    { name: 'Vampiric', stats: { health: [6, 16], physical: [1, 4] }, tags: ['strength'] },
    { name: 'Gilded', stats: { loot: [6, 20] }, tags: [] },
    { name: 'Nimble', stats: { ranged: [2, 5], evasion: [1, 3] }, tags: ['dexterity'] },
    { name: 'Sorcerous', stats: { magic: [3, 8], energyShield: [2, 6] }, tags: ['intelligence'] },
    { name: 'Warding', stats: { energyShield: [3, 8] }, tags: ['intelligence'] },
    { name: 'Evasive', stats: { evasion: [3, 8] }, tags: ['dexterity'] }
];

const ITEM_SUFFIXES = [
    { name: 'of Slaying', stats: { physical: [1, 5], magic: [1, 4] }, tags: ['strength', 'intelligence'] },
    { name: 'of Focus', stats: { magic: [2, 7] }, tags: ['intelligence'] },
    { name: 'of Precision', stats: { ranged: [2, 7] }, tags: ['dexterity'] },
    { name: 'of Guarding', stats: { armor: [2, 8] }, tags: ['strength'] },
    { name: 'of Vitality', stats: { health: [10, 24] }, tags: [] },
    { name: 'of Fortune', stats: { loot: [5, 16] }, tags: [] },
    { name: 'of Carnage', stats: { physical: [4, 12] }, tags: ['strength'] },
    { name: 'of the Magi', stats: { magic: [4, 12] }, tags: ['intelligence'] },
    { name: 'of the Hawk', stats: { ranged: [4, 10] }, tags: ['dexterity'] },
    { name: 'of the Fortress', stats: { armor: [5, 14], health: [4, 10] }, tags: ['strength'] },
    { name: 'of Regeneration', stats: { health: [12, 32] }, tags: [] },
    { name: 'of Plunder', stats: { loot: [8, 22] }, tags: [] },
    { name: 'of Devastation', stats: { physical: [3, 8], ranged: [2, 6] }, tags: ['strength', 'dexterity'] },
    { name: 'of the Archmage', stats: { magic: [3, 9], energyShield: [3, 8] }, tags: ['intelligence'] },
    { name: 'of Reflexes', stats: { evasion: [4, 10] }, tags: ['dexterity'] },
    { name: 'of Shielding', stats: { energyShield: [4, 10] }, tags: ['intelligence'] }
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
        id: 'arc-burst',
        name: 'Arc Burst',
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
        tileEffect: 'loot',
        baseThreshold: 4,
        mode: 'loot',
        basePower: 16,
        scalingStat: 'loot'
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
        lootFlat: 12,
        healFlat: 0,
        extraHitChance: 0
    }
];

// ---------------------------------------------------------------------------
// Talent Tree — 9 nodes across Strength / Intelligence / Dexterity branches.
// col/row are the original grid coordinates from the tree designer (used to
// compute pixel positions on the talent screen).
// prereqs: node IDs that must be allocated before this node unlocks.
// deps:    additional dependency nodes whose paths must exist first.
// ---------------------------------------------------------------------------
const TALENT_TREE_NODES = [
    { id: 1,  name: 'Strength',       icon: '⚔️', stat: 'strength',     amount: 3, shortDesc: '+3 STR',      col: 12, row: 5, prereqs: [],   deps: []   },
    { id: 2,  name: 'Dexterity',      icon: '🏹', stat: 'dexterity',    amount: 3, shortDesc: '+3 DEX',      col: 13, row: 6, prereqs: [],   deps: []   },
    { id: 3,  name: 'Intelligence',   icon: '📖', stat: 'intelligence', amount: 3, shortDesc: '+3 INT',      col: 11, row: 6, prereqs: [],   deps: []   },
    { id: 11, name: 'Physical Dmg',   icon: '💥', stat: 'physical',     amount: 5, shortDesc: '+5 Physical', col: 12, row: 3, prereqs: [1],  deps: []   },
    { id: 13, name: 'Strength II',    icon: '⚔️', stat: 'strength',     amount: 3, shortDesc: '+3 STR',      col: 12, row: 4, prereqs: [1],  deps: [11] },
    { id: 14, name: 'Intelligence II',icon: '📖', stat: 'intelligence', amount: 3, shortDesc: '+3 INT',      col: 10, row: 7, prereqs: [3],  deps: [15] },
    { id: 15, name: 'Magic Dmg',      icon: '✨', stat: 'magic',        amount: 5, shortDesc: '+5 Magic',    col:  9, row: 8, prereqs: [3],  deps: []   },
    { id: 16, name: 'Ranged Dmg',     icon: '🎯', stat: 'ranged',       amount: 5, shortDesc: '+5 Ranged',  col: 15, row: 8, prereqs: [2],  deps: []   },
    { id: 17, name: 'Dexterity II',   icon: '🏹', stat: 'dexterity',    amount: 3, shortDesc: '+3 DEX',      col: 14, row: 7, prereqs: [2],  deps: [16] }
];

const TALENT_TREE_CONNECTIONS = [
    { from: 1,  to: 11 },
    { from: 11, to: 13 },
    { from: 3,  to: 15 },
    { from: 15, to: 14 },
    { from: 2,  to: 16 },
    { from: 16, to: 17 }
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
            health: 100,
            currentShield: 0,
            physical: 0,
            magic: 0,
            ranged: 0,
            loot: 0,
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
        this.enemy = {
            health: 200,
            maxHealth: 200,
            attack: 12
        };
        this.playerStatsText = null;
        this.playerAvatar = null;
        this.playerShieldBarBg = null;
        this.playerShieldBar = null;
        this.playerShieldLabel = null;
        this.playerShieldText = null;
        this.playerHealthBarBg = null;
        this.playerHealthBar = null;
        this.enemyStatsText = null;
        this.enemyNameText = null;
        this.enemyAvatar = null;
        this.enemyHealthBarBg = null;
        this.enemyHealthBar = null;
        this.combatLog = [];
        this.combatLogTexts = [];
        this.maxCombatLogLines = 3;

        this.boardContainer = null;
        this.hudContainer = null;
        this.equipmentScreenGroup = null;
        this.talentScreenGroup = null;
        this.talentNodeUI = {};
        this.talentPointsLabel = null;
        this.talentConnectionGraphics = null;
        this.currentScreen = 'game';
        this.combatLogTexts = [];
        this.maxCombatLogLines = 3;
        const monsterIndex = Phaser.Math.Between(0, MONSTER_AVATARS.length - 1);
        this.currentMonsterAvatar = MONSTER_AVATARS[monsterIndex];
        this.currentMonsterName = MONSTER_NAMES[monsterIndex];

        this.maxInventorySlots = 12;
        this.itemIdCounter = 0;
        this.inventory = this.generateStarterInventory();
        this.equippedItems = {};
        this.allocatedTalents = new Set();
        this.talentStatBonuses = { physical: 0, magic: 0, ranged: 0 };
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
        this.rewardScreenGroup = null;
        this.rewardLootInfoText = null;
        this.rewardCards = [];
        this.rewardChoices = [];
        this.awaitingRewardChoice = false;
        this.battleNumber = 1;

        this.skillBarContainer = null;
        this.skillSlotUI = [];
        this.playerSkills = this.createInitialSkillLoadout();
        this.skillCharge = this.createInitialSkillCharge();
        this.skillChargeFxContainer = null;

        this.lootMeter = 0;
        this.lootMeterMax = 100;
        this.lootMeterBarBg = null;
        this.lootMeterBar = null;
        this.lootMeterText = null;
        this.lootMeterLabel = null;

        this.skillsScreenGroup = null;
        this.skillsActiveSlotUI = [];
        this.skillsInventoryGems = this.createSkillGemInventoryPool();
        this.skillsInventoryTiles = [];
        this.selectedSkillGem = null;
        this.selectedGemInventoryIndex = -1;
        this.skillsGemModal = null;
        this.skillsGemModalTitle = null;
        this.skillsGemModalIcon = null;
        this.skillsGemModalName = null;
        this.skillsGemModalType = null;
        this.skillsGemModalDesc = null;
        this.skillsGemModalEquipBtn = null;
        this.skillsGemModalDiscardBtn = null;
        this.draggingSkillGemTile = null;
        this.skillGemWasDragged = false;
        this.armedEquipGem = null;
    }

    preload() {
        TILE_TYPES.forEach(t => {
            this.load.image('tile_' + t.name, 'assets/' + t.name + '.png');
        });
    }

    create() {
        console.log('Scene created!');

        this.boardContainer = this.add.container(0, 0);
        this.hudContainer = this.add.container(0, 0);
        this.skillChargeFxContainer = this.add.container(0, 0);
        this.skillChargeFxContainer.setDepth(1100);

        this.createGrid();
        this.renderGrid();
        this.createPlayerUI();
        this.refillEnergyShield();
        this.createCombatLog();
        this.createRewardScreen();
        this.createSkillBar();

        this.showGameScreen();
    }

    createInitialSkillLoadout() {
        return [
            { activeId: 'cleave', supportIds: ['focus', 'brutality', null] },
            { activeId: 'arc-burst', supportIds: ['echo', null, null] },
            { activeId: 'multishot', supportIds: ['vitality', null, null] }
        ];
    }

    createInitialSkillCharge() {
        return {
            physical: 0,
            magic: 0,
            ranged: 0,
            health: 0,
            loot: 0
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
            this.enemy.health = Math.max(0, this.enemy.health - castResult.enemyDamage);
            this.showCombatMessage(
                `${activeSkill.name} -${castResult.enemyDamage}`,
                '#ffae57',
                GRID_OFFSET_X + (GRID_WIDTH * TILE_SIZE) / 2,
                GRID_OFFSET_Y - 15
            );
        }

        if (castResult.healAmount > 0) {
            this.player.health = Math.min(500, this.player.health + castResult.healAmount);
            this.showCombatMessage(
                `${activeSkill.name} +${castResult.healAmount}`,
                '#8dff9b',
                GRID_OFFSET_X + (GRID_WIDTH * TILE_SIZE) / 2,
                GRID_OFFSET_Y + 20
            );
        }

        if (castResult.lootAmount > 0) {
            this.player.loot += castResult.lootAmount;
            this.addCombatLog(`Skill Loot Bonus: +${castResult.lootAmount}`, '#ffee75');
        }

        if (this.enemy.health <= 0) {
            this.enemy.health = 0;
            this.handleEnemyDeath();
            if (!this.awaitingRewardChoice) {
                this.awaitingRewardChoice = true;
                this.time.delayedCall(850, () => this.showRewardScreen());
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
            if (!slotUI || !slotUI.bg) return;

            targets.push({
                x: slotUI.bg.x,
                y: slotUI.bg.y,
                slotIndex: index
            });
        });

        return targets;
    }

    flashSkillCardCharge(slotIndex, color) {
        const slotUI = this.skillSlotUI[slotIndex];
        if (!slotUI || !slotUI.bg) return;

        const flash = this.add.rectangle(slotUI.bg.x, slotUI.bg.y, slotUI.bg.width - 2, slotUI.bg.height - 2, color, 0.5)
            .setOrigin(0.5)
            .setDepth(1080);

        if (this.skillChargeFxContainer) {
            this.skillChargeFxContainer.add(flash);
        }

        this.tweens.add({
            targets: flash,
            alpha: 0,
            scaleX: 1.08,
            scaleY: 1.08,
            duration: 220,
            ease: 'Quad.easeOut',
            onComplete: () => flash.destroy()
        });
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
            if (tile.effect === 'loot') {
                const target = this.getLootMeterParticleTarget();
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
                            () => this.flashLootMeterCharge(tile.color)
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

    getLootMeterParticleTarget() {
        if (!this.lootMeterBarBg) return null;

        const x = this.lootMeterBarBg.x + Math.max(10, this.lootMeterBarBg.width * 0.5);
        const y = this.lootMeterBarBg.y;
        return { x, y };
    }

    flashLootMeterCharge(color) {
        if (!this.lootMeterBarBg) return;

        const flash = this.add.rectangle(
            this.lootMeterBarBg.x + this.lootMeterBarBg.width / 2,
            this.lootMeterBarBg.y,
            this.lootMeterBarBg.width,
            this.lootMeterBarBg.height + 2,
            color,
            0.55
        ).setOrigin(0.5).setDepth(1092);

        if (this.skillChargeFxContainer) {
            this.skillChargeFxContainer.add(flash);
        }

        this.tweens.add({
            targets: flash,
            alpha: 0,
            scaleY: 1.7,
            duration: 320,
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
        this.skillBarContainer = this.add.container(0, 0);

        const skillBarBg = this.add.rectangle(width / 2, 724, width - 4, 62, 0x0e0e0e, 0.95)
            .setStrokeStyle(1, 0x3b3b3b, 1)
            .setOrigin(0.5);
        this.skillBarContainer.add(skillBarBg);

        const cardWidth = 122;
        const cardHeight = 50;
        const spacing = 8;
        const startX = (width - (cardWidth * 3 + spacing * 2)) / 2 + cardWidth / 2;
        const cardY = 724;

        this.skillSlotUI = [];
        for (let i = 0; i < 3; i++) {
            const centerX = startX + i * (cardWidth + spacing);
            const bg = this.add.rectangle(centerX, cardY, cardWidth, cardHeight, 0x1b1b1b, 1)
                .setStrokeStyle(2, 0xffffff, 1)
                .setOrigin(0.5)
                .setInteractive({ useHandCursor: true });
            const name = this.add.text(centerX, cardY - 11, '', {
                fontSize: '11px',
                color: '#ffffff',
                fontStyle: 'bold'
            }).setOrigin(0.5);
            const threshold = this.add.text(centerX, cardY, '', {
                fontSize: '10px',
                color: '#d5d5d5'
            }).setOrigin(0.5);

            const supportSockets = [];
            for (let socketIndex = 0; socketIndex < 3; socketIndex++) {
                const socketX = centerX - 34 + socketIndex * 34;
                const socketY = cardY + 16;
                const socketBg = this.add.rectangle(socketX, socketY, 32, 13, 0x292929, 1)
                    .setStrokeStyle(1, 0x737373, 1)
                    .setOrigin(0.5);
                const socketText = this.add.text(socketX, socketY, '-', {
                    fontSize: '9px',
                    color: '#cccccc'
                }).setOrigin(0.5);
                supportSockets.push({ socketBg, socketText });
                this.skillBarContainer.add([socketBg, socketText]);
            }

            bg.on('pointerup', () => this.activateSkillSlot(i));

            this.skillSlotUI.push({ bg, name, threshold, supportSockets });
            this.skillBarContainer.add([bg, name, threshold]);
        }

        this.updateSkillBarUI();
    }

    updateSkillBarUI() {
        if (!this.skillSlotUI || this.skillSlotUI.length === 0) return;

        this.skillSlotUI.forEach((slotUI, index) => {
            const loadout = this.playerSkills[index];
            const activeSkill = this.getActiveSkillById(loadout.activeId);
            if (!activeSkill) return;

            const tileData = this.getTileDataForEffect(activeSkill.tileEffect);
            const borderColor = tileData ? tileData.color : 0xffffff;
            const threshold = this.getSkillTriggerThreshold(loadout);
            const currentCharge = this.skillCharge[activeSkill.tileEffect] || 0;
            const isReady = currentCharge >= threshold;

            slotUI.bg.setStrokeStyle(2, borderColor, isReady ? 1 : 0.5);
            slotUI.bg.setFillStyle(isReady ? 0x2a2a2a : 0x171717, isReady ? 1 : 0.72);
            slotUI.bg.setScale(isReady ? 1 : 0.9);
            slotUI.bg.setAlpha(isReady ? 1 : 0.62);
            slotUI.name.setText(`${index + 1}. ${activeSkill.name}`);
            slotUI.name.setColor(this.toHexColor(borderColor));
            slotUI.name.setAlpha(isReady ? 1 : 0.6);
            slotUI.name.setScale(isReady ? 1 : 0.92);
            slotUI.name.setFontStyle(isReady ? 'bold' : 'normal');
            slotUI.threshold.setText(`${tileData ? tileData.icon : ''} ${currentCharge}/${threshold}`);
            slotUI.threshold.setColor(isReady ? '#ffffff' : '#989898');
            slotUI.threshold.setAlpha(isReady ? 1 : 0.66);

            slotUI.supportSockets.forEach((socketUI, socketIndex) => {
                const supportId = loadout.supportIds[socketIndex];
                const supportGem = this.getSupportGemById(supportId);
                if (supportGem) {
                    socketUI.socketText.setText(supportGem.short);
                    socketUI.socketBg.setStrokeStyle(1, borderColor, isReady ? 1 : 0.6);
                    socketUI.socketBg.setAlpha(isReady ? 1 : 0.68);
                    socketUI.socketText.setAlpha(isReady ? 1 : 0.72);
                } else {
                    socketUI.socketText.setText('---');
                    socketUI.socketBg.setStrokeStyle(1, 0x737373, 1);
                    socketUI.socketBg.setAlpha(isReady ? 1 : 0.55);
                    socketUI.socketText.setAlpha(isReady ? 1 : 0.65);
                }
            });
        });

        this.refreshSkillsScreenUI();
    }

    getSkillGemDisplay(gem) {
        if (!gem) return { icon: '?', name: 'Unknown', typeLabel: '' };

        if (gem.type === 'active') {
            const activeSkill = this.getActiveSkillById(gem.id);
            const tileData = activeSkill ? this.getTileDataForEffect(activeSkill.tileEffect) : null;
            return {
                icon: tileData ? tileData.icon : '◆',
                name: activeSkill ? activeSkill.name : 'Unknown Active',
                typeLabel: 'Active'
            };
        }

        const supportGem = this.getSupportGemById(gem.id);
        return {
            icon: supportGem ? supportGem.short : 'S',
            name: supportGem ? supportGem.name : 'Unknown Support',
            typeLabel: 'Support'
        };
    }

    getSkillGemDescription(gem) {
        if (!gem) return 'Unknown gem.';

        if (gem.type === 'active') {
            const activeSkill = this.getActiveSkillById(gem.id);
            if (!activeSkill) return 'Unknown active gem.';
            const tileData = this.getTileDataForEffect(activeSkill.tileEffect);
            const modeLabel = activeSkill.mode === 'damage' ? 'Deals damage' : (activeSkill.mode === 'heal' ? 'Restores health' : 'Generates loot');
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
        const lootText = support.lootFlat ? `+${support.lootFlat} flat loot` : null;
        const echoText = support.extraHitChance ? `${Math.round(support.extraHitChance * 100)}% chance for echo hit` : null;
        return [thresholdText, powerText, healText, lootText, echoText].filter(Boolean).join('. ') + '.';
    }

    openSkillGemPopup(gem, inventoryIndex) {
        if (!this.skillsGemModal || !gem) return;
        this.selectedSkillGem = gem;
        this.selectedGemInventoryIndex = inventoryIndex;

        const display = this.getSkillGemDisplay(gem);
        const description = this.getSkillGemDescription(gem);

        this.skillsGemModalIcon.setText(display.icon);
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
            this.equipGemToActiveSlot(target.slotIndex, gem);
        } else if (target.kind === 'support') {
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
            slotUI.iconText.setText(tileData ? tileData.icon : '◆');
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
                    tile.nameText.setVisible(false);
                    tile.typeText.setVisible(false);
                    return;
                }

                tile.tileBg.setVisible(true);
                tile.iconText.setVisible(true);
                tile.nameText.setVisible(true);
                tile.typeText.setVisible(true);

                tile.tileBg.x = tile.homeX;
                tile.tileBg.y = tile.homeY;
                tile.iconText.x = tile.homeX;
                tile.iconText.y = tile.homeY;
                tile.nameText.x = tile.homeX;
                tile.nameText.y = tile.homeY + 33;
                tile.typeText.x = tile.homeX;
                tile.typeText.y = tile.homeY + 55;

                const display = this.getSkillGemDisplay(gem);
                tile.iconText.setText(display.icon);
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
        const bonusLoot = supports.reduce((sum, gem) => sum + (gem.lootFlat || 0), 0);
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

        if (activeSkill.mode === 'loot') {
            result.lootAmount += rolledPower + bonusLoot;
            this.addCombatLog(
                `${activeSkill.name} cast loot +${rolledPower + bonusLoot}${supportNames}`,
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
        // Positioned between HUD panels and the grid
        const bg = this.add.rectangle(195, 255, 386, 46, 0x111111, 0.9).setOrigin(0.5);
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

        const logTopY = 238;
        const lineHeight = 14;

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
            loot: 'Loot Find',
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
            loot: 0,
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

        if (this.talentStatBonuses) {
            Object.entries(this.talentStatBonuses).forEach(([stat, bonus]) => {
                if (bonus > 0 && totals[stat] !== undefined) totals[stat] += bonus;
            });
        }

        return totals;
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
        return charBonuses.energyShield + gear.energyShield;
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
        const levelScale = 1 + (itemLevel - 1) * 0.12;
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

        // Weights shift smoothly with score
        const weights = {
            Normal:    Math.max(5,  70 - s * 0.8),
            Magic:     Math.min(45, 10 + s * 0.45),
            Rare:      Math.min(35, Math.max(0, (s - 30) * 0.45)),
            Legendary: Math.min(20, Math.max(0, (s - 60) * 0.25))
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
        const dropChance = Phaser.Math.Clamp(0.10 + lootAmount / 90 + gear.loot / 120, 0, 0.85);

        if (Math.random() > dropChance) return;

        const item = this.generateItem();
        if (this.addItemToInventory(item)) {
            this.addCombatLog(`Loot Drop: ${item.rarity} ${item.name}`, item.rarityTextColor);
        }
    }

    rollRarityWithLootBonus() {
        const gear = this.getEquippedStatTotals();
        const lootPower = this.player.loot + gear.loot;
        const tierShift = Math.floor(lootPower / 120);
        const meterBonus = Math.floor(this.lootMeter / 20);

        const weights = {
            Normal: Math.max(5, 60 - tierShift * 5 - meterBonus * 6),
            Magic: Math.min(50, 25 + tierShift * 2 + meterBonus * 2),
            Rare: Math.min(40, 12 + tierShift * 2 + meterBonus * 3),
            Legendary: Math.min(25, 3 + tierShift + meterBonus * 2)
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
            loot: 0.5,
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
        this.hudContainer.add(this.add.text(leftCX, 14, 'Hero', { fontSize: '17px', color: '#fff', fontStyle: 'bold' }).setOrigin(0.5));
        this.playerAvatar = this.add.text(leftCX, 72, PLAYER_AVATAR, { fontSize: '52px' }).setOrigin(0.5);
        this.hudContainer.add(this.playerAvatar);
        // --- Energy Shield bar (above HP) ---
        this.playerShieldLabel = this.add.text(14, 108, 'ES', { fontSize: '9px', color: '#66aaff' });
        this.hudContainer.add(this.playerShieldLabel);
        this.playerShieldBarBg = this.add.rectangle(14, 117, barW, 8, 0x333344).setOrigin(0, 0.5);
        this.hudContainer.add(this.playerShieldBarBg);
        this.playerShieldBar = this.add.rectangle(14, 117, 0, 8, 0x3388ff).setOrigin(0, 0.5);
        this.hudContainer.add(this.playerShieldBar);
        this.playerShieldText = this.add.text(14 + barW / 2, 117, '', { fontSize: '7px', color: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5);
        this.hudContainer.add(this.playerShieldText);
        // --- HP bar ---
        this.hudContainer.add(this.add.text(14, 123, 'HP', { fontSize: '11px', color: '#aaa' }));
        this.playerHealthBarBg = this.add.rectangle(14, 134, barW, 12, 0x444444).setOrigin(0, 0.5);
        this.hudContainer.add(this.playerHealthBarBg);
        this.playerHealthBar = this.add.rectangle(14, 134, barW, 12, 0x00cc00).setOrigin(0, 0.5);
        this.hudContainer.add(this.playerHealthBar);
        // --- Enemy panel (right) ---
        this.hudContainer.add(this.add.rectangle(rightCX, panelH / 2 + 4, panelW, panelH, 0x111111, 0.9).setOrigin(0.5));
        this.enemyNameText = this.add.text(rightCX, 14, this.currentMonsterName, { fontSize: '15px', color: '#fff', fontStyle: 'bold' }).setOrigin(0.5);
        this.hudContainer.add(this.enemyNameText);
        this.enemyAvatar = this.add.text(rightCX, 72, this.currentMonsterAvatar, { fontSize: '52px' }).setOrigin(0.5);
        this.hudContainer.add(this.enemyAvatar);
        this.hudContainer.add(this.add.text(210, 120, 'HP', { fontSize: '11px', color: '#aaa' }));
        this.enemyHealthBarBg = this.add.rectangle(210, 131, barW, 12, 0x444444).setOrigin(0, 0.5);
        this.hudContainer.add(this.enemyHealthBarBg);
        this.enemyHealthBar = this.add.rectangle(210, 131, barW, 12, 0xff0000).setOrigin(0, 0.5);
        this.hudContainer.add(this.enemyHealthBar);
        // --- Loot Meter (under player HP bar) ---
        const lmW = barW;
        const lmH = 10;
        const lmX = 14;
        const lmY = 155;
        this.lootMeterLabel = this.add.text(lmX, lmY - 10, 'LOOT', { fontSize: '9px', color: '#ffd966', fontStyle: 'bold' }).setOrigin(0, 0.5);
        this.lootMeterBarBg = this.add.rectangle(lmX, lmY, lmW, lmH, 0x333333).setOrigin(0, 0.5);
        this.lootMeterBar = this.add.rectangle(lmX, lmY, 0, lmH, 0xffd966).setOrigin(0, 0.5);
        this.lootMeterText = this.add.text(lmX + lmW / 2, lmY, '0%', { fontSize: '8px', color: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5);
        this.hudContainer.add([this.lootMeterLabel, this.lootMeterBarBg, this.lootMeterBar, this.lootMeterText]);

        this.createEquipmentScreen();
        this.createSkillsScreen();
        this.createTalentScreen();
        this.createEquipmentButton(leftCX - 46, 210);
        this.createSkillsButton(leftCX + 46, 210);
        this.createTalentButton(rightCX - 46, 210);

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
                fontSize: '11px',
                color: '#ffffff',
                fontStyle: 'bold',
                align: 'center',
                wordWrap: { width: cardWidth - 10, useAdvancedWrap: true }
            }).setOrigin(0.5);
            const rarity = this.add.text(centerX, centerY - 32, '', {
                fontSize: '10px',
                color: '#ffffff'
            }).setOrigin(0.5);
            const stats = this.add.text(centerX, centerY + 0, '', {
                fontSize: '9px',
                color: '#ffd966',
                align: 'center',
                wordWrap: { width: cardWidth - 10, useAdvancedWrap: true }
            }).setOrigin(0.5);
            const equippedLabel = this.add.text(centerX, centerY + 44, '', {
                fontSize: '8px',
                color: '#bbbbbb',
                align: 'center',
                wordWrap: { width: cardWidth - 10, useAdvancedWrap: true }
            }).setOrigin(0.5);
            const compareLines = [];
            for (let li = 0; li < 5; li++) {
                const cl = this.add.text(centerX, centerY + 56 + li * 11, '', {
                    fontSize: '9px',
                    color: '#8aff8a',
                    align: 'center',
                    wordWrap: { width: cardWidth - 10, useAdvancedWrap: true }
                }).setOrigin(0.5);
                compareLines.push(cl);
            }

            const equipBtn = this.add.text(centerX - 28, centerY + 108, 'Equip', {
                fontSize: '11px',
                color: '#111111',
                backgroundColor: '#5aff9c',
                padding: { left: 5, right: 5, top: 3, bottom: 3 }
            }).setOrigin(0.5).setInteractive({ useHandCursor: true });

            const stashBtn = this.add.text(centerX + 30, centerY + 108, 'Stash', {
                fontSize: '11px',
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
        this.boardContainer.setVisible(false);
        this.hudContainer.setVisible(false);
        if (this.skillBarContainer) this.skillBarContainer.setVisible(false);
        if (this.equipmentScreenGroup) this.equipmentScreenGroup.setVisible(false);
        if (this.skillsScreenGroup) this.skillsScreenGroup.setVisible(false);
        if (this.talentScreenGroup) this.talentScreenGroup.setVisible(false);
        this.rewardScreenGroup.setVisible(true);
        this.setGameBoardActive(false);
        this.closeInventoryItemPopup();

        const gear = this.getEquippedStatTotals();
        const lootPower = this.player.loot + gear.loot;
        const meterPct = Math.floor((this.lootMeter / this.lootMeterMax) * 100);
        // lootScore combines battle progression, loot meter, and gear loot stat
        const lootScore = this.battleNumber * 10 + this.lootMeter * 0.5 + Math.floor(lootPower / 10);
        this.rewardLootInfoText.setText(`Loot Score: ${Math.floor(lootScore)} | Meter: ${meterPct}%`);

        this.rewardChoices = [];
        for (let i = 0; i < 3; i++) {
            this.rewardChoices.push(this.generateLoot(lootScore));
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
                    return { text: `${label}: +${newVal}`, color: '#cccccc' };
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
        this.lootMeter = 0;
        const monsterIndex = Phaser.Math.Between(0, MONSTER_AVATARS.length - 1);
        this.currentMonsterAvatar = MONSTER_AVATARS[monsterIndex];
        this.currentMonsterName = MONSTER_NAMES[monsterIndex];

        this.enemy.maxHealth = 200 + (this.battleNumber - 1) * 40;
        this.enemy.health = this.enemy.maxHealth;
        this.enemy.attack = 12 + (this.battleNumber - 1) * 3;

        if (this.enemyAvatar) {
            this.enemyAvatar.setText(this.currentMonsterAvatar);
            this.enemyAvatar.setAlpha(1);
            this.enemyAvatar.setAngle(0);
            this.enemyAvatar.setY(72);
        }

        if (this.enemyNameText) {
            this.enemyNameText.setText(`${this.currentMonsterName} Lv.${this.battleNumber}`);
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
        this.addCombatLog(`A new enemy appears: ${this.currentMonsterName} (Battle ${this.battleNumber})`, '#ffcc66');
        this.addCombatLog(`Talent point earned! (${this.player.talentPoints} available)`, '#ffd700');
    }

    createEquipmentButton(x, y) {
        this.equipmentButton = this.add.text(x, y, 'Equipment', {
            fontSize: '14px',
            color: '#00ffcc',
            backgroundColor: '#333333',
            padding: { left: 8, right: 8, top: 4, bottom: 4 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        this.hudContainer.add(this.equipmentButton);

        this.equipmentButton.on('pointerup', () => {
            this.showEquipmentScreen();
        });
    }

    createSkillsButton(x, y) {
        this.skillsButton = this.add.text(x, y, 'Skills', {
            fontSize: '14px',
            color: '#ffd56b',
            backgroundColor: '#333333',
            padding: { left: 10, right: 10, top: 4, bottom: 4 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        this.hudContainer.add(this.skillsButton);

        this.skillsButton.on('pointerup', () => {
            this.showSkillsScreen();
        });
    }

    createTalentButton(x, y) {
        this.talentButton = this.add.text(x, y, 'Talents', {
            fontSize: '14px',
            color: '#ffd700',
            backgroundColor: '#333333',
            padding: { left: 8, right: 8, top: 4, bottom: 4 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        this.hudContainer.add(this.talentButton);
        this.talentButton.on('pointerup', () => {
            this.showTalentScreen();
        });
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
        this.boardContainer.setVisible(false);
        this.hudContainer.setVisible(false);
        if (this.skillBarContainer) this.skillBarContainer.setVisible(false);
        this.setGameBoardActive(false);
        this.refreshTalentScreenUI();
    }

    getTalentNodeScreenPos(node) {
        if (!node) return { x: 0, y: 0 };
        return {
            x: 39 + (node.col - 9) * 52,
            y: 115 + (node.row - 3) * 70
        };
    }

    isTalentAvailable(node) {
        if (!node) return false;
        return node.prereqs.every(id => this.allocatedTalents.has(id))
            && node.deps.every(id => this.allocatedTalents.has(id));
    }

    allocateTalent(nodeId) {
        const node = TALENT_TREE_NODES.find(n => n.id === nodeId);
        if (!node) return;

        if (this.allocatedTalents.has(nodeId)) {
            this.addCombatLog(`${node.name} already learned.`, '#888888');
            return;
        }

        if (!this.isTalentAvailable(node)) {
            const missingIds = [...node.prereqs, ...node.deps].filter(id => !this.allocatedTalents.has(id));
            const missingNames = missingIds.map(id => {
                const n = TALENT_TREE_NODES.find(n2 => n2.id === id);
                return n ? n.name : '?';
            });
            this.addCombatLog(`Requires: ${missingNames.join(', ')}`, '#ff8888');
            return;
        }

        if (this.player.talentPoints <= 0) {
            this.addCombatLog('No talent points — defeat an enemy to earn one!', '#ff8888');
            return;
        }

        this.player.talentPoints -= 1;
        this.allocatedTalents.add(nodeId);

        if (node.stat === 'strength' || node.stat === 'intelligence' || node.stat === 'dexterity') {
            this.player[node.stat] = (this.player[node.stat] || 0) + node.amount;
        } else {
            this.talentStatBonuses[node.stat] = (this.talentStatBonuses[node.stat] || 0) + node.amount;
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

        const title = this.add.text(width / 2, 28, 'Talent Tree', {
            fontSize: '22px', color: '#ffd700', fontStyle: 'bold'
        }).setOrigin(0.5);

        const subtitle = this.add.text(width / 2, 52, 'Tap a node to allocate a talent point', {
            fontSize: '11px', color: '#b8a860'
        }).setOrigin(0.5);

        this.talentPointsLabel = this.add.text(width / 2, 74, 'Points: 0', {
            fontSize: '14px', color: '#ffffff', fontStyle: 'bold'
        }).setOrigin(0.5);

        const backBtn = this.add.text(12, 10, '← Back', {
            fontSize: '14px', color: '#00ffcc', backgroundColor: '#1a1a2e',
            padding: { left: 8, right: 8, top: 4, bottom: 4 }
        }).setOrigin(0, 0).setInteractive({ useHandCursor: true });
        backBtn.on('pointerup', () => this.showGameScreen());

        this.talentScreenGroup.add([bg, panel, title, subtitle, this.talentPointsLabel, backBtn]);

        // Graphics layer for connection lines (drawn below nodes)
        this.talentConnectionGraphics = this.add.graphics();
        this.talentScreenGroup.add(this.talentConnectionGraphics);

        // Build node UI elements
        this.talentNodeUI = {};
        const nodeRadius = 26;

        TALENT_TREE_NODES.forEach(node => {
            const { x, y } = this.getTalentNodeScreenPos(node);

            const glow = this.add.circle(x, y, nodeRadius + 8, 0xffd700, 0.12).setAlpha(0);
            const circle = this.add.circle(x, y, nodeRadius, 0x111122, 1)
                .setStrokeStyle(2, 0x333355, 1)
                .setInteractive({ useHandCursor: true });

            const iconText = this.add.text(x, y - 5, node.icon, { fontSize: '18px' }).setOrigin(0.5);

            const nameText = this.add.text(x, y + nodeRadius + 4, node.name, {
                fontSize: '9px', color: '#888899', align: 'center',
                wordWrap: { width: 68, useAdvancedWrap: true }
            }).setOrigin(0.5, 0);

            const effectText = this.add.text(x, y + nodeRadius + 17, node.shortDesc, {
                fontSize: '8px', color: '#666677', align: 'center'
            }).setOrigin(0.5, 0);

            circle.on('pointerup', () => this.allocateTalent(node.id));

            this.talentNodeUI[node.id] = { circle, glow, iconText, nameText, effectText };
            this.talentScreenGroup.add([glow, circle, iconText, nameText, effectText]);
        });

        this.refreshTalentScreenUI();
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
                const fp = this.getTalentNodeScreenPos(fromNode);
                const tp = this.getTalentNodeScreenPos(toNode);
                const fromAlloc = this.allocatedTalents.has(conn.from);
                const toAlloc   = this.allocatedTalents.has(conn.to);
                const color = (fromAlloc && toAlloc) ? 0xffd700
                            : (fromAlloc || toAlloc) ? 0x887733
                            : 0x2a2a3a;
                const alpha = (fromAlloc && toAlloc) ? 0.9
                            : (fromAlloc || toAlloc) ? 0.55
                            : 0.3;
                this.talentConnectionGraphics.lineStyle(3, color, alpha);
                this.talentConnectionGraphics.beginPath();
                this.talentConnectionGraphics.moveTo(fp.x, fp.y);
                this.talentConnectionGraphics.lineTo(tp.x, tp.y);
                this.talentConnectionGraphics.strokePath();
            });
        }

        // Update node visuals
        Object.entries(this.talentNodeUI).forEach(([idStr, ui]) => {
            const nodeId = parseInt(idStr);
            const node = TALENT_TREE_NODES.find(n => n.id === nodeId);
            if (!node || !ui) return;

            const isAllocated  = this.allocatedTalents.has(nodeId);
            const isUnlockable = !isAllocated && this.isTalentAvailable(node);
            const isAvailable  = isUnlockable && this.player.talentPoints > 0;

            if (isAllocated) {
                ui.circle.setFillStyle(0x2e2200, 1).setStrokeStyle(2, 0xffd700, 1);
                ui.glow.setAlpha(0.5);
                ui.iconText.setAlpha(1);
                ui.nameText.setColor('#ffd700');
                ui.effectText.setColor('#ccaa44');
            } else if (isAvailable) {
                ui.circle.setFillStyle(0x142035, 1).setStrokeStyle(2, 0x6699ff, 1);
                ui.glow.setAlpha(0.25);
                ui.iconText.setAlpha(1);
                ui.nameText.setColor('#88aaff');
                ui.effectText.setColor('#6677bb');
            } else if (isUnlockable) {
                ui.circle.setFillStyle(0x101a28, 1).setStrokeStyle(2, 0x334466, 1);
                ui.glow.setAlpha(0);
                ui.iconText.setAlpha(0.65);
                ui.nameText.setColor('#556688');
                ui.effectText.setColor('#3a4455');
            } else {
                ui.circle.setFillStyle(0x0a0a15, 1).setStrokeStyle(2, 0x222233, 1);
                ui.glow.setAlpha(0);
                ui.iconText.setAlpha(0.3);
                ui.nameText.setColor('#333344');
                ui.effectText.setColor('#222233');
            }
        });
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

        const loadoutStartY = 140;
        const rowSpacing = 112;
        const activeX = 84;
        const supportStartX = 184;
        const supportGapX = 54;
        this.skillsActiveSlotUI = [];

        for (let slotIndex = 0; slotIndex < 3; slotIndex++) {
            const centerX = activeX;
            const centerY = loadoutStartY + slotIndex * rowSpacing;
            const mainRadius = 36;

            const cardBg = this.add.circle(centerX, centerY, mainRadius, 0x202020, 1)
                .setStrokeStyle(2, 0xffffff, 1)
                .setInteractive({ useHandCursor: true });
            const cardLabel = this.add.text(centerX, centerY - 56, `Skill ${slotIndex + 1}`, {
                fontSize: '11px',
                color: '#d9d9d9'
            }).setOrigin(0.5);
            const iconText = this.add.text(centerX, centerY - 10, '', {
                fontSize: '24px'
            }).setOrigin(0.5);
            const nameText = this.add.text(centerX, centerY + 21, '', {
                fontSize: '9px',
                color: '#ffffff',
                fontStyle: 'bold',
                wordWrap: { width: 74, useAdvancedWrap: true },
                align: 'center'
            }).setOrigin(0.5);
            const chargeText = this.add.text(centerX + 2, centerY + 56, '', {
                fontSize: '10px',
                color: '#cccccc'
            }).setOrigin(0.5);

            const supportSockets = [];
            for (let socketIndex = 0; socketIndex < 3; socketIndex++) {
                const socketX = supportStartX + socketIndex * supportGapX;
                const socketY = centerY;
                const connector = this.add.line(centerX, centerY, 0, 0, socketX - centerX, socketY - centerY, 0x8b8b8b, 0.75)
                    .setLineWidth(1, 1);
                const socketRadius = 12;
                const socketBg = this.add.circle(socketX, socketY, socketRadius, 0x2f2f2f, 1)
                    .setStrokeStyle(1, 0x808080, 1)
                    .setInteractive({ useHandCursor: true });
                const socketText = this.add.text(socketX, socketY, '-', {
                    fontSize: '8px',
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
                nameText,
                chargeText,
                supportSockets,
                mainCenter: { x: centerX, y: centerY },
                mainRadius
            });
            this.skillsScreenGroup.add([cardBg, cardLabel, iconText, nameText, chargeText]);
        }

        const inventoryPanel = this.add.rectangle(width / 2, 632, width - 26, 250, 0x1c1c1c, 1)
            .setStrokeStyle(1, 0x666666, 1);
        const inventoryTitle = this.add.text(width / 2, 515, 'Gem Inventory', {
            fontSize: '16px',
            color: '#7ee8ff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        this.selectedGemLabel = this.add.text(width / 2, 536, 'Selected: none', {
            fontSize: '11px',
            color: '#bbbbbb'
        }).setOrigin(0.5);

        this.skillsScreenGroup.add([inventoryPanel, inventoryTitle, this.selectedGemLabel]);

        this.skillsInventoryTiles = [];
        const cols = 5;
        const rows = 2;
        const cellW = 68;
        const cellH = 92;
        const gapX = 6;
        const gapY = 8;
        const gridStartX = (width - (cols * cellW + (cols - 1) * gapX)) / 2;
        const gridStartY = 554;

        let gemIndex = 0;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const tileIndex = gemIndex;
                const gem = this.skillsInventoryGems[tileIndex];
                const x = gridStartX + col * (cellW + gapX);
                const y = gridStartY + row * (cellH + gapY);
                const centerX = x + cellW / 2;
                const centerY = y + 27;

                const tileBg = this.add.circle(centerX, centerY, 25, 0x292929, 1)
                    .setStrokeStyle(2, 0x666666, 1)
                    .setInteractive({ useHandCursor: true });
                const iconText = this.add.text(centerX, centerY, '', {
                    fontSize: '24px'
                }).setOrigin(0.5);
                const nameText = this.add.text(centerX, y + 60, '', {
                    fontSize: '9px',
                    color: '#ffffff',
                    align: 'center',
                    wordWrap: { width: cellW - 8, useAdvancedWrap: true }
                }).setOrigin(0.5);
                const typeText = this.add.text(centerX, y + 82, '', {
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
                    nameText.x = dragX;
                    nameText.y = dragY + 33;
                    typeText.x = dragX;
                    typeText.y = dragY + 55;
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
                    nameText,
                    typeText,
                    index: tileIndex,
                    homeX: centerX,
                    homeY: centerY,
                    gem
                });
                this.skillsScreenGroup.add([tileBg, iconText, nameText, typeText]);
                gemIndex += 1;
            }
        }

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

        const slotsHeader = this.add.text(topCenterX, 84, 'Loadout', { fontSize: '15px', color: '#00ffcc', fontStyle: 'bold' }).setOrigin(0.5);
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
            { key: 'ring1', label: 'Ring 1', x: topCenterX + 108, y: topPanelTopY + 196 },
            { key: 'ring2', label: 'Ring 2', x: topCenterX + 146, y: topPanelTopY + 236 },
            { key: 'boots', label: 'Boots', x: topCenterX, y: topPanelTopY + 236 }
        ];

        this.equipmentText = {};
        this.equipmentIconText = {};
        this.equipmentSlotFrames = {};
        this.equipmentSlotGhostIcons = {};
        this.equipmentSlotShells = {};
        this.equipmentSlotGlows = {};
        this.equipmentSlotLabels = {};

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
            const slotLabel = this.add.text(slot.x, slot.y - slotSize / 2 + 9, slot.label, { fontSize: '9px', color: '#9cb7c7' }).setOrigin(0.5, 0.5);

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
            this.equipmentSlotLabels[slot.key] = slotLabel;

            this.equipmentScreenGroup.add([slotGlow, slotBg, slotImageBg, slotGhostIcon, slotIcon, slotLabel]);
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
                fontSize: '8px',
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
            fontSize: '16px',
            color: '#ffdd44',
            fontStyle: 'bold'
        }).setOrigin(0.5, 0);
        this.inventoryModalFrame = this.add.rectangle(width / 2, height / 2 - 162, 46, 46, 0x1f1f1f, 1).setStrokeStyle(2, 0x888888);
        this.inventoryModalIcon = this.add.text(width / 2, height / 2 - 162, '', { fontSize: '24px' }).setOrigin(0.5);
        this.inventoryModalName = this.add.text(width / 2, height / 2 - 130, '', {
            fontSize: '14px',
            color: '#ffffff',
            fontStyle: 'bold',
            wordWrap: { width: 340, useAdvancedWrap: true },
            align: 'center'
        }).setOrigin(0.5);
        this.inventoryModalSlotBadge = this.add.text(width / 2, height / 2 - 110, '', {
            fontSize: '11px',
            color: '#111111',
            backgroundColor: '#8bb7ff',
            padding: { left: 7, right: 7, top: 3, bottom: 3 }
        }).setOrigin(0.5);
        this.inventoryModalType = this.add.text(width / 2, height / 2 - 92, '', {
            fontSize: '10px',
            color: '#00ffcc',
            align: 'center',
            wordWrap: { width: 340, useAdvancedWrap: true }
        }).setOrigin(0.5);

        const modalStatsDivider = this.add.rectangle(width / 2, height / 2 - 78, 340, 1, 0x444444, 1);

        // 8 pre-allocated per-stat comparison lines
        this.inventoryAffixLines = [];
        for (let li = 0; li < 8; li++) {
            const lineObj = this.add.text(width / 2, height / 2 - 68 + li * 18, '', {
                fontSize: '12px',
                color: '#ffd966',
                align: 'center',
                wordWrap: { width: 340, useAdvancedWrap: true }
            }).setOrigin(0.5).setVisible(false);
            this.inventoryAffixLines.push(lineObj);
        }

        this.inventoryAffixCompareLabel = this.add.text(width / 2, height / 2 + 80, '', {
            fontSize: '9px',
            color: '#888888',
            align: 'center',
            wordWrap: { width: 340, useAdvancedWrap: true }
        }).setOrigin(0.5);

        const closeModalBtn = this.add.text(width / 2 - 90, height / 2 + 158, 'Close', {
            fontSize: '14px',
            color: '#ffffff',
            backgroundColor: '#444444',
            padding: { left: 8, right: 8, top: 4, bottom: 4 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        const removeBtn = this.add.text(width / 2, height / 2 + 158, 'Unequip', {
            fontSize: '14px',
            color: '#ffffff',
            backgroundColor: '#a33d3d',
            padding: { left: 8, right: 8, top: 4, bottom: 4 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        const equipBtn = this.add.text(width / 2 + 90, height / 2 + 158, 'Equip', {
            fontSize: '14px',
            color: '#111111',
            backgroundColor: '#00ff99',
            padding: { left: 8, right: 8, top: 4, bottom: 4 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        modalOverlay.on('pointerup', () => this.closeInventoryItemPopup());
        closeModalBtn.on('pointerup', () => this.closeInventoryItemPopup());
        equipBtn.on('pointerup', () => this.equipSelectedInventoryItem());
        removeBtn.on('pointerup', () => this.removeSelectedEquippedItem());

        this.inventoryModalEquipBtn = equipBtn;
        this.inventoryModalRemoveBtn = removeBtn;

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
            equipBtn
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
        this.boardContainer.setVisible(false);
        this.hudContainer.setVisible(false);
        if (this.skillBarContainer) this.skillBarContainer.setVisible(false);
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
        this.boardContainer.setVisible(false);
        this.hudContainer.setVisible(false);
        if (this.skillBarContainer) this.skillBarContainer.setVisible(false);
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
        this.closeInventoryItemPopup();
        this.boardContainer.setVisible(true);
        this.hudContainer.setVisible(true);
        if (this.skillBarContainer) this.skillBarContainer.setVisible(true);
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
            if (this.equipmentSlotLabels[key]) {
                this.equipmentSlotLabels[key].setColor(offhandBlockedByBow ? '#eaf79b' : (equippedItem ? '#ffe08f' : '#9cb7c7'));
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
                return { text: `${label}:  +${newVal}`, color: '#cccccc' };
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
            this.inventoryModalTitle.setText(source === 'equipped' ? 'Equipped Item' : 'Inspect Item');
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
            const fraction = Phaser.Math.Clamp(this.player.health / 100, 0, 1);
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

        this.updateLootMeterUI();
    }

    addLootMeter(amount) {
        this.lootMeter = Math.min(this.lootMeterMax, this.lootMeter + amount);
        this.updateLootMeterUI();
    }

    updateLootMeterUI() {
        if (!this.lootMeterBar) return;
        const fraction = Phaser.Math.Clamp(this.lootMeter / this.lootMeterMax, 0, 1);
        const targetWidth = 160 * fraction;
        this.tweens.killTweensOf(this.lootMeterBar);
        this.tweens.add({
            targets: this.lootMeterBar,
            width: targetWidth,
            duration: 350,
            ease: 'Power2'
        });
        const pct = Math.floor(fraction * 100);
        if (this.lootMeterText) {
            this.lootMeterText.setText(`${pct}%`);
        }
        if (pct >= 75) {
            this.lootMeterBar.fillColor = 0xff7f11;
        } else if (pct >= 40) {
            this.lootMeterBar.fillColor = 0xffd166;
        } else {
            this.lootMeterBar.fillColor = 0xffd966;
        }
    }

    updateEnemyUI() {
        if (this.enemyHealthBar) {
            const fraction = Phaser.Math.Clamp(this.enemy.health / this.enemy.maxHealth, 0, 1);
            const targetWidth = 166 * fraction;
            const targetColor = (fraction > 0.5 ? 0xff5555 : (fraction > 0.25 ? 0xffcc00 : 0xff0000));
            this.tweens.killTweensOf(this.enemyHealthBar);
            this.tweens.add({
                targets: this.enemyHealthBar,
                width: targetWidth,
                duration: 300,
                ease: 'Power2'
            });
            this.enemyHealthBar.fillColor = targetColor;
        }
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

    handleEnemyDeath() {
        const centerX = GRID_OFFSET_X + (GRID_WIDTH * TILE_SIZE) / 2;
        const centerY = 210;

        if (this.enemyAvatar) {
            this.tweens.add({
                targets: this.enemyAvatar,
                y: this.enemyAvatar.y + 40,
                angle: 90,
                alpha: 0.4,
                duration: 600,
                ease: 'Power2',
            });
        }

        const deathAnim = this.add.text(centerX, centerY, '💀', { fontSize: '80px', color: '#ff0000', stroke: '#000000', strokeThickness: 4 }).setOrigin(0.5);
        this.time.delayedCall(200, () => {
            this.tweens.add({
                targets: deathAnim,
                y: centerY + 80,
                alpha: 0,
                duration: 900,
                ease: 'Power2',
                onComplete: () => deathAnim.destroy()
            });
        });
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
                    type = Phaser.Math.Between(0, TILE_TYPES.length - 1);
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
            this.time.delayedCall(800, () => {
                this.clearMatches(matchData.matched, matchData.runs, matchData.lShapes);
                this.applyGravity();
            });
        } else {
            this.time.delayedCall(800, () => {
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
        let lootMeterGain = 0;
        const matchCounts = {
            physical: 0,
            magic: 0,
            ranged: 0,
            health: 0,
            loot: 0
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
                // Gold tiles charge loot meter on any match (including 3s)
                if (effect === 'loot') {
                    lootMeterGain += 3;
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

        // --- 4 and 5-row combos: crit damage / heal / loot boost ---
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
                    const baseDmg = 12 + gear.physical * 2 + charBonuses.physicalDamageBonus;
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
                    const baseDmg = 14 + gear.magic * 2 + charBonuses.magicDamageBonus;
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
                    const baseDmg = 10 + gear.ranged * 2 + charBonuses.rangedDamageBonus;
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
                case 'loot': {
                    const baseLoot = is5 ? 25 : 12;
                    lootMeterGain += baseLoot;
                    this.spawnComboTierEffect(center.x, center.y, run.color, run.length, baseLoot);
                    this.addCombatLog(`${comboLabel} 🪙 Loot Meter +${baseLoot}`, '#ffd966');
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

        // Apply loot meter gains
        if (lootMeterGain > 0) {
            this.addLootMeter(lootMeterGain);
            this.addCombatLog(`Loot Meter +${lootMeterGain}`, '#ffd966');
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
            this.enemy.health = Math.max(0, this.enemy.health - totalEnemyDamage);
            this.showCombatMessage(`Enemy -${totalEnemyDamage}`, '#ff5555', GRID_OFFSET_X + (GRID_WIDTH * TILE_SIZE) / 2, GRID_OFFSET_Y - 15);

            if (this.enemy.health <= 0) {
                this.enemy.health = 0;
                this.handleEnemyDeath();
                if (!this.awaitingRewardChoice) {
                    this.awaitingRewardChoice = true;
                    this.time.delayedCall(850, () => this.showRewardScreen());
                }
                this.isSwapping = true;
            }
        }

        if (totalPlayerHeal > 0) {
            this.player.health = Math.min(500, this.player.health + totalPlayerHeal);
            this.showCombatMessage(`Hero +${totalPlayerHeal}`, '#55ff55', GRID_OFFSET_X + (GRID_WIDTH * TILE_SIZE) / 2, GRID_OFFSET_Y + 20);
        }

        this.enemy.health = Math.max(0, this.enemy.health);
        this.player.health = Math.min(500, this.player.health);

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
                    const type = Phaser.Math.Between(0, TILE_TYPES.length - 1);
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
                        duration: 500,
                        ease: 'Power2'
                    })
                );
            }
        });

        // After existing tiles fall, re-render to add new tiles, then animate them
        this.time.delayedCall(100, () => {
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
                        duration: 400,
                        ease: 'Power2'
                    });
                }

                if (sprite && sprite.icon) {
                    this.tweens.add({
                        targets: sprite.icon,
                        y: toWorldY,
                        duration: 400,
                        ease: 'Power2'
                    });
                }
            });

            // Check for cascading matches after new tiles fall
            this.time.delayedCall(450, () => {
                const matchData = this.findMatchData();
                if (matchData.matched.length > 0) {
                    this.time.delayedCall(800, () => {
                        this.clearMatches(matchData.matched, matchData.runs, matchData.lShapes);
                        this.applyGravity();
                    });
                } else {
                    this.isSwapping = false;
                    // Enemy attacks only after player's turn is fully complete
                    if (this.enemy.health > 0) {
                        this.time.delayedCall(200, () => {
                            this.enemyAttack();
                        });
                    }
                }
            });
        });
    }

    enemyAttack() {
        if (this.enemy.health <= 0 || this.awaitingRewardChoice) return;
        const gear = this.getEquippedStatTotals();
        const charBonuses = this.getCharacterStatBonuses();

        // Evasion check (DEX + gear evasion)
        const totalEvasionChance = Math.min(75, charBonuses.evasionChance + gear.evasion * 0.3);
        if (Math.random() * 100 < totalEvasionChance) {
            this.addCombatLog(`Evaded enemy attack! (${totalEvasionChance.toFixed(0)}% evasion)`, '#00ffcc');
            this.showCombatMessage('EVADE!', '#00ffcc', GRID_OFFSET_X + (GRID_WIDTH * TILE_SIZE) / 2, GRID_OFFSET_Y + GRID_HEIGHT * TILE_SIZE - 20);
            this.updatePlayerUI();
            return;
        }

        const damage = this.enemy.attack;
        const totalArmor = gear.armor + charBonuses.armorBonus;
        const armorReduction = Math.floor(totalArmor / 4);
        let remainingDamage = Math.max(1, damage - armorReduction);

        // Energy shield pool absorbs damage first, overflow goes to health
        let shieldAbsorbed = 0;
        if (this.player.currentShield > 0 && remainingDamage > 0) {
            shieldAbsorbed = Math.min(remainingDamage, this.player.currentShield);
            this.player.currentShield -= shieldAbsorbed;
            remainingDamage -= shieldAbsorbed;
        }

        this.player.health -= remainingDamage;
        if (this.player.health < 0) this.player.health = 0;
        const shieldMsg = shieldAbsorbed > 0 ? `, ${shieldAbsorbed} absorbed by shield` : '';
        this.addCombatLog(`Enemy Attack: -${remainingDamage} HP (${armorReduction} blocked${shieldMsg})`, '#ff6666');
        const totalTaken = remainingDamage + shieldAbsorbed;
        this.showCombatMessage(`Hero -${totalTaken}`, '#ff4444', GRID_OFFSET_X + (GRID_WIDTH * TILE_SIZE) / 2, GRID_OFFSET_Y + GRID_HEIGHT * TILE_SIZE - 20);
        this.updatePlayerUI();
        if (this.player.health <= 0) {
            this.add.text(GRID_OFFSET_X + (GRID_WIDTH * TILE_SIZE) / 2, GRID_OFFSET_Y + (GRID_HEIGHT * TILE_SIZE) / 2, 'Game Over', { fontSize: '48px', color: '#ff0000', fontStyle: 'bold' }).setOrigin(0.5);
            this.isSwapping = true;
        }
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

const config = {
    type: Phaser.AUTO,
    width: 390,
    height: 780,
    backgroundColor: '#2c3e50',
    scene: Match3Scene
};

const game = new Phaser.Game(config);
