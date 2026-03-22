const GRID_WIDTH = 6;
const GRID_HEIGHT = 6;
const TILE_SIZE = 64;
const GRID_OFFSET_X = 160;
const GRID_OFFSET_Y = 80;

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
        this.enemyAvatar = null;
        this.enemyHealthBarBg = null;
        this.enemyHealthBar = null;
        this.combatLog = [];
        this.combatLogTexts = [];
        this.maxCombatLogLines = 5;

        this.boardContainer = null;
        this.hudContainer = null;
        this.equipmentScreenGroup = null;
        this.currentScreen = 'game';
        this.combatLogTexts = [];
        this.maxCombatLogLines = 5;
        const monsterIndex = Phaser.Math.Between(0, MONSTER_AVATARS.length - 1);
        this.currentMonsterAvatar = MONSTER_AVATARS[monsterIndex];
        this.currentMonsterName = MONSTER_NAMES[monsterIndex];

        this.inventory = [
            { id: 'iron-helm', name: 'Iron Helm', slot: 'helmet', type: 'Helmet', rarity: 'Common', icon: '🪖', frameColor: 0xa3a3a3, description: 'Simple iron head protection.', stats: { armor: 4 } },
            { id: 'hunter-coat', name: 'Hunter Coat', slot: 'chest', type: 'Chest', rarity: 'Uncommon', icon: '🦺', frameColor: 0x66bb6a, description: 'Leather coat favored by scouts.', stats: { armor: 5, ranged: 2 } },
            { id: 'war-gloves', name: 'War Gloves', slot: 'gloves', type: 'Gloves', rarity: 'Common', icon: '🧤', frameColor: 0xa3a3a3, description: 'Reinforced gloves for melee grip.', stats: { physical: 3 } },
            { id: 'trail-boots', name: 'Trail Boots', slot: 'boots', type: 'Boots', rarity: 'Common', icon: '🥾', frameColor: 0xa3a3a3, description: 'Light boots for quick movement.', stats: { ranged: 1, armor: 2 } },
            { id: 'oak-belt', name: 'Oak Belt', slot: 'belt', type: 'Belt', rarity: 'Common', icon: '🧷', frameColor: 0xa3a3a3, description: 'Sturdy belt with potion loops.', stats: { health: 10 } },
            { id: 'knight-blade', name: 'Knight Blade', slot: 'mainhand', type: 'Weapon', rarity: 'Rare', icon: '🗡️', frameColor: 0x42a5f5, description: 'A balanced one-handed sword.', stats: { physical: 6 } },
            { id: 'tower-buckler', name: 'Tower Buckler', slot: 'offhand', type: 'Shield', rarity: 'Uncommon', icon: '🛡️', frameColor: 0x66bb6a, description: 'Small shield with strong guard.', stats: { armor: 6 } },
            { id: 'topaz-band', name: 'Topaz Band', slot: 'ring1', type: 'Ring', rarity: 'Uncommon', icon: '💍', frameColor: 0x66bb6a, description: 'Warm stone that boosts vitality.', stats: { health: 15 } },
            { id: 'moon-band', name: 'Moon Band', slot: 'ring2', type: 'Ring', rarity: 'Uncommon', icon: '💍', frameColor: 0x66bb6a, description: 'Pale band for magical focus.', stats: { magic: 4 } },
            { id: 'sage-amulet', name: 'Sage Amulet', slot: 'necklace', type: 'Necklace', rarity: 'Rare', icon: '📿', frameColor: 0x42a5f5, description: 'Ancient charm that sharpens focus.', stats: { magic: 6, ranged: 2 } }
        ];
        this.equippedItems = {};
        this.inventoryTiles = [];
        this.selectedInventoryItem = null;
        this.inventoryModal = null;
        this.inventoryModalIcon = null;
        this.inventoryModalName = null;
        this.inventoryModalType = null;
        this.inventoryModalDesc = null;
        this.inventoryModalStats = null;
    }

    create() {
        console.log('Scene created!');

        this.boardContainer = this.add.container(0, 0);
        this.hudContainer = this.add.container(0, 0);

        this.createGrid();
        this.renderGrid();
        this.createPlayerUI();
        this.createCombatLog();

        this.showGameScreen();
    }

    createCombatLog() {
        const logY = GRID_OFFSET_Y + GRID_HEIGHT * TILE_SIZE + 20;
        const bg = this.add.rectangle(GRID_OFFSET_X + (GRID_WIDTH * TILE_SIZE) / 2, logY + 30, GRID_WIDTH * TILE_SIZE, 80, 0x111111, 0.9).setOrigin(0.5);
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

        const logY = GRID_OFFSET_Y + GRID_HEIGHT * TILE_SIZE + 20;
        const logX = GRID_OFFSET_X + (GRID_WIDTH * TILE_SIZE) / 2;
        const lineHeight = 15;

        this.combatLog.forEach((entry, index) => {
            const y = logY + (index - this.combatLog.length / 2) * lineHeight;
            const textObj = this.add.text(logX - (GRID_WIDTH * TILE_SIZE) / 2 + 10, y, entry.text, {
                fontSize: '14px',
                color: entry.color,
                fontStyle: 'bold'
            });
            this.hudContainer.add(textObj);
            this.combatLogTexts.push(textObj);
        });
    }

    createPlayerUI() {
        const gridCenterX = GRID_OFFSET_X + (GRID_WIDTH * TILE_SIZE) / 2;
        const leftPanelX = 80;
        const rightPanelX = GRID_OFFSET_X + GRID_WIDTH * TILE_SIZE + 80;

        // Player (Hero) UI on LEFT
        this.hudContainer.add(this.add.rectangle(leftPanelX, 200, 140, 280, 0x111111, 0.9).setOrigin(0.5));
        this.playerAvatar = this.add.text(leftPanelX, 110, PLAYER_AVATAR, { fontSize: '64px' }).setOrigin(0.5);
        this.hudContainer.add(this.playerAvatar);
        this.hudContainer.add(this.add.text(leftPanelX - 25, 60, 'Hero', { fontSize: '22px', color: '#fff', fontStyle: 'bold' }));
        this.playerStatsText = this.add.text(leftPanelX - 60, 200, '', { fontSize: '16px', color: '#fff' });
        this.hudContainer.add(this.playerStatsText);
        this.playerHealthBarBg = this.add.rectangle(leftPanelX - 50, 165, 100, 12, 0x444444).setOrigin(0, 0.5);
        this.hudContainer.add(this.playerHealthBarBg);
        this.playerHealthBar = this.add.rectangle(leftPanelX - 50, 165, 100, 12, 0x00cc00).setOrigin(0, 0.5);
        this.hudContainer.add(this.playerHealthBar);

        // Enemy UI on RIGHT
        this.hudContainer.add(this.add.rectangle(rightPanelX, 210, 140, 320, 0x111111, 0.9).setOrigin(0.5));
        this.enemyAvatar = this.add.text(rightPanelX, 110, this.currentMonsterAvatar, { fontSize: '64px' }).setOrigin(0.5);
        this.hudContainer.add(this.enemyAvatar);
        this.hudContainer.add(this.add.text(rightPanelX, 60, this.currentMonsterName, { fontSize: '22px', color: '#fff', fontStyle: 'bold' }).setOrigin(0.5));
        this.enemyStatsText = this.add.text(rightPanelX - 60, 190, '', { fontSize: '16px', color: '#fff' });
        this.hudContainer.add(this.enemyStatsText);
        this.enemyHealthBarBg = this.add.rectangle(rightPanelX - 50, 165, 100, 12, 0x444444).setOrigin(0, 0.5);
        this.hudContainer.add(this.enemyHealthBarBg);
        this.enemyHealthBar = this.add.rectangle(rightPanelX - 50, 165, 100, 12, 0xff0000).setOrigin(0, 0.5);
        this.hudContainer.add(this.enemyHealthBar);

        this.createEquipmentScreen();
        this.createEquipmentButton(leftPanelX, 300);

        this.updatePlayerUI();
        this.updateEnemyUI();
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
        const silhouetteTopY = 120;
        const slotSize = 72;

        const bg = this.add.rectangle(width / 2, height / 2, width - 40, height - 40, 0x1a1a1a, 1).setStrokeStyle(2, 0xffffff);
        const divider = this.add.rectangle(Math.floor(width * 0.56), height / 2, 2, height - 80, 0x555555, 1);

        const leftPanelBg = this.add.rectangle(leftPanelCenterX, height / 2 + 10, width * 0.47, height - 130, 0x222222, 0.95).setStrokeStyle(1, 0x666666);
        const rightPanelBg = this.add.rectangle(rightPanelCenterX, height / 2 + 10, width * 0.34, height - 130, 0x232323, 0.95).setStrokeStyle(1, 0x666666);

        const title = this.add.text(width / 2, 60, 'Equipment Tab', { fontSize: '28px', color: '#ffff00', fontStyle: 'bold' }).setOrigin(0.5);
        const tabInfo = this.add.text(20, 20, 'Game Tab: ', { fontSize: '18px', color: '#ffffff' }).setOrigin(0, 0);
        const switchButton = this.add.text(120, 18, 'Back to Game', { fontSize: '18px', color: '#00ffcc', backgroundColor: '#333333', padding: { left: 6, right: 6, top: 4, bottom: 4 } }).setOrigin(0, 0).setInteractive({ useHandCursor: true });
        switchButton.on('pointerup', () => this.showGameScreen());

        const slotsHeader = this.add.text(leftPanelCenterX, 95, 'Warrior Loadout', { fontSize: '18px', color: '#00ffcc', fontStyle: 'bold' }).setOrigin(0.5);
        const inventoryHeader = this.add.text(rightPanelCenterX, 95, 'Inventory', { fontSize: '18px', color: '#00ffcc', fontStyle: 'bold' }).setOrigin(0.5);

        const inventoryHint = this.add.text(rightPanelCenterX, 125, 'Click a square item icon to inspect it, then equip it.', {
            fontSize: '13px',
            color: '#ffffff',
            wordWrap: { width: Math.floor(width * 0.30), useAdvancedWrap: true }
        }).setOrigin(0.5, 0);

        // Silhouette sits behind the slot markers to make each slot position readable.
        const silhouette = this.add.graphics();
        silhouette.fillStyle(0x6c7a89, 0.42);
        silhouette.lineStyle(4, 0xd7c38a, 0.9);
        silhouette.fillCircle(leftPanelCenterX, silhouetteTopY + 36, 34); // head
        silhouette.strokeCircle(leftPanelCenterX, silhouetteTopY + 36, 34);
        silhouette.fillRoundedRect(leftPanelCenterX - 28, silhouetteTopY + 72, 56, 120, 10); // torso
        silhouette.strokeRoundedRect(leftPanelCenterX - 28, silhouetteTopY + 72, 56, 120, 10);
        silhouette.fillRoundedRect(leftPanelCenterX - 64, silhouetteTopY + 84, 22, 94, 8); // left arm
        silhouette.strokeRoundedRect(leftPanelCenterX - 64, silhouetteTopY + 84, 22, 94, 8);
        silhouette.fillRoundedRect(leftPanelCenterX + 42, silhouetteTopY + 84, 22, 94, 8); // right arm
        silhouette.strokeRoundedRect(leftPanelCenterX + 42, silhouetteTopY + 84, 22, 94, 8);
        silhouette.fillRoundedRect(leftPanelCenterX - 22, silhouetteTopY + 194, 18, 88, 8); // left leg
        silhouette.strokeRoundedRect(leftPanelCenterX - 22, silhouetteTopY + 194, 18, 88, 8);
        silhouette.fillRoundedRect(leftPanelCenterX + 4, silhouetteTopY + 194, 18, 88, 8); // right leg
        silhouette.strokeRoundedRect(leftPanelCenterX + 4, silhouetteTopY + 194, 18, 88, 8);
        silhouette.fillStyle(0x4a5560, 0.35);
        silhouette.fillTriangle(leftPanelCenterX - 38, silhouetteTopY + 190, leftPanelCenterX + 38, silhouetteTopY + 190, leftPanelCenterX, silhouetteTopY + 248);
        silhouette.lineStyle(2, 0xd7c38a, 0.55);
        silhouette.strokeTriangle(leftPanelCenterX - 38, silhouetteTopY + 190, leftPanelCenterX + 38, silhouetteTopY + 190, leftPanelCenterX, silhouetteTopY + 248);
        const warriorGlyph = this.add.text(leftPanelCenterX, silhouetteTopY + 140, '⚔', { fontSize: '54px', color: '#f4e4b8' }).setOrigin(0.5).setAlpha(0.35);

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
            { key: 'helmet', label: 'Helmet', x: leftPanelCenterX, y: silhouetteTopY + 32 },
            { key: 'necklace', label: 'Necklace', x: leftPanelCenterX, y: silhouetteTopY + 95 },
            { key: 'chest', label: 'Chest', x: leftPanelCenterX, y: silhouetteTopY + 150 },
            { key: 'belt', label: 'Belt', x: leftPanelCenterX, y: silhouetteTopY + 220 },
            { key: 'offhand', label: 'Off Hand', x: leftPanelCenterX - 145, y: silhouetteTopY + 150 },
            { key: 'mainhand', label: 'Main Hand', x: leftPanelCenterX + 145, y: silhouetteTopY + 150 },
            { key: 'gloves', label: 'Gloves', x: leftPanelCenterX + 145, y: silhouetteTopY + 220 },
            { key: 'boots', label: 'Boots', x: leftPanelCenterX, y: silhouetteTopY + 300 },
            { key: 'ring1', label: 'Ring 1', x: leftPanelCenterX - 105, y: silhouetteTopY + 300 },
            { key: 'ring2', label: 'Ring 2', x: leftPanelCenterX + 105, y: silhouetteTopY + 300 }
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
            const slotBg = this.add.rectangle(slot.x, slot.y, slotSize, slotSize, 0x333333, 0.95).setStrokeStyle(2, 0xffffff).setOrigin(0.5);

            // Inner tile area for item image/icon
            const slotImageBg = this.add.rectangle(slot.x, slot.y, slotSize * 0.7, slotSize * 0.7, 0x000000, 0.45).setStrokeStyle(1, 0xffffff, 0.66).setOrigin(0.5);
            const slotIcon = this.add.text(slot.x, slot.y, '', { fontSize: '34px', color: '#ffffff' }).setOrigin(0.5);
            const slotLabel = this.add.text(slot.x, slot.y - slotSize / 2 - 14, slot.label, { fontSize: '14px', color: '#ffff00' }).setOrigin(0.5, 0.5);
            const slotValue = this.add.text(slot.x, slot.y + slotSize / 2 + 14, 'Empty', { fontSize: '14px', color: '#ffffff' }).setOrigin(0.5, 0.5);

            this.equipmentText[slot.key] = slotValue;
            this.equipmentIconText[slot.key] = slotIcon;
            this.equipmentSlotFrames[slot.key] = slotImageBg;

            this.equipmentScreenGroup.add([slotBg, slotImageBg, slotIcon, slotLabel, slotValue]);
        });

        this.inventoryTiles = [];
        const inventoryGridLeft = rightPanelCenterX - 120;
        const inventoryGridTop = 165;
        const inventoryColumns = 3;
        const inventoryCellSize = 78;
        const inventoryCellGap = 18;

        for (let index = 0; index < 12; index++) {
            const column = index % inventoryColumns;
            const row = Math.floor(index / inventoryColumns);
            const cellX = inventoryGridLeft + column * (inventoryCellSize + inventoryCellGap);
            const cellY = inventoryGridTop + row * (inventoryCellSize + inventoryCellGap);

            const tileBg = this.add.rectangle(cellX, cellY, inventoryCellSize, inventoryCellSize, 0x2d2d2d, 1)
                .setOrigin(0, 0)
                .setStrokeStyle(2, 0x666666)
                .setInteractive({ useHandCursor: true });
            const tileInner = this.add.rectangle(cellX + 7, cellY + 7, inventoryCellSize - 14, inventoryCellSize - 14, 0x111111, 1)
                .setOrigin(0, 0)
                .setStrokeStyle(1, 0x444444);
            const tileIcon = this.add.text(cellX + inventoryCellSize / 2, cellY + 28, '', { fontSize: '28px' }).setOrigin(0.5);
            const tileName = this.add.text(cellX + inventoryCellSize / 2, cellY + 61, '', {
                fontSize: '9px',
                color: '#ffffff',
                align: 'center',
                wordWrap: { width: inventoryCellSize - 8, useAdvancedWrap: true }
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
        const modalCard = this.add.rectangle(width / 2, height / 2, 430, 300, 0x111111, 1)
            .setStrokeStyle(2, 0xffffff);
        const modalTitle = this.add.text(width / 2, height / 2 - 110, 'Item Details', {
            fontSize: '24px',
            color: '#ffff00',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        this.inventoryModalFrame = this.add.rectangle(width / 2, height / 2 - 62, 58, 58, 0x1f1f1f, 1).setStrokeStyle(2, 0x888888);
        this.inventoryModalIcon = this.add.text(width / 2, height / 2 - 62, '', { fontSize: '30px' }).setOrigin(0.5);
        this.inventoryModalName = this.add.text(width / 2, height / 2 - 14, '', { fontSize: '20px', color: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5);
        this.inventoryModalType = this.add.text(width / 2, height / 2 + 18, '', { fontSize: '14px', color: '#00ffcc' }).setOrigin(0.5);
        this.inventoryModalDesc = this.add.text(width / 2, height / 2 + 10, '', {
            fontSize: '14px',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 380, useAdvancedWrap: true }
        }).setOrigin(0.5);
        this.inventoryModalDesc.y = height / 2 + 55;
        this.inventoryModalStats = this.add.text(width / 2, height / 2 + 108, '', { fontSize: '14px', color: '#ffd966' }).setOrigin(0.5);

        const closeModalBtn = this.add.text(width / 2 - 80, height / 2 + 120, 'Close', {
            fontSize: '18px',
            color: '#ffffff',
            backgroundColor: '#444444',
            padding: { left: 10, right: 10, top: 5, bottom: 5 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        const equipBtn = this.add.text(width / 2 + 80, height / 2 + 120, 'Equip', {
            fontSize: '18px',
            color: '#111111',
            backgroundColor: '#00ff99',
            padding: { left: 12, right: 12, top: 5, bottom: 5 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        modalOverlay.on('pointerup', () => this.closeInventoryItemPopup());
        closeModalBtn.on('pointerup', () => this.closeInventoryItemPopup());
        equipBtn.on('pointerup', () => this.equipSelectedInventoryItem());

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
            equipBtn
        ]).setVisible(false);

        this.equipmentScreenGroup.add(this.inventoryModal);

        this.updateInventoryGridUI();

        const backBtn = this.add.text(width / 2, height - 60, 'Back to Game', { fontSize: '20px', color: '#00ff00', backgroundColor: '#333333', padding: { left: 10, right: 10, top: 6, bottom: 6 } }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        backBtn.on('pointerup', () => this.showGameScreen());
        this.equipmentScreenGroup.add(backBtn);
    }

    showEquipmentScreen() {
        this.currentScreen = 'equipment';
        if (this.equipmentScreenGroup) this.equipmentScreenGroup.setVisible(true);
        this.boardContainer.setVisible(false);
        this.hudContainer.setVisible(false);
        this.setGameBoardActive(false);
        this.updateEquipmentScreen();
        this.addCombatLog('Switched to equipment screen', '#00ffff');
    }

    showGameScreen() {
        this.currentScreen = 'game';
        if (this.equipmentScreenGroup) this.equipmentScreenGroup.setVisible(false);
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
                this.equipmentText[key].setText(value === 'None' ? 'Empty' : value);
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
        });
    }

    openInventoryItemPopup(item) {
        if (!this.inventoryModal) return;
        this.selectedInventoryItem = item;

        const statText = Object.entries(item.stats)
            .map(([key, value]) => `${key.toUpperCase()}: +${value}`)
            .join('   ');

        this.inventoryModalFrame.setStrokeStyle(2, item.frameColor, 1);
        this.inventoryModalIcon.setText(item.icon);
        this.inventoryModalName.setText(item.name);
        this.inventoryModalType.setText(`Type: ${item.type}  |  Slot: ${item.slot}  |  Rarity: ${item.rarity}`);
        this.inventoryModalDesc.setText(item.description);
        this.inventoryModalStats.setText(statText || 'No bonus stats');
        this.inventoryModal.setVisible(true);
    }

    closeInventoryItemPopup() {
        this.selectedInventoryItem = null;
        if (this.inventoryModal) {
            this.inventoryModal.setVisible(false);
        }
    }

    equipSelectedInventoryItem() {
        if (!this.selectedInventoryItem) return;

        const item = this.selectedInventoryItem;
        const previousEquippedItem = this.equippedItems[item.slot] || null;
        const inventoryIndex = this.inventory.findIndex(inventoryItem => inventoryItem.id === item.id);

        if (inventoryIndex === -1) {
            this.closeInventoryItemPopup();
            return;
        }

        this.inventory.splice(inventoryIndex, 1);
        if (previousEquippedItem) {
            this.inventory.push(previousEquippedItem);
        }

        this.player.equipment[item.slot] = item.name;
        this.equippedItems[item.slot] = item;
        this.updateEquipmentScreen();
        this.addCombatLog(`Equipped ${item.name} in ${item.slot}`, '#99ff99');
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
        this.playerStatsText.setText([
            `Health: ${this.player.health}`,
            `Physical: ${this.player.physical}`,
            `Magic: ${this.player.magic}`,
            `Ranged: ${this.player.ranged}`,
            `Loot: ${this.player.loot}`,
            `Score: ${this.score}`
        ].join('\n'));

        if (this.playerHealthBar) {
            const fraction = Phaser.Math.Clamp(this.player.health / 100, 0, 1);
            const targetWidth = 120 * fraction;
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
            const targetWidth = 120 * fraction;
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
        const centerY = GRID_OFFSET_Y / 2 + 40;

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
                        physicalDamage += 8;
                        totalEnemyDamage += 8;
                        break;
                    case 'magic':
                        this.player.magic += 5;
                        magicDamage += 8;
                        totalEnemyDamage += 8;
                        break;
                    case 'ranged':
                        this.player.ranged += 5;
                        rangedDamage += 8;
                        totalEnemyDamage += 8;
                        break;
                    case 'health':
                        this.player.health += 10;
                        healAmount += 10;
                        totalPlayerHeal += 10;
                        break;
                    case 'loot':
                        this.player.loot += 10;
                        lootAmount += 10;
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
        }

        if (totalEnemyDamage > 0) {
            this.enemy.health = Math.max(0, this.enemy.health - totalEnemyDamage);
            this.showCombatMessage(`Enemy -${totalEnemyDamage}`, '#ff5555', GRID_OFFSET_X + (GRID_WIDTH * TILE_SIZE) / 2, 40);

            if (this.enemy.health <= 0) {
                this.enemy.health = 0;
                this.handleEnemyDeath();
                this.showVictoryPopup();
                this.isSwapping = true;
            }
        }

        if (totalPlayerHeal > 0) {
            this.player.health = Math.min(500, this.player.health + totalPlayerHeal);
            this.showCombatMessage(`Hero +${totalPlayerHeal}`, '#55ff55', GRID_OFFSET_X + (GRID_WIDTH * TILE_SIZE) / 2, 80);
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
        if (this.enemy.health <= 0) return;
        const damage = this.enemy.attack;
        this.player.health -= damage;
        if (this.player.health < 0) this.player.health = 0;
        this.addCombatLog(`Enemy Attack: -${damage}`, '#ff6666');
        this.showCombatMessage(`Hero -${damage}`, '#ff4444', GRID_OFFSET_X + (GRID_WIDTH * TILE_SIZE) / 2, GRID_HEIGHT * TILE_SIZE - 40);
        this.updatePlayerUI();
        if (this.player.health <= 0) {
            this.add.text(GRID_OFFSET_X + (GRID_WIDTH * TILE_SIZE) / 2, GRID_HEIGHT * TILE_SIZE / 2 - 20, 'Game Over', { fontSize: '48px', color: '#ff0000', fontStyle: 'bold' }).setOrigin(0.5);
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
    width: GRID_OFFSET_X + GRID_WIDTH * TILE_SIZE + 220,
    height: GRID_OFFSET_Y + GRID_HEIGHT * TILE_SIZE + 80,
    backgroundColor: '#2c3e50',
    scene: Match3Scene
};

const game = new Phaser.Game(config);
