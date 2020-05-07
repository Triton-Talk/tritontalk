// import phaser module
import Phaser from 'phaser';

// create class for scene 1
class PhaserScene extends Phaser.Scene {

  constructor() {
    // create identifier for class scene
    super({ key: 'phaserScene' });
  }

  preload() {
    this.load.setBaseURL('http://labs.phaser.io');
    this.load.image('ball', 'assets/sprites/green_ball.png');
  }

  create() {
    this.player = this.physics.add.image(400, 300, 'ball');
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.player.setCollideWorldBounds(true);
    this.upKeyDebug = this.add.text(300, 10, 'Up', { font: '16px Courier', fill: '#00ff00' });
  }

update () {
    this.player.setVelocity(0);

    if (this.keyA.isDown)
    {
        this.player.setVelocityX(-300);
    }
    else if (this.keyD.isDown)
    {
        this.player.setVelocityX(300);
    }

    if (this.keyW.isDown)
    {
        this.player.setVelocityY(-300);
    }
    else if (this.keyS.isDown)
    {
        this.player.setVelocityY(300);
    }

    this.upKeyDebug.setText([
        (this.keyW.isDown ? 'Up ' : '') + (this.keyA.isDown ? 'Left ' : '') + (this.keyS.isDown ? 'Down ' : '') + (this.keyD.isDown ? 'Right ' : ''),
        'position: ' + this.player.x + ',' + this.player.y
    ]);
}

}


export default PhaserScene;
