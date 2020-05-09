// import phaser module
import Phaser from 'phaser';
import io from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001'

// create class for scene 1
class PhaserScene extends Phaser.Scene {

  constructor(playerMoved) {
    // create identifier for class scene
    super({ key: 'phaserScene' });
  }

  preload() {
    this.load.setBaseURL('https://labs.phaser.io');
    this.load.image('player', 'assets/sprites/ghost.png');
    this.load.image('bunny', 'assets/sprites/bunny.png');
  }

  create() {
    this.player = this.physics.add.sprite(400, 300, 'player');
    this.player.setCollideWorldBounds(true);

    this.player.setInteractive()
    this.clickCount = 0
    this.input.on('gameobjectdown', console.log) 

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    this.key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this.key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);

    this.upKeyDebug = this.add.text(300, 10, 'Up', { font: '16px Courier', fill: '#00ff00' });

    this.socket = io(URL);
    this.playerData = null
    this.players = {}


    //set up a callback that logs new data (for now)
    this.socket.on('update-players', (data) => {

      this.upKeyDebug.setText([
          (this.keyW.isDown ? 'Up ' : '') + 
          (this.keyA.isDown ? 'Left ' : '') + 
          (this.keyS.isDown ? 'Down ' : '') + 
          (this.keyD.isDown ? 'Right ' : ''),
          'position: ' + this.player.x + ',' + this.player.y,
          'position from socket.io: ' + data[this.socket.id].x + ',' + data[this.socket.id].y, 
          'click count: ' + this.clickCount
      ]);

      console.log('new player data received', data)
      this.playerData = data

    })

    //communicate our current state on instantiation
    this.socket.emit('new-player', {
      x: this.player.x,
      y: this.player.y,
      vx: 0,
      vy: 0,
      playerName: this.socket.id
    });
  }

  update () {
      this.player.setVelocity(0);
      this.isMoving = false;

      if (this.keyA.isDown)
      {
          this.player.setVelocityX(-300);
          this.isMoving = true;
      }
      else if (this.keyD.isDown)
      {
          this.player.setVelocityX(300);
          this.isMoving = true;
      }

      if (this.keyW.isDown)
      {
          this.player.setVelocityY(-300);
          this.isMoving = true;
      }
      else if (this.keyS.isDown)
      {
          this.player.setVelocityY(300);
          this.isMoving = true;
      }

      if(this.isMoving){
        this.socket.emit('move-player', {
          x: this.player.x,
          y: this.player.y,
          playerName: this.socket.id
        });
      }

      if(this.key1.isDown)
        this.player.setTexture('player')

      if(this.key2.isDown)
        this.player.setTexture('bunny')

      for(let player in this.playerData){
        if(player === this.socket.id)
          continue

        if(this.players[player]){
          this.players[player].setX(this.playerData[player].x);
          this.players[player].setY(this.playerData[player].y);
        }

        else
          this.players[player] = this.physics.add.image(
                  this.playerData[player].x, 
                  this.playerData[player].y, 
                  'player')
      }
/*
      this.upKeyDebug.setText([
          (this.keyW.isDown ? 'Up ' : '') + 
          (this.keyA.isDown ? 'Left ' : '') + 
          (this.keyS.isDown ? 'Down ' : '') + 
          (this.keyD.isDown ? 'Right ' : ''),
          'position: ' + this.player.x + ',' + this.player.y
      ]);
      */

  }
}


export default PhaserScene;
