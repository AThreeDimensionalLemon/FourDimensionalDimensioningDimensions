class Level1 extends Phaser.Scene {
    constructor() {
        super("level1");
    }

    preload() {

        //queue to-be-loaded map assets
        this.load.setPath("./assets/maps/");
        this.load.image("spritesheet_terrain_spring");
        this.load.image("spritesheet_terrain_spring");
        this.load.image("spritesheet_terrain_fall");
        this.load.image("spritesheet_detail_fall");
        this.load.image("spritesheet_terrain_winter");
        this.load.image("spritesheet_detail_winter");
        this.load.tilemapTiledJSON("set_spring");
        this.load.tilemapTiledJSON("set_summer");
        this.load.tilemapTiledJSON("set_fall");
        this.load.tilemapTiledJSON("set_winter");
    }

    create() {

//create map sets
        this.sets = [
            this.add.tilemap("set_spring"),
            this.add.tilemap("set_summer"),
            this.add.tilemap("set_fall"),
            this.add.tilemap("set_winter")
        ];
    }

    update() {
        
    }
}