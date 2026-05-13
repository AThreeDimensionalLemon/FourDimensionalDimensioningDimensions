"use strict"

const gameConfig = {
    width: 1120,
    height: 700,
    type: Phaser.CANVAS,
    parent: 'phaser-game',
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    physics: {
        default: "arcade"
    },
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT
    },
    autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY,
    scene: [Level1]
}

const game = new Phaser.Game(gameConfig);