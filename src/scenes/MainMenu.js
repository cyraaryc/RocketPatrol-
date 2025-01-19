
class Menu extends Phaser.Scene {
  graphics;
  path;
  follower;
    constructor() {
      super("Menuscene")
    }
    preload() {
        // load images/tile sprites
        this.load.audio('sfx-select', './Assets/sfx-select.wav')
this.load.audio('sfx-explosion', './Assets/sfx-explosion.wav')
this.load.image('rocket', './Assets/laser2.png')
        this.load.image('spaceship', './Assets/spaceship-43.png')
        this.load.image('16', './Assets/16.png')
        this.load.image('p', './Assets/playership.png')


        this.load.image('spaceship2', './Assets/spaceship2.png')
this.load.audio('sfx-shot', './Assets/sfx-shot.wav')
this.load.spritesheet('R', './Assets/Ranimation.png', { frameWidth: 11, frameHeight: 20 });
// this.load.spritesheet('txt', './Assets/rockettext.png', { frameWidth: 1280, frameHeight: 960 });

        this.load.image('starfield', './Assets/starfield100.png')
        this.load.image('starfield80', './Assets/starfield80.png')
        this.load.image('starfield60', './Assets/starfield60.png')


        this.load.spritesheet('explosion', './Assets/explosion(1).png', {
          frameWidth: 64,
          frameHeight: 32,
          startFrame: 0,
          endFrame: 9
      })

      }
    create() {
      const go = this.input.keyboard.on('keydown', function (event) {
        game.settings = {
          spaceshipSpeed: 3,
          gameTimer: 60000    
        }
        this.sound.play('sfx-select')

        this.scene.start('playScene')     }, this);
      this.graphics = this.add.graphics();
      const text = 'ROCKET';
      const startX = 500;
      const startY = 500;
      const fontSize = '50px';
      const fontFamily = 'test';
      const spacing = 55; // Adjust spacing as needed
      
      text.split('').forEach((char, index) => {
        this[`l${index + 1}`] = this.add.text(startX + (index * spacing), startY, char, {
          fontSize: fontSize,
          fontFamily: fontFamily
        }).setOrigin(0.5);
      });
      
      const text2 =  'PATROL';
      text2.split('').forEach((char, index) => {
        this[`l${index + 7}`] = this.add.text(startX + (index * spacing), startY, char, {
          fontSize: fontSize,
          fontFamily: fontFamily
        }).setOrigin(0.5);
      });
      






      this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
      const line1 = new Phaser.Curves.Line([ 100, 100, 100, 105
       ]);
      this.path = this.add.path();
      this.path.add(line1);

      const delayIncrement = 300;
      const totalFollowers = 6;
      
      for (let i = 1; i <= totalFollowers; i++) {
        this[`ball${i}`] = this.add.follower(line1, -100, game.config.height-(game.config.height/1.75), 'rocket');
        this[`ball${i}`].startFollow({
          delay: (i - 1) * delayIncrement,
          duration: 800,
          yoyo: true,
          ease: 'Sine.easeInOut',
          repeat: -1,
        });
      }




        this.anims.create({
          key: 'explode',
          frames: this.anims.generateFrameNumbers('explosion', {
              start: 0,
              end: 9,
              first: 0
          }),
          frameRate: 30
          
        })
      let menuConfig = {
        fontFamily: 'test',
        fontSize: '23px',
        backgroundColor: '#FFFFFFF',
        color: '#FFFFFF',
        align: 'right',
        padding: {
        top: 5,
        bottom: 5,
        },
        fixedWidth: 0
    }      
    // display menu text
    // this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5)
    // this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5)
    menuConfig.backgroundColor = '#FFFFFFF'
    menuConfig.color = '#000'
    this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5)
    // define keys
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    KeyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    KeyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)



}

update() {
for (let i = 1; i <= 12; i++) {
  this[`l${i}`].y = this[`ball${i}`].y;
}


  

  
  // this.Olet.y = this.ball2.y;
  // this.Klet.y = this.ball3.y;



  // this.path.getPoint(this.follower.t, this.follower.vec);
  // this.graphics.fillRect(this.follower.vec.x - 8, this.follower.vec.y - 8, 16, 16);

    if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
      // easy mode
      game.settings = {
        spaceshipSpeed: 3,
        gameTimer: 60000    
      }
      this.sound.play('sfx-select')
      this.scene.start('playScene')    
    }
    if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
      // hard mode
      game.settings = {
        spaceshipSpeed: 4,
        gameTimer: 45000    
      }
      this.sound.play('sfx-select')
      this.scene.start('playScene')    
    }

  }
}