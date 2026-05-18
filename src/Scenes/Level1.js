class Level1 extends Phaser.Scene {
    constructor() {
        super("level1");
    }

    init() {

        // configs
        this.tileEdgeDimension = 70;

        // scene members
        this.sets = {
            spring: {
                terrainTileset: null,
                layers: {
                    fore: null,
                    det: null,
                    back: null
                }
            },
            summer: {
                terrainTileset: null,
                layers: {
                    fore: null,
                    det: null,
                    back: null
                }
            },
            fall: {
                terrainTileset: null,
                layers: {
                    fore: null,
                    det: null,
                    back: null
                }
            },
            winter: {
                terrainTileset: null,
                layers: {
                    fore: null,
                    det: null,
                    back: null
                }
            }
        }
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
        this.load.setPath("./assets/player")
        // TODO: Animate player sprite; remember to add assets in create()
        // this.load.atlas("spritesheet_walk_player", "spritesheet_walk_player.png", "walk.json");
        this.load.image("tempSprite_walk_player");
    }

    create() {

        // create map visuals
        this.map = this.add.tilemap("map", this.tileEdgeDimension, this.tileEdgeDimension, 96, 20);
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
            if (set != "spring") {
                for (const layer in this.sets[set].layers) {
                    if (this.sets[set].layers[layer] != null) this.sets[set].layers[layer].setVisible(false); // TODO: Remove conditional statement when background layers are finished
                }
            }
        }

        // setup map functionality

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
        this.add.sprite(game.config.width / 2, this.map.heightInPixels - game.config.height / 4, "tempSprite_walk_player");

        // setup camera
        this.cameras.main.setBounds(0, this.map.heightInPixels - game.config.height, game.config.width, game.config.height);

        // create input keys
        // this.inputs.keybord
    }

    update() {
        
    }
}