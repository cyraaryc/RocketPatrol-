class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame)
      scene.add.existing(this)  
      this.moveSpeed = 2

    }
    create(){


    }

    update() {
        if(keyD.isDown){
            this.x += this.moveSpeed
        }
        if(keyA.isDown){
            this.x -= this.moveSpeed
        }
        if(keyW.isDown){
            this.y -= this.moveSpeed
        }
        if(keyS.isDown){
            this.y += this.moveSpeed
        }
    }
}