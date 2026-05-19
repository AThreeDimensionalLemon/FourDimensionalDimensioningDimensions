"use strict"

const game = new Phaser.Game({
    width: 2240,
    height: 1400,
    type: Phaser.CANVAS,
    parent: 'phaser-game',
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    physics: {
        default: "arcade",
        gravity: {
            x: 0,
            y: 1500
        }
    },
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT
    },
    autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY,
    scene: [Level1]
});