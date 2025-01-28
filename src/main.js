

//Cyra Witten
// Rocket Patrol - 
// 10 hours
// Display the time remaining (in seconds) on the screen (3), Create a new title screen(3), Implement parallax scrolling for the background (3),
//Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)
//Implement a new timing/scoring mechanism that adds time to the clock for successful hits and subtracts time for misses (5)
//Implement mouse control for player movement and left mouse click to fire (5)
//Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (5)
// 29 total, or 26 if the the timer doesnt count twice
// https://opengameart.org/content/space-parallax-background -background //https://opengameart.org/content/space-ship-building-bits-volume-1 -
//attrubution to Redshrike // https://opengameart.org/content/boxy-bold-truetype-font - font

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
