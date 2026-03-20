const GRID_WIDTH = 6;
const GRID_HEIGHT = 6;
const TILE_SIZE = 64;
const TILE_COLORS = [0xff6b6b, 0x4ecdc4, 0xffe66d, 0x361e74, 0x39781e, 0xc7ceea];

class Match3Scene extends Phaser.Scene {
    constructor() {
        super('Match3Scene');
        this.grid = [];
        this.tileSprites = [];
        this.dragStart = null;
        this.isSwapping = false;
        this.score = 0;
    }

    create() {
        console.log('Scene created!');
        this.createGrid();
        this.renderGrid();
    }

    createGrid() {
        console.log('Creating grid...');
        for (let y = 0; y < GRID_HEIGHT; y++) {
            this.grid[y] = [];
            for (let x = 0; x < GRID_WIDTH; x++) {
                let type;
                do {
                    type = Phaser.Math.Between(0, TILE_COLORS.length - 1);
                } while (!this.isValidPlacement(x, y, type));
                this.grid[y][x] = type;
            }
        }
        console.log('Grid created:', this.grid);
    }

    renderGrid() {
        console.log('Rendering grid...');
        
        // Clear existing sprites
        this.tileSprites.forEach(row => {
            row.forEach(sprite => {
                if (sprite && sprite.rect) sprite.rect.destroy();
                if (sprite && sprite.text) sprite.text.destroy();
            });
        });
        this.tileSprites = [];

        // Create new sprites
        for (let y = 0; y < GRID_HEIGHT; y++) {
            this.tileSprites[y] = [];
            for (let x = 0; x < GRID_WIDTH; x++) {
                const type = this.grid[y][x];
                const posX = x * TILE_SIZE + TILE_SIZE / 2;
                const posY = y * TILE_SIZE + TILE_SIZE / 2;

                // Create rectangle sprite
                const rect = this.add.rectangle(posX, posY, TILE_SIZE - 4, TILE_SIZE - 4, TILE_COLORS[type]);
                rect.setStrokeStyle(2, 0xffffff);
                rect.setInteractive({ draggable: true });
                rect.on('dragstart', () => this.handleDragStart(x, y));
                rect.on('drag', (pointer) => this.handleDrag(pointer, x, y));
                rect.on('dragend', (pointer) => this.handleDragEnd(pointer, x, y));

                this.tileSprites[y][x] = { rect, x, y, type };
            }
        }
        console.log('Grid rendered!');
    }

    handleDragStart(x, y) {
        if (this.isSwapping) return;
        console.log(`Drag start: ${x}, ${y}`);
        this.dragStart = { x, y };
        // Bring tile to front while dragging
        this.tileSprites[y][x].rect.setDepth(1000);
    }

    handleDrag(pointer, x, y) {
        const tile = this.tileSprites[y][x];
        if (tile && tile.rect) {
            tile.rect.x = pointer.x;
            tile.rect.y = pointer.y;
        }
    }

    handleDragEnd(pointer, x, y) {
        const tile = this.tileSprites[y][x];
        if (!tile || !tile.rect) return;

        // Snap back to original position and reset depth
        const posX = x * TILE_SIZE + TILE_SIZE / 2;
        const posY = y * TILE_SIZE + TILE_SIZE / 2;
        tile.rect.x = posX;
        tile.rect.y = posY;
        tile.rect.setScale(1);
        tile.rect.setDepth(0);

        if (!this.dragStart) return;

        // Calculate which grid cell the pointer is over
        const gridX = Math.floor(pointer.x / TILE_SIZE);
        const gridY = Math.floor(pointer.y / TILE_SIZE);

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
        matches.forEach(match => {
            const [x, y] = match.split(',').map(Number);
            this.grid[y][x] = -1;
            this.score += 10;
        });
        document.getElementById('score').textContent = `Score: ${this.score}`;
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
                    const type = Phaser.Math.Between(0, TILE_COLORS.length - 1);
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
                const toWorldY = anim.toY * TILE_SIZE + TILE_SIZE / 2;
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
        this.time.delayedCall(550, () => {
            // Recreate all sprites (will place new tiles at top of screen temporarily)
            const savedAnimations = this.tweens.getAllTweens();
            this.renderGrid();
            
            // Now animate new tiles falling down
            newTiles.forEach(newTile => {
                const toWorldY = newTile.y * TILE_SIZE + TILE_SIZE / 2;
                const sprite = this.tileSprites[newTile.y][newTile.x];
                if (sprite && sprite.rect) {
                    sprite.rect.y = -TILE_SIZE; // Start above screen
                    this.tweens.add({
                        targets: sprite.rect,
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

const config = {
    type: Phaser.AUTO,
    width: GRID_WIDTH * TILE_SIZE,
    height: GRID_HEIGHT * TILE_SIZE,
    backgroundColor: '#2c3e50',
    scene: Match3Scene
};

const game = new Phaser.Game(config);
