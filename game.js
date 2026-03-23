const GRID_WIDTH = 6;
const GRID_HEIGHT = 6;
const TILE_SIZE = 60;
const GRID_OFFSET_X = 15;
const GRID_OFFSET_Y = 418;

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
    { name: 'Common', weight: 60, affixes: 1, statMultiplier: 1.0, frameColor: 0xa3a3a3, textColor: '#d0d0d0' },
    { name: 'Magic', weight: 25, affixes: 2, statMultiplier: 1.15, frameColor: 0x5aa9ff, textColor: '#8ec5ff' },
    { name: 'Rare', weight: 12, affixes: 4, statMultiplier: 1.35, frameColor: 0xffd166, textColor: '#ffe08f' },
    { name: 'Legendary', weight: 3, affixes: 6, statMultiplier: 1.65, frameColor: 0xff7f11, textColor: '#ffb35c' }
];

const ITEM_BASES = [
    { slotGroup: 'helmet', type: 'Helmet', baseName: 'Helm', icon: '🪖', description: 'Headgear built for close combat.', baseStats: { armor: 3 } },
    { slotGroup: 'chest', type: 'Chest', baseName: 'Cuirass', icon: '🦺', description: 'Body armor that absorbs heavy strikes.', baseStats: { armor: 5, health: 6 } },
    { slotGroup: 'gloves', type: 'Gloves', baseName: 'Gauntlets', icon: '🧤', description: 'Grip and control for weapon handling.', baseStats: { physical: 2 } },
    { slotGroup: 'boots', type: 'Boots', baseName: 'Greaves', icon: '🥾', description: 'Footwear built for stability and speed.', baseStats: { ranged: 2, armor: 1 } },
    { slotGroup: 'belt', type: 'Belt', baseName: 'Warbelt', icon: '🧷', description: 'Carries supplies and reinforces stance.', baseStats: { health: 8 } },
    { slotGroup: 'mainhand', type: 'Weapon', baseName: 'Blade', icon: '🗡️', description: 'Main offensive weapon.', baseStats: { physical: 4 } },
    { slotGroup: 'offhand', type: 'Shield', baseName: 'Buckler', icon: '🛡️', description: 'Defensive off-hand protector.', baseStats: { armor: 4 } },
    { slotGroup: 'ring', type: 'Ring', baseName: 'Band', icon: '💍', description: 'A ring that channels focused power.', baseStats: { magic: 2 } },
    { slotGroup: 'necklace', type: 'Necklace', baseName: 'Amulet', icon: '📿', description: 'Necklace etched with ancient sigils.', baseStats: { magic: 3, ranged: 1 } }
];

const ITEM_PREFIXES = [
    { name: 'Brutal', stats: { physical: [2, 6] } },
    { name: 'Arcane', stats: { magic: [2, 6] } },
    { name: 'Deadeye', stats: { ranged: [2, 6] } },
    { name: 'Stalwart', stats: { armor: [2, 7] } },
    { name: 'Vital', stats: { health: [8, 20] } },
    { name: 'Prosperous', stats: { loot: [4, 14] } }
];

const ITEM_SUFFIXES = [
    { name: 'of Slaying', stats: { physical: [1, 5], magic: [1, 4] } },
    { name: 'of Focus', stats: { magic: [2, 7] } },
    { name: 'of Precision', stats: { ranged: [2, 7] } },
    { name: 'of Guarding', stats: { armor: [2, 8] } },
    { name: 'of Vitality', stats: { health: [10, 24] } },
    { name: 'of Fortune', stats: { loot: [5, 16] } }
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
            physical: 0,
            magic: 0,
            ranged: 0,
            loot: 0,
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
            }
        };
        this.enemy = {
            health: 200,
            maxHealth: 200,
            attack: 12
        };
        this.playerStatsText = null;
        this.playerAvatar = null;
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
    }

    create() {
        console.log('Scene created!');

        this.boardContainer = this.add.container(0, 0);
        this.hudContainer = this.add.container(0, 0);

        this.createGrid();
        this.renderGrid();
        this.createPlayerUI();
        this.createCombatLog();
        this.createRewardScreen();

        this.showGameScreen();
    }

    createCombatLog() {
        // Positioned between HUD panels and the grid
        const bg = this.add.rectangle(195, 391, 386, 46, 0x111111, 0.9).setOrigin(0.5);
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

        const logTopY = 370;
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
        const starter = [];
        for (let i = 0; i < 10; i++) {
            const forcedRarity = i < 6 ? 'Common' : (i < 9 ? 'Magic' : null);
            starter.push(this.generateItem(forcedRarity));
        }
        return starter;
    }

    getSlotLabel(slotGroup) {
        if (slotGroup === 'ring') return 'Ring (Either Slot)';
        return slotGroup.charAt(0).toUpperCase() + slotGroup.slice(1);
    }

    getStatLabel(stat) {
        const labels = {
            health: 'Health',
            physical: 'Physical',
            magic: 'Magic',
            ranged: 'Ranged',
            loot: 'Loot Find',
            armor: 'Armor'
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
            armor: 0
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

        return totals;
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

    rollAffixes(pool, count, multiplier, usedNames) {
        const affixes = [];

        while (affixes.length < count && usedNames.size < pool.length) {
            const affix = Phaser.Utils.Array.GetRandom(pool);
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
        const base = Phaser.Utils.Array.GetRandom(ITEM_BASES);
        const rarity = forcedRarity ? this.getRarityByName(forcedRarity) : this.rollRarity();
        const statMultiplier = rarity.statMultiplier;

        const prefixCount = Math.ceil(rarity.affixes / 2);
        const suffixCount = Math.floor(rarity.affixes / 2);
        const usedNames = new Set();

        const prefixes = this.rollAffixes(ITEM_PREFIXES, prefixCount, statMultiplier, usedNames);
        const suffixes = this.rollAffixes(ITEM_SUFFIXES, suffixCount, statMultiplier, usedNames);

        const totalStats = {};
        this.mergeStats(totalStats, base.baseStats);
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
            rarity: rarity.name,
            icon: base.icon,
            frameColor: rarity.frameColor,
            rarityTextColor: rarity.textColor,
            description: `${base.description} ${affixSummary}`.trim(),
            stats: totalStats,
            prefixes,
            suffixes
        };
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

        const weights = {
            Common: Math.max(10, 60 - tierShift * 5),
            Magic: Math.min(45, 25 + tierShift * 2),
            Rare: Math.min(35, 12 + tierShift * 2),
            Legendary: Math.min(20, 3 + tierShift)
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
        const equippedItem = targetSlot ? (this.equippedItems[targetSlot] || null) : null;

        if (!equippedItem) {
            return {
                targetSlot,
                equippedName: 'None equipped',
                compareLines: ['New slot item']
            };
        }

        const statKeys = new Set([
            ...Object.keys(item.stats || {}),
            ...Object.keys(equippedItem.stats || {})
        ]);

        const compareLines = Array.from(statKeys)
            .map(stat => {
                const nextValue = (item.stats && item.stats[stat]) || 0;
                const currentValue = (equippedItem.stats && equippedItem.stats[stat]) || 0;
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

        return {
            targetSlot,
            equippedName: equippedItem.name,
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

    createPlayerUI() {
        // Portrait layout: player LEFT, enemy RIGHT, both in top half above grid
        const leftCX = 97;
        const rightCX = 293;
        const panelW = 188;
        const panelH = 406;
        const barW = 166;

        // Divider line between panels
        this.hudContainer.add(this.add.rectangle(195, panelH / 2 + 4, 2, panelH, 0x444444, 1));

        // --- Player panel (left) ---
        this.hudContainer.add(this.add.rectangle(leftCX, panelH / 2 + 4, panelW, panelH, 0x111111, 0.9).setOrigin(0.5));
        this.hudContainer.add(this.add.text(leftCX, 14, 'Hero', { fontSize: '17px', color: '#fff', fontStyle: 'bold' }).setOrigin(0.5));
        this.playerAvatar = this.add.text(leftCX, 72, PLAYER_AVATAR, { fontSize: '52px' }).setOrigin(0.5);
        this.hudContainer.add(this.playerAvatar);
        this.hudContainer.add(this.add.text(14, 120, 'HP', { fontSize: '11px', color: '#aaa' }));
        this.playerHealthBarBg = this.add.rectangle(14, 131, barW, 12, 0x444444).setOrigin(0, 0.5);
        this.hudContainer.add(this.playerHealthBarBg);
        this.playerHealthBar = this.add.rectangle(14, 131, barW, 12, 0x00cc00).setOrigin(0, 0.5);
        this.hudContainer.add(this.playerHealthBar);
        this.playerStatsText = this.add.text(8, 146, '', { fontSize: '12px', color: '#fff', lineSpacing: 2 });
        this.hudContainer.add(this.playerStatsText);

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
        this.enemyStatsText = this.add.text(205, 146, '', { fontSize: '12px', color: '#fff', lineSpacing: 2 });
        this.hudContainer.add(this.enemyStatsText);

        this.createEquipmentScreen();
        this.createEquipmentButton(leftCX, 358);

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
            const equippedLabel = this.add.text(centerX, centerY + 52, '', {
                fontSize: '8px',
                color: '#bbbbbb',
                align: 'center',
                wordWrap: { width: cardWidth - 10, useAdvancedWrap: true }
            }).setOrigin(0.5);
            const compare = this.add.text(centerX, centerY + 78, '', {
                fontSize: '9px',
                color: '#8aff8a',
                align: 'center',
                wordWrap: { width: cardWidth - 10, useAdvancedWrap: true }
            }).setOrigin(0.5);

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

            this.rewardScreenGroup.add([cardBg, icon, name, rarity, stats, equippedLabel, compare, equipBtn, stashBtn]);
            this.rewardCards.push({ cardBg, icon, name, rarity, stats, equippedLabel, compare, equipBtn, stashBtn });
        }
    }

    showRewardScreen() {
        if (!this.rewardScreenGroup) return;
        this.currentScreen = 'reward';
        this.boardContainer.setVisible(false);
        this.hudContainer.setVisible(false);
        if (this.equipmentScreenGroup) this.equipmentScreenGroup.setVisible(false);
        this.rewardScreenGroup.setVisible(true);
        this.setGameBoardActive(false);
        this.closeInventoryItemPopup();

        const gear = this.getEquippedStatTotals();
        const lootPower = this.player.loot + gear.loot;
        this.rewardLootInfoText.setText(`Loot influence: ${lootPower} (higher value improves rarity)`);

        this.rewardChoices = [];
        for (let i = 0; i < 3; i++) {
            const rarity = this.rollRarityWithLootBonus();
            this.rewardChoices.push(this.generateItem(rarity.name));
        }

        this.rewardCards.forEach((card, index) => {
            const item = this.rewardChoices[index];
            const statText = Object.entries(item.stats)
                .map(([key, value]) => `${this.getStatLabel(key)} +${value}`)
                .join('\n');
            const compareData = this.getRewardCompareData(item);
            const compareText = compareData.compareLines.map(line => line.text || line).join('\n');
            const hasNegative = compareData.compareLines.some(line => typeof line === 'object' && line.delta < 0);
            const hasPositive = compareData.compareLines.some(line => typeof line === 'object' && line.delta > 0);

            card.cardBg.setStrokeStyle(3, item.frameColor, 1);
            card.icon.setText(item.icon);
            card.name.setText(item.name);
            card.name.setColor(item.rarityTextColor || '#ffffff');
            card.rarity.setText(`${item.rarity} ${item.type}`);
            card.rarity.setColor(item.rarityTextColor || '#ffffff');
            card.stats.setText(statText || 'No stats');
            card.equippedLabel.setText(`Replacing ${compareData.targetSlot || item.slotGroup}: ${compareData.equippedName}`);
            card.compare.setText(compareText);
            card.compare.setColor(hasNegative ? '#ff9d9d' : (hasPositive ? '#8aff8a' : '#dddddd'));

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
        const previousEquippedItem = this.equippedItems[targetSlot] || null;

        if (previousEquippedItem) {
            this.addItemToInventory(previousEquippedItem);
        }

        this.player.equipment[targetSlot] = item.name;
        this.equippedItems[targetSlot] = item;
        this.updateEquipmentScreen();
        this.addCombatLog(`Equipped ${item.name} in ${targetSlot}`, '#99ff99');
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

        this.createGrid();
        this.renderGrid();
        this.updatePlayerUI();
        this.updateEnemyUI();

        this.isSwapping = false;
        this.showGameScreen();
        this.addCombatLog(`A new enemy appears: ${this.currentMonsterName} (Battle ${this.battleNumber})`, '#ffcc66');
    }

    createEquipmentButton(x, y) {
        this.equipmentButton = this.add.text(x, y, 'Equipment', {
            fontSize: '16px',
            color: '#00ffcc',
            backgroundColor: '#333333',
            padding: { left: 8, right: 8, top: 4, bottom: 4 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        this.hudContainer.add(this.equipmentButton);

        this.equipmentButton.on('pointerup', () => {
            this.showEquipmentScreen();
        });
    }

    createEquipmentScreen() {
        const width = this.sys.game.config.width;
        const height = this.sys.game.config.height;

        this.equipmentScreenGroup = this.add.container(0, 0).setVisible(false);

        const leftPanelCenterX = Math.floor(width * 0.30);
        const rightPanelCenterX = Math.floor(width * 0.75);
        const silhouetteTopY = 108;
        const slotSize = 56;

        const bg = this.add.rectangle(width / 2, height / 2, width - 40, height - 40, 0x1a1a1a, 1).setStrokeStyle(2, 0xffffff);
        const divider = this.add.rectangle(Math.floor(width * 0.56), height / 2, 2, height - 80, 0x555555, 1);

        const leftPanelBg = this.add.rectangle(leftPanelCenterX, height / 2 + 10, width * 0.47, height - 130, 0x222222, 0.95).setStrokeStyle(1, 0x666666);
        const rightPanelBg = this.add.rectangle(rightPanelCenterX, height / 2 + 10, width * 0.34, height - 130, 0x232323, 0.95).setStrokeStyle(1, 0x666666);

        const title = this.add.text(width / 2, 50, 'Equipment', { fontSize: '22px', color: '#ffff00', fontStyle: 'bold' }).setOrigin(0.5);
        const tabInfo = this.add.text(10, 14, '', { fontSize: '12px', color: '#ffffff' }).setOrigin(0, 0);
        const switchButton = this.add.text(10, 12, 'Back to Game', { fontSize: '14px', color: '#00ffcc', backgroundColor: '#333333', padding: { left: 5, right: 5, top: 3, bottom: 3 } }).setOrigin(0, 0).setInteractive({ useHandCursor: true });
        switchButton.on('pointerup', () => this.showGameScreen());

        const slotsHeader = this.add.text(leftPanelCenterX, 78, 'Loadout', { fontSize: '15px', color: '#00ffcc', fontStyle: 'bold' }).setOrigin(0.5);
        const inventoryHeader = this.add.text(rightPanelCenterX, 78, 'Inventory', { fontSize: '15px', color: '#00ffcc', fontStyle: 'bold' }).setOrigin(0.5);

        const inventoryHint = this.add.text(rightPanelCenterX, 98, 'Tap item to inspect & equip.', {
            fontSize: '10px',
            color: '#aaaaaa',
            wordWrap: { width: Math.floor(width * 0.40), useAdvancedWrap: true }
        }).setOrigin(0.5, 0);

        // Draw a high-contrast translucent warrior body so slot placement is easy to parse.
        const silhouette = this.add.graphics();
        silhouette.fillStyle(0x88a3b8, 0.28);
        silhouette.lineStyle(3, 0xdde8f3, 0.82);
        silhouette.fillCircle(leftPanelCenterX, silhouetteTopY + 40, 36); // head
        silhouette.strokeCircle(leftPanelCenterX, silhouetteTopY + 40, 36);
        silhouette.fillRoundedRect(leftPanelCenterX - 36, silhouetteTopY + 78, 72, 122, 12); // torso
        silhouette.strokeRoundedRect(leftPanelCenterX - 36, silhouetteTopY + 78, 72, 122, 12);
        silhouette.fillRoundedRect(leftPanelCenterX - 78, silhouetteTopY + 102, 28, 88, 10); // left arm
        silhouette.strokeRoundedRect(leftPanelCenterX - 78, silhouetteTopY + 102, 28, 88, 10);
        silhouette.fillRoundedRect(leftPanelCenterX + 50, silhouetteTopY + 102, 28, 88, 10); // right arm
        silhouette.strokeRoundedRect(leftPanelCenterX + 50, silhouetteTopY + 102, 28, 88, 10);
        silhouette.fillRoundedRect(leftPanelCenterX - 28, silhouetteTopY + 208, 22, 106, 9); // left leg
        silhouette.strokeRoundedRect(leftPanelCenterX - 28, silhouetteTopY + 208, 22, 106, 9);
        silhouette.fillRoundedRect(leftPanelCenterX + 6, silhouetteTopY + 208, 22, 106, 9); // right leg
        silhouette.strokeRoundedRect(leftPanelCenterX + 6, silhouetteTopY + 208, 22, 106, 9);
        silhouette.fillStyle(0xffffff, 0.14);
        silhouette.fillEllipse(leftPanelCenterX, silhouetteTopY + 166, 48, 26);
        const warriorGlyph = this.add.text(leftPanelCenterX, silhouetteTopY + 146, '⚔', { fontSize: '66px', color: '#eaf4ff' }).setOrigin(0.5).setAlpha(0.32);

        this.equipmentScreenGroup.add([
            bg,
            divider,
            leftPanelBg,
            rightPanelBg,
            title,
            tabInfo,
            switchButton,
            slotsHeader,
            inventoryHeader,
            inventoryHint,
            silhouette,
            warriorGlyph
        ]);

        const slotConfig = [
            { key: 'helmet', label: 'Helmet', x: leftPanelCenterX, y: silhouetteTopY + 38 },
            { key: 'necklace', label: 'Necklace', x: leftPanelCenterX, y: silhouetteTopY + 102 },
            { key: 'chest', label: 'Chest', x: leftPanelCenterX, y: silhouetteTopY + 156 },
            { key: 'belt', label: 'Belt', x: leftPanelCenterX, y: silhouetteTopY + 222 },
            { key: 'mainhand', label: 'Main Hand', x: leftPanelCenterX - 82, y: silhouetteTopY + 160 },
            { key: 'offhand', label: 'Off Hand', x: leftPanelCenterX + 82, y: silhouetteTopY + 160 },
            { key: 'gloves', label: 'Gloves', x: leftPanelCenterX - 82, y: silhouetteTopY + 226 },
            { key: 'boots', label: 'Boots', x: leftPanelCenterX, y: silhouetteTopY + 304 },
            { key: 'ring1', label: 'Ring 1', x: leftPanelCenterX - 62, y: silhouetteTopY + 286 },
            { key: 'ring2', label: 'Ring 2', x: leftPanelCenterX + 62, y: silhouetteTopY + 286 }
        ];

        const equipmentIcons = {
            helmet: '🪖',
            chest: '🛡️',
            gloves: '🧤',
            boots: '🥾',
            belt: '🎒',
            mainhand: '🗡️',
            offhand: '🛡️',
            ring1: '💍',
            ring2: '💍',
            necklace: '📿'
        };

        this.equipmentText = {};
        this.equipmentIconText = {};
        this.equipmentSlotFrames = {};

        slotConfig.forEach(slot => {
            // Square slot for equipment
            const slotBg = this.add.rectangle(slot.x, slot.y, slotSize, slotSize, 0x2e2e2e, 0.78)
                .setStrokeStyle(2, 0xffffff)
                .setOrigin(0.5)
                .setInteractive({ useHandCursor: true });

            // Inner tile area for item image/icon
            const slotImageBg = this.add.rectangle(slot.x, slot.y, slotSize * 0.7, slotSize * 0.7, 0x000000, 0.28)
                .setStrokeStyle(1, 0xffffff, 0.66)
                .setOrigin(0.5)
                .setInteractive({ useHandCursor: true });
            const slotIcon = this.add.text(slot.x, slot.y - 6, '', { fontSize: '26px', color: '#ffffff' }).setOrigin(0.5);
            const slotLabel = this.add.text(slot.x, slot.y - slotSize / 2 - 10, slot.label, { fontSize: '11px', color: '#ffff00' }).setOrigin(0.5, 0.5);
            // Item name inside the slot (bottom edge) so it never bleeds into the adjacent slot below
            const slotValue = this.add.text(slot.x, slot.y + slotSize / 2 - 2, '', { fontSize: '8px', color: '#aaaaaa', align: 'center', wordWrap: { width: slotSize - 4, useAdvancedWrap: true } }).setOrigin(0.5, 1);

            const inspectEquippedItem = () => {
                const equippedItem = this.equippedItems[slot.key];
                if (equippedItem) {
                    this.openInventoryItemPopup(equippedItem, 'equipped', slot.key);
                }
            };
            slotBg.on('pointerup', inspectEquippedItem);
            slotImageBg.on('pointerup', inspectEquippedItem);

            this.equipmentText[slot.key] = slotValue;
            this.equipmentIconText[slot.key] = slotIcon;
            this.equipmentSlotFrames[slot.key] = slotImageBg;

            this.equipmentScreenGroup.add([slotBg, slotImageBg, slotIcon, slotLabel, slotValue]);
        });

        this.inventoryTiles = [];
        const inventoryGridLeft = rightPanelCenterX - 66;
        const inventoryGridTop = 165;
        const inventoryColumns = 2;
        const inventoryCellSize = 62;
        const inventoryCellGap = 8;

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

        const modalOverlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.7)
            .setInteractive({ useHandCursor: true });
        const modalCard = this.add.rectangle(width / 2, height / 2, 370, 360, 0x111111, 1)
            .setStrokeStyle(2, 0xffffff);
        const modalTitle = this.add.text(width / 2, height / 2 - 110, 'Item Details', {
            fontSize: '20px',
            color: '#ffff00',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        this.inventoryModalFrame = this.add.rectangle(width / 2, height / 2 - 62, 50, 50, 0x1f1f1f, 1).setStrokeStyle(2, 0x888888);
        this.inventoryModalIcon = this.add.text(width / 2, height / 2 - 62, '', { fontSize: '26px' }).setOrigin(0.5);
        this.inventoryModalName = this.add.text(width / 2, height / 2 - 14, '', { fontSize: '16px', color: '#ffffff', fontStyle: 'bold', wordWrap: { width: 340, useAdvancedWrap: true }, align: 'center' }).setOrigin(0.5);
        this.inventoryModalType = this.add.text(width / 2, height / 2 + 16, '', {
            fontSize: '12px',
            color: '#00ffcc',
            align: 'center',
            wordWrap: { width: 340, useAdvancedWrap: true }
        }).setOrigin(0.5);
        this.inventoryModalDesc = this.add.text(width / 2, height / 2 + 10, '', {
            fontSize: '12px',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 340, useAdvancedWrap: true }
        }).setOrigin(0.5);
        this.inventoryModalDesc.y = height / 2 + 66;
        this.inventoryModalStats = this.add.text(width / 2, height / 2 + 110, '', {
            fontSize: '12px',
            color: '#ffd966',
            align: 'center',
            wordWrap: { width: 340, useAdvancedWrap: true }
        }).setOrigin(0.5);

        const closeModalBtn = this.add.text(width / 2 - 90, height / 2 + 140, 'Close', {
            fontSize: '15px',
            color: '#ffffff',
            backgroundColor: '#444444',
            padding: { left: 8, right: 8, top: 4, bottom: 4 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        const removeBtn = this.add.text(width / 2, height / 2 + 140, 'Remove', {
            fontSize: '15px',
            color: '#ffffff',
            backgroundColor: '#a33d3d',
            padding: { left: 8, right: 8, top: 4, bottom: 4 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        const equipBtn = this.add.text(width / 2 + 90, height / 2 + 140, 'Equip', {
            fontSize: '15px',
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
            modalTitle,
            this.inventoryModalFrame,
            this.inventoryModalIcon,
            this.inventoryModalName,
            this.inventoryModalType,
            this.inventoryModalDesc,
            this.inventoryModalStats,
            closeModalBtn,
            removeBtn,
            equipBtn
        ]).setVisible(false);

        this.equipmentScreenGroup.add(this.inventoryModal);

        this.updateInventoryGridUI();

        const backBtn = this.add.text(width / 2, height - 40, 'Back to Game', { fontSize: '16px', color: '#00ff00', backgroundColor: '#333333', padding: { left: 10, right: 10, top: 5, bottom: 5 } }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        backBtn.on('pointerup', () => this.showGameScreen());
        this.equipmentScreenGroup.add(backBtn);
    }

    showEquipmentScreen() {
        this.currentScreen = 'equipment';
        if (this.equipmentScreenGroup) this.equipmentScreenGroup.setVisible(true);
        if (this.rewardScreenGroup) this.rewardScreenGroup.setVisible(false);
        this.boardContainer.setVisible(false);
        this.hudContainer.setVisible(false);
        this.setGameBoardActive(false);
        this.updateEquipmentScreen();
        this.addCombatLog('Switched to equipment screen', '#00ffff');
    }

    showGameScreen() {
        this.currentScreen = 'game';
        if (this.equipmentScreenGroup) this.equipmentScreenGroup.setVisible(false);
        if (this.rewardScreenGroup) this.rewardScreenGroup.setVisible(false);
        this.closeInventoryItemPopup();
        this.boardContainer.setVisible(true);
        this.hudContainer.setVisible(true);
        this.setGameBoardActive(true);
        this.addCombatLog('Back to game screen', '#00ffff');
    }

    updateEquipmentScreen() {
        if (!this.equipmentText || !this.equipmentIconText) return;

        Object.entries(this.player.equipment).forEach(([key, value]) => {
            const equippedItem = this.equippedItems[key] || null;
            if (this.equipmentText[key]) {
                this.equipmentText[key].setText(value === 'None' ? '' : value);
            }
            if (this.equipmentIconText[key]) {
                this.equipmentIconText[key].setText(equippedItem ? equippedItem.icon : '');
            }
            if (this.equipmentSlotFrames[key]) {
                this.equipmentSlotFrames[key].setStrokeStyle(2, equippedItem ? equippedItem.frameColor : 0xffffff, 1);
            }
        });

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

        const statText = Object.entries(item.stats)
            .map(([key, value]) => `${this.getStatLabel(key)}: +${value}`)
            .join('   |   ');

        this.inventoryModalFrame.setStrokeStyle(2, item.frameColor, 1);
        this.inventoryModalIcon.setText(item.icon);
        this.inventoryModalName.setText(item.name);
        this.inventoryModalName.setColor(item.rarityTextColor || '#ffffff');
        this.inventoryModalType.setText(`Type: ${item.type}  |  Slot: ${this.getSlotLabel(item.slotGroup)}  |  Rarity: ${item.rarity}`);
        this.inventoryModalDesc.setText(item.description);
        this.inventoryModalStats.setText(statText || 'No bonus stats');
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
        const previousEquippedItem = this.equippedItems[targetSlot] || null;
        const inventoryIndex = this.inventory.findIndex(inventoryItem => inventoryItem.id === item.id);

        if (inventoryIndex === -1) {
            this.closeInventoryItemPopup();
            return;
        }

        this.inventory.splice(inventoryIndex, 1);
        if (previousEquippedItem) {
            this.inventory.push(previousEquippedItem);
        }

        this.player.equipment[targetSlot] = item.name;
        this.equippedItems[targetSlot] = item;
        this.updateEquipmentScreen();
        this.addCombatLog(`Equipped ${item.name} in ${targetSlot}`, '#99ff99');
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
        this.equippedItems[slotKey] = null;
        this.player.equipment[slotKey] = 'None';

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
        if (!this.playerStatsText) return;

        const gear = this.getEquippedStatTotals();
        this.playerStatsText.setText([
            `Health: ${this.player.health}`,
            `Physical: ${this.player.physical} (+${gear.physical})`,
            `Magic: ${this.player.magic} (+${gear.magic})`,
            `Ranged: ${this.player.ranged} (+${gear.ranged})`,
            `Loot: ${this.player.loot}`,
            `Armor: +${gear.armor}`,
            `Score: ${this.score}`
        ].join('\n'));

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
    }

    updateEnemyUI() {
        if (!this.enemyStatsText) return;
        this.enemyStatsText.setText([
            `Enemy HP: ${this.enemy.health}/${this.enemy.maxHealth}`,
            `Attack: ${this.enemy.attack}`
        ].join('\n'));

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

                // Icon text on tile
                const icon = this.add.text(posX, posY, tileInfo.icon, {
                    fontSize: '32px',
                    color: '#000000',
                    stroke: '#ffffff',
                    strokeThickness: 4
                }).setOrigin(0.5);

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

        const matches = this.findMatches();
        if (matches.length > 0) {
            this.time.delayedCall(800, () => {
                this.clearMatches(matches);
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

    findMatches() {
        const matched = new Set();

        // Horizontal
        for (let y = 0; y < GRID_HEIGHT; y++) {
            for (let x = 0; x < GRID_WIDTH; x++) {
                const type = this.grid[y][x];
                if (type === -1) continue;

                let count = 1;
                while (x + count < GRID_WIDTH && this.grid[y][x + count] === type) {
                    count++;
                }

                if (count >= 3) {
                    for (let i = 0; i < count; i++) {
                        matched.add(`${x + i},${y}`);
                    }
                }
            }
        }

        // Vertical
        for (let x = 0; x < GRID_WIDTH; x++) {
            for (let y = 0; y < GRID_HEIGHT; y++) {
                const type = this.grid[y][x];
                if (type === -1) continue;

                let count = 1;
                while (y + count < GRID_HEIGHT && this.grid[y + count][x] === type) {
                    count++;
                }

                if (count >= 3) {
                    for (let i = 0; i < count; i++) {
                        matched.add(`${x},${y + i}`);
                    }
                }
            }
        }

        return Array.from(matched);
    }

    clearMatches(matches) {
        const gear = this.getEquippedStatTotals();
        let totalEnemyDamage = 0;
        let totalPlayerHeal = 0;
        let physicalDamage = 0;
        let magicDamage = 0;
        let rangedDamage = 0;
        let healAmount = 0;
        let lootAmount = 0;

        matches.forEach(match => {
            const [x, y] = match.split(',').map(Number);
            const tileType = this.grid[y][x];
            if (tileType >= 0 && TILE_TYPES[tileType]) {
                const effect = TILE_TYPES[tileType].effect;
                switch (effect) {
                    case 'physical':
                        this.player.physical += 5;
                        physicalDamage += 8 + gear.physical;
                        totalEnemyDamage += 8 + gear.physical;
                        break;
                    case 'magic':
                        this.player.magic += 5;
                        magicDamage += 8 + gear.magic;
                        totalEnemyDamage += 8 + gear.magic;
                        break;
                    case 'ranged':
                        this.player.ranged += 5;
                        rangedDamage += 8 + gear.ranged;
                        totalEnemyDamage += 8 + gear.ranged;
                        break;
                    case 'health':
                        healAmount += 10 + Math.floor(gear.health / 10);
                        totalPlayerHeal += 10 + Math.floor(gear.health / 10);
                        break;
                    case 'loot':
                        this.player.loot += 10;
                        lootAmount += 10 + gear.loot;
                        break;
                }
            }
            this.grid[y][x] = -1;
            this.score += 10;
        });

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
            this.addCombatLog(`Healing: +${healAmount}`, '#ff1493');
        }
        if (lootAmount > 0) {
            this.addCombatLog(`Gold gained: +${lootAmount}`, '#ffff00');
            this.tryDropLootItem(lootAmount);
        }

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
                const matches = this.findMatches();
                if (matches.length > 0) {
                    this.time.delayedCall(800, () => {
                        this.clearMatches(matches);
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
        const damage = this.enemy.attack;
        const mitigatedDamage = Math.max(1, damage - Math.floor(gear.armor / 3));
        this.player.health -= mitigatedDamage;
        if (this.player.health < 0) this.player.health = 0;
        this.addCombatLog(`Enemy Attack: -${mitigatedDamage} (${Math.floor(gear.armor / 3)} blocked)`, '#ff6666');
        this.showCombatMessage(`Hero -${mitigatedDamage}`, '#ff4444', GRID_OFFSET_X + (GRID_WIDTH * TILE_SIZE) / 2, GRID_OFFSET_Y + GRID_HEIGHT * TILE_SIZE - 20);
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
