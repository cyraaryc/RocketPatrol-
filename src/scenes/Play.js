class Play extends Phaser.Scene {

    constructor(){
        super('playScene')
    }
    create(){
      this.timer = 1;
      this.camera = this.cameras.main;
      this.down = true;
      this.alpha = 600;
        // green UI background
this.starfield = this.add.tileSprite(0, 0, 1280, 960, 'starfield').setOrigin(0, 0)
this.starfield80 = this.add.tileSprite(0, 0, 1280, 960, 'starfield80').setOrigin(0, 0)
this.starfield60 = this.add.tileSprite(0, 0, 1280, 960, 'starfield60').setOrigin(0, 0)
this.starfield60.setAlpha(.8)




// white borders
this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 3000).setOrigin(0, 0)

this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship2', 0, 2000).setOrigin(0,0)
this.ship02.moveSpeed = 7
this.ship02.setScale(1.2)
this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 1000).setOrigin(0,0)
this.ship04 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*2, 'spaceship2', 0, 3500).setOrigin(0, 0)
this.ship04.moveSpeed = 7
this.ship04.setScale(1.2)
this.ship05= new Spaceship(this, game.config.width + borderUISize*6, borderUISize*10, 'spaceship', 0, 500).setOrigin(0, 0)


this.p1Rocket = new Rocket(this, game.config.width/2, 860, 'rocket').setOrigin(0.5, 0)

this.player = this.physics.add.sprite(450, 876, 'p');


this.player.body.setAllowGravity(false);
this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0,5)
this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0, 5)
this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0,5);
this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0,5)
// this.player = new Player(this, game.config.width/2, game.config.height/2, 'rocket').setOrigin(0.5, 0)

    // add spaceships (x3)

  // define keys
  keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
  keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
  keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
  keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
  // keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
  // keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
  // keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
  // keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

  this.p1Score = 0
  let scoreConfig = {
    fontFamily : 'test',
    fontSize: '30px',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    align: 'center',
    padding: {
      top: 5,
      bottom: 5,
    },
    fixedWidth: 200 
  }
  let Menuconfigs = {
    fontFamily : 'test',
    fontSize: '22px',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    align: 'center',
    padding: {
      top: 5,
      bottom: 5,
    },
  }
  
  this.scoreLeft = this.add.text(game.config.width-(game.config.width/1.07), game.config.height-(game.config.height/1.1), this.p1Score, scoreConfig)
  this.timerright = this.add.text(game.config.width-(game.config.width/4.5), game.config.height-(game.config.height/1.1), this.timer, scoreConfig)

  // GAME OVER flag
this.gameOver = false

// 60-second play clock
scoreConfig.fixedWidth = 0
  

this.input.on('pointerdown', (pointer) =>
  {            
      this.p1Rocket.isFiring = true
      this.p1Rocket.sfxShot.play()
  });
this.input.on('pointermove', pointer => {
  if(  this.player.x < pointer.worldX)
    {
      this.player.x += 5

    }else if (  this.player.x > pointer.worldX) {
      this.player.x -= 5
    }

});


    }
    update() {
      const pointer = this.input.activePointer;
      if(  this.player.x +5 < pointer.worldX)
        {
          this.player.x += 5
    
        }else if (  this.player.x -5 > pointer.worldX) {
          this.player.x -= 5
        }
        let scoreConfig = {
          fontFamily : 'test',
          fontSize: '30px',
          backgroundColor: '#000000',
          color: '#FFFFFF',
          align: 'center',
          padding: {
            top: 5,
            bottom: 5,
          },
          fixedWidth: 1000 
        }
      if (this.timerright.text <=0 ){
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER',scoreConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart',scoreConfig).setOrigin(0.5)
        this.gameOver = true
      }
      if(this.p1Rocket.y <= game.config.height-(game.config.height/1.01)) {
        this.timer+=1
        this.p1Rocket.reset()
    }
      if (this.p1Rocket.y >820){
      this.p1Rocket.x = this.player.x
      }


      this.timerright.text = (game.settings.gameTimer/1000 - this.timer).toFixed(2)
      if (this.timer<(game.settings.gameTimer/1000)){this.timer +=1/60;} else {this.timerright.text = 0}
      
      if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        this.scene.start("Menuscene")
      }
      if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
        this.scene.restart()
    }
        this.starfield.tilePositionX -= 8
        this.starfield80.tilePositionX -= 2
        this.starfield60.tilePositionX -= 1


        if(!this.gameOver) {               
        this.p1Rocket.update()
        // this.player.update()
 this.ship01.update()               // update spaceships (x3)
 this.ship02.update()
 this.ship03.update()
 this.ship04.update()
 this.ship05.update()


        }
        if(this.checkCollision(this.p1Rocket, this.ship05)) {
 

           this.p1Rocket.reset()
           this.shipExplode(this.ship05)   
        }
 if(this.checkCollision(this.p1Rocket, this.ship03)) {
 

   this.p1Rocket.reset()
   this.shipExplode(this.ship03)   
}
if (this.checkCollision(this.p1Rocket, this.ship02)) {


  this.p1Rocket.reset()
  this.shipExplode(this.ship02)
}
if (this.checkCollision(this.p1Rocket, this.ship01)) {



  this.p1Rocket.reset()
  this.shipExplode(this.ship01)
}
    
if (this.checkCollision(this.p1Rocket, this.ship04)) {


  this.p1Rocket.reset()
  this.shipExplode(this.ship04)
}}
      checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
          return true
        } else {
          return false
        }
         }
      shipExplode(ship) {
        ship.moveSpeed = Math.floor((Math.random() * 3)+5);
        this.timer -=1;
        // temporarily hide ship
        ship.alpha = 0
        // create explosion sprite at ship's position
        let emitter = this.add.particles(ship.x, ship.y, 'rocket', {
          frame: [ 'red', 'yellow', 'green' ],
          lifespan: 4000,
          speed: { min: 150, max: 250 },
          scale: { start: 0.8, end: 0 },
          gravityY: 150,
          blendMode: 'ADD',
          emitting: false
      });
      emitter.explode(16);          ship.reset()                         // reset ship position
          ship.alpha = 1                       // make ship visible again

        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score     
        this.sound.play('sfx-explosion')
        this.camera.shake();

      }
      alphatest(down,num){
        if (down == true) {
          num -= 1;
        } else if (down == false) {
          num += 1;
        }
        console.log(down)
        console.log(num)
        this.alpha = num
        this.camera.setAlpha(num/600);
      }
}
