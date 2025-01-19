class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame)
  
      scene.add.existing(this)  
      this.isFiring = false     
      this.moveSpeed = game.settings.spaceshipSpeed     
      this.sfxShot = scene.sound.add('sfx-shot')   
      
    }
//https://opengameart.org/content/space-parallax-background
//https://opengameart.org/content/space-ship-building-bits-volume-1
    
    update() {



        if(Phaser.Input.Keyboard.JustDown(keyFIRE) && !this.isFiring) {
            this.isFiring = true
            this.sfxShot.play()
        }
        if(this.isFiring ) {
            this.y -= 5
        }


    }
    
    reset() {

        this.isFiring = false
        this.x = 0  
        this.y = 860
    }
}