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
    //This is the background image used for the map/environment
    this.load.image('background', 'assets/Starfall-Town.png');
    
    //This is the player sprite with animation frames
    this.load.spritesheet('player', 'assets/Char_Sprite_Sheet.png',{
      frameWidth: 64,
      frameHeight: 64,
      endFrame: 15
    });

    //TODO: Add more images for buildings, trees, etc for interaction
    //this.load.image('building', 'building.png');

    //TODO: Add other "players" to interact with
    /*this.load.spritesheet('npc', 'assets/NPC_Sprite_Sheet.png',{
      frameWidth: 64,
      frameHeight: 64,
      endFrame: 15
    });*/

    //TODO: Add a menu that pops up when interacting with another player
    //Display a "request call" button, profile picture, and basic user info?
    //this.load.image('building', 'building.png');
  }
	
  create() {
    //TODO: Fix game object positionings. I'm using literal unflexible pixel values
    //When images are created, they stack over each other

    //Set world boundaries to match background image size
    this.physics.world.setBounds(0, 0, 2056, 2056, true, true, true, true);

    //Set background image. If it doesn't move, it doesn't need to be a sprite anymore
    this.background = this.physics.add.sprite(0, 0, 'background');
    this.background.setOrigin(0, 0);
    this.background.setScale(2, 2);
    
    //Set player position
    this.player = this.physics.add.sprite(0, 0, 'player');
    //this.player.setCollideWorldBounds(true);
    this.player.setOrigin(0.5, 0.5);

    //Title at the top of game screen
    var titleStyle = { font: '32px Arial',
                       fill: 'WHITE',
                       wordWrap: true,
                       align: 'center'};
    this.title = this.add.text(500, 0, 'The Virtual Library Walk', titleStyle);
    this.title.setScrollFactor(0); //Follows camera
    
    //Player text shows name and college, follows player
    var playerStyle = { font: '12px Arial',
                        fill: 'BLUE',
                        wordWrap: true,
                        wordWrapWidth: this.player.width,
                        align: 'center'};
    this.playerText = this.add.text(0, -50, 'Johnny Nguyen \nRevelle', playerStyle);
    this.playerText.setOrigin(0.5, 0.5);
	
	  //Player sprite's animated walk cycles for each direction
    this.anims.create({
        key: 'walkDown',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2, first: 3 }),
        frameRate: 8,
        repeat: 0
    });
	
    this.anims.create({
        key: 'walkLeft',
        frames: this.anims.generateFrameNumbers('player', { start: 4, end: 6, first: 7 }),
        frameRate: 8,
        repeat: 0
    });
    
    this.anims.create({
        key: 'walkRight',
        frames: this.anims.generateFrameNumbers('player', { start: 8, end: 10, first: 11 }),
        frameRate: 8,
        repeat: 0
    });
    
    this.anims.create({
        key: 'walkUp',
        frames: this.anims.generateFrameNumbers('player', { start: 12, end: 14, first: 15 }),
        frameRate: 8,
        repeat: 0
    });
    
    //User controls a container which contains the player sprite and player text
    this.container = this.add.container(1000, 500, [this.player, this.playerText]);
    this.container.setSize(64, 64);
    this.physics.world.enable(this.container);
    this.container.body.setCollideWorldBounds(true);
    
    //TODO: Make this a container?
    //Menu that appears when player interacts
    this.menu = this.add.rectangle(1200, 600, 500, 1250, 0x5e32a8, 70);
    this.menu.visible = false; //Appears when prompted
    this.menu.setScrollFactor(0); //Follows camera

    //Camera follows the container as it moves until the map's edge
    var camera = this.cameras.main;
    camera.startFollow(this.container);

    //Camera just goes black when I try to apply physics to have it collide with bounds
    //camera.setPosition(500, 500);
    //this.physics.world.enable(camera);
    //camera.body.setCollideWorldBounds(true);
    
    
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
          'position: ' + this.background.x + ',' + this.background.y,
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
    this.container.body.velocity.set(0, 0);
    this.isMoving = false;
    var velocity = 250;
    
    //TODO: Fix animations so that sprite always stops at standing frame
    if (this.keyA.isDown)
    {
      this.menu.visible = true;
      this.container.body.velocity.set(-velocity, 0);
      this.isMoving = true;
      this.player.anims.play('walkLeft', true);
      /*
      this.player.once('animationcomplete', ()=>{
        this.player.anims.play();
      }*/
    }
    else if (this.keyD.isDown)
    {
      this.menu.visible = false;
      this.container.body.velocity.set(velocity, 0);
      this.isMoving = true;
      this.player.anims.play('walkRight', true);
    }
    else if (this.keyW.isDown)
    {
      this.container.body.velocity.set(0, -velocity);
      this.isMoving = true;
	  this.player.anims.play('walkUp', true);
    }
    else if (this.keyS.isDown)
    {
      this.container.body.velocity.set(0, velocity);
      this.isMoving = true;
      this.player.anims.play('walkDown', true);
    }
    else
    {
      this.player.anims.stop();
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
      }/*
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
