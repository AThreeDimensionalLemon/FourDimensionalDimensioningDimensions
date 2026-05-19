class Level1 extends Phaser.Scene {
    constructor() {
        super("level1");
    }

    switchSet(targetIndexDifference) {
        for (const layer in this.sets[this.activeSet].layers) {
            if (this.sets[this.activeSet].layers[layer] != null) this.sets[this.activeSet].layers[layer].setVisible(false);
        }
        this.sets[this.activeSet].collider.active = false;
        const setNames = [ "spring", "summer", "fall", "winter" ];
        const currentIndex = setNames.indexOf(this.activeSet);
        this.activeSet = setNames[(currentIndex + targetIndexDifference + setNames.length) % setNames.length];
        for (const layer in this.sets[this.activeSet].layers) {
            if (this.sets[this.activeSet].layers[layer] != null) this.sets[this.activeSet].layers[layer].setVisible(true); // TODO: Remove conditional statement after background layers are finished
        }
        this.sets[this.activeSet].collider.active = true;
    }

    init() {

        // scene configs
        this.movement = {
            maxSpeed: 500,
            acceleration: 500,
            jumpVelocity: 1000,
            drag: 1500
        }

        // scene members
        this.sets = {
            spring: {
                collider: null,
                terrainTileset: null,
                layers: {
                    fore: null,
                    det: null,
                    back: null
                }
            },
            summer: {
                collider: null,
                terrainTileset: null,
                layers: {
                    fore: null,
                    det: null,
                    back: null
                }
            },
            fall: {
                collider: null,
                terrainTileset: null,
                layers: {
                    fore: null,
                    det: null,
                    back: null
                }
            },
            winter: {
                collider: null,
                terrainTileset: null,
                layers: {
                    fore: null,
                    det: null,
                    back: null
                }
            }
        };
        this.activeSet = "spring";

        // setup world
        this.physics.world.gravity.y = 1500; // TODO: Get rid of this redundant call; theoretically already done in the instantiation of the game, but for some reason, this line is needed to make gravity go
    }

    preload() {

        // queue to-be-loaded map assets
        this.load.setPath("./assets/maps/");
        for (const set in this.sets) {
            this.load.image(`spritesheet_terrain_${set}`, `spritesheet_terrain_${set}.png`);
        }
        this.load.image("spritesheet_detail", "spritesheet_detail.png");
        this.load.tilemapTiledJSON("map", "map.json");

        // queue to-be-loaded character assets
        this.load.setPath("./assets/player");
        // TODO: Animate player sprite; remember to add assets in create()
        // this.load.atlas("spritesheet_walk_player", "spritesheet_walk_player.png", "walk.json");
        this.load.image("tempSprite_walk_player");
    }

    create() {

        // create map visuals
        this.map = this.add.tilemap("map");
        const detailTileset = this.map.addTilesetImage("detail", "spritesheet_detail");
        for (const set in this.sets) {
            const terrainTileset = this.map.addTilesetImage(`${set}_terrain`, `spritesheet_terrain_${set}`);
            this.sets[set].terrainTileset = terrainTileset;
            // TODO: Make background layers; currently figuring out how to tint them slightly black
            // this.sets[set].layers.back = this.map.createLayer(`back_${set}`, terrainTileset);
            // this.sets[set].layers.back.setTint("0x000000");
            // this.sets[set].layers.back.setTintMode("OVERLAY", 0, 0, this.map.width, this.map.length);
            this.sets[set].layers.det = this.map.createLayer(`det_${set}`, detailTileset);
            this.sets[set].layers.fore = this.map.createLayer(`fore_${set}`, terrainTileset);
            this.sets[set].layers.fore.setCollisionByProperty({ collides: true });
            if (set != this.activeSet) {
                for (const layer in this.sets[set].layers) {
                    if (this.sets[set].layers[layer] != null) this.sets[set].layers[layer].setVisible(false); // TODO: Remove conditional statement after background layers are finished
                }
            }
        }

        // create player sprite
        // TODO: Animate player sprite; remember to load assets in preload()
        // this.anims.create({
        //     key: 'walk',
        //     frames: this.anims.generateFrameNames("spritesheet_walk_player", {
        //         prefix: "Symbol 2 instance ",
        //         start: 10000,
        //         end: 10010,
        //         suffix: ".png"
        //     }),
        //     frameRate: 15,
        //     repeat: -1
        // });
        this.playerSprite = this.physics.add.sprite(game.config.width / 2, this.map.heightInPixels - game.config.height / 4, "tempSprite_walk_player");
        for (const set in this.sets) {
            this.sets[set].collider = this.physics.add.collider(this.playerSprite, this.sets[set].layers.fore);
            if (set != this.activeSet) this.sets[set].collider.active = false;
        }
        this.playerSprite.body.setMaxVelocityX(this.movement.maxSpeed);
        
        // setup camera
        this.cameras.main.setBounds(0, this.map.heightInPixels - game.config.height, game.config.width, game.config.height);

        // setup inputs
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.cursorKeys.up.on("down", () => {
            if (!this.playerSprite.body.onFloor()) return;
            this.playerSprite.body.setVelocityY(-this.movement.jumpVelocity);
            let targetSet = 0;
            if (this.cursorKeys.left.isDown) targetSet = -1;
            else if (this.cursorKeys.right.isDown) targetSet = 1;
            else targetSet = 2;
            this.switchSet(targetSet);
        });
    }

    update(time, delta) {
        
        // handle player input
        if(this.cursorKeys.left.isDown) {
            this.playerSprite.body.setAccelerationX(-this.movement.acceleration);
        } 
        else if(this.cursorKeys.right.isDown) {
            this.playerSprite.body.setAccelerationX(this.movement.acceleration);
        } 
        else {            
            this.playerSprite.body.setAccelerationX(0);
            this.playerSprite.body.setDragX(this.movement.drag);
        }
    }
}