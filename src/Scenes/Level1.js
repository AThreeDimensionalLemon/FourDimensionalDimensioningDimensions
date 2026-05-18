class Level1 extends Phaser.Scene {
    constructor() {
        super("level1");
    }

    init() {

        //configs
        this.tileEdgeDimension = 70;

        //scene members
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
        this.inputs = {

        }
    }

    preload() {

        //queue to-be-loaded map assets
        this.load.setPath("./assets/maps/");
        for (const set in this.sets) {
            this.load.image(`spritesheet_terrain_${set}`, `spritesheet_terrain_${set}.png`);
        }
        this.load.image("spritesheet_detail", "spritesheet_detail.png");
        this.load.tilemapTiledJSON("map", "map.json");

        //queue to-be-loaded character assets
    }

    create() {

        //create map
        this.map = this.add.tilemap("map", this.tileEdgeDimension, this.tileEdgeDimension, 96, 20);
        const detailTileset = this.map.addTilesetImage("detail", "spritesheet_detail");
        for (const set in this.sets) {
            const terrainTileset = this.map.addTilesetImage(`${set}_terrain`, `spritesheet_terrain_${set}`);
            this.sets[set].terrainTileset = terrainTileset;
            this.sets[set].layers.back = this.map.createLayer(`back_${set}`, terrainTileset);
            // this.sets[set].layers.back.setTint("0x000000");
            // this.sets[set].layers.back.setTintMode("OVERLAY", 0, 0, this.map.width, this.map.length);
            this.sets[set].layers.det = this.map.createLayer(`det_${set}`, detailTileset);
            this.sets[set].layers.fore = this.map.createLayer(`fore_${set}`, terrainTileset);
            this.sets[set].layers.fore.setCollisionByProperty({ collides: true });
            if (set != "spring") {
                for (const layer in this.sets[set].layers) {
                    this.sets[set].layers[layer].setVisible(false);
                }
            }
        }

        //setup camera
        this.cameras.main.setBounds(0, this.map.heightInPixels - game.config.height, game.config.width, game.config.height)

        //input keys
        this.inputs.keybord
    }

    update() {
        
    }
}