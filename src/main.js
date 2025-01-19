let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 960,
    scene: [ Menu,Play ],
    physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 150 }
      }
  },
    
  }

let game = new Phaser.Game(config)
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT, KeyUP, KeyDOWN, keyW, keyS, keyA, keyD