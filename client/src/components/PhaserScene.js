// import phaser module
import Phaser from 'phaser';
import io from 'socket.io-client';
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';

const URL = process.env.NODE_ENV === 'production' ? 'ws://tritontalk.com' : 'http://localhost:3001'
// create class for scene 1
class PhaserScene extends Phaser.Scene {

  constructor(playerMoved) {
    // create identifier for class scene
    super({ key: 'phaserScene' });
  }

  preload() {
    //This is the background image used for the map/environment
    this.load.image('background', 'assets/Starfall-Town.png');
    this.load.image('geisel', 'android-chrome-512x512.png');
    this.load.image('walk', 'assets/walk.png');
    this.load.image('landing', 'assets/landing.png');


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

    //Number of booths currently open in library walk determines length of generated path
    this.boothCount = 10

    //Set world boundaries to match background image size
    this.physics.world.setBounds(0, 0, 500*this.boothCount, 600, true, true, true, true);

    //Set background image. If it doesn't move, it doesn't need to be a sprite anymore
    //this.background = this.physics.add.sprite(0, 0, 'background');
    this.geisel = this.physics.add.sprite(500*this.boothCount, 44, 'geisel');

    //Generate the library walk path
    for (let i = 0; i < this.boothCount; i++) {
      var tempWalk = this.physics.add.sprite(500*i, 100, 'walk');
      var landingtop = this.physics.add.sprite(500*i, 0, 'landing');
      var landingBot = this.physics.add.sprite(500*i, 500, 'landing');
      tempWalk.setOrigin(0, 0);
      landingtop.setOrigin(0, 0);
      landingBot.setOrigin(0, 0);
    }
    
    //this.background.setOrigin(0, 0);
    this.geisel.setOrigin(0, 0);

    //this.background.setScale(2, 2);
    
    //Set player position
    this.player = this.physics.add.sprite(0, 0, 'player');
    //this.player.setCollideWorldBounds(true);
    this.player.setOrigin(0.5, 0.5);
    
    
	
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

    //Player text shows name and college, follows player
    var playerStyle = { font: '12px Arial',
    fill: 'BLUE',
    wordWrap: true,
    wordWrapWidth: this.player.width,
    align: 'center'};
    this.playerText = this.add.text(0, -50, 'Johnny Nguyen \nRevelle', playerStyle);
    this.playerText.setOrigin(0.5, 0.5);

    //User controls a container which contains the player sprite and player text
    this.container = this.add.container((1000*this.boothCount) - 128, 268, [this.player, this.playerText]);
    this.container.setSize(30, 30);
    this.physics.world.enable(this.container);
    this.container.body.setCollideWorldBounds(true);
    
    //Generate walls around the library walk
    for (let i = 0; i < this.boothCount; i++) {
      var walls = this.physics.add.staticGroup();
      
      var wallTop = this.add.rectangle((500*i)+150, 0, 350, 100, 0x5e32a8, 0);
      var wallBottom = this.add.rectangle((500*i)+150, 500, 350, 100, 0x5e32a8, 0);
      wallTop.setOrigin(0,0);
      wallBottom.setOrigin(0,0);
      walls.add(wallTop);
      walls.add(wallBottom);
      this.physics.add.collider(this.container, wallTop);
      this.physics.add.collider(this.container, wallBottom);
      //this.physics.add.collider()
    }
    
    this.container.depth = 1000;
    
    //TODO: Make this a container?
    //Menu that appears when player interacts
    this.menu = this.add.rectangle(1200, 600, 500, 1250, 0x5e32a8, 70);
    this.menu.visible = false; //Appears when prompted
    this.menu.setScrollFactor(0); //Follows camera
    
    //TODO: Make walls to block player movement
    //this.wall = this.physics.add.rectangle(1200, 600, 500, 1250, 0x5e32a8, 70);

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

    this.keyShift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

    this.key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this.key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);

    this.upKeyDebug = this.add.text(300, 10, 'Up', { font: '16px Courier', fill: '#00ff00' });

    this.socket = io(URL, {transport: ['websocket']})
    this.playerData = null
    this.player_updates = []
    this.players = {}


    this.socket.on('update-player-data', data => {
      this.player_updates.push(data)
    })

    this.socket.on('new-player', data => {
      console.log('new player' ,data)
      const {x, y, playerName} = data

      //Set player position
      const newplayer = this.physics.add.sprite(0, 0, 'player');

      //this.player.setCollideWorldBounds(true);
      newplayer.setOrigin(0.5, 0.5);
      newplayer.depth = 1000;

      //Player text shows name and college, follows player
      var playerStyle = { 
        font: '12px Arial',
        fill: 'BLUE',
        wordWrap: true,
        wordWrapWidth: newplayer.width,
        align: 'center'
      };

      var newPlayerText = this.add.text(0, -50, playerName + '\nRevelle', playerStyle)
      newPlayerText.setOrigin(0.5, 0.5);

      //User controls a container which contains the player sprite and player text
      const container = this.add.container(x, y, [newplayer, newPlayerText]);
      container.setSize(64, 64);
      this.physics.world.enable(container);
      container.body.setCollideWorldBounds(true);

      this.players[playerName] = container
    })

    /*
    //set up a callback that logs new data (for now)
    this.socket.on('update-players', (data) => {
      console.log(data)
      if (data[this.socket.id]) {
        this.upKeyDebug.setText([
            (this.keyW.isDown ? 'Up ' : '') + 
            (this.keyA.isDown ? 'Left ' : '') + 
            (this.keyS.isDown ? 'Down ' : '') + 
            (this.keyD.isDown ? 'Right ' : ''),
            'position: ' + this.container.x + ',' + this.container.y,
            'position from socket.io: ' + data[this.socket.id].x + ',' + data[this.socket.id].y, 
            'click count: ' + this.clickCount
        ]);
      }
      console.log('new player data received', data)
      this.playerData = data
    })
    */

    //communicate our current state on instantiation
    this.socket.on('ready', () => {
      this.socket.emit('new-player', {
        x: this.container.x,
        y: this.container.y,
        vx: 0,
        vy: 0,
        playerName: this.socket.id
      });
    });

    this.socket.on('delete-player', data => {
      this.players[data].destroy()

      //Object.keys(this.players).forEach(key => if(key === data) this.players[key].destroy())
    })

    this.socket.on('current-players', (data) => {
      for( let p in data ){
        if(p === this.socket.id)
          continue

        const {x, y, vx, vy, playerName} = data[p]

        //Set player position
        let newplayer = this.physics.add.sprite(0, 0, 'player');

        //this.player.setCollideWorldBounds(true);
        newplayer.setOrigin(0.5, 0.5);
        newplayer.depth = 1000;

        //Player text shows name and college, follows player
        var playerStyle = { 
          font: '12px Arial',
          fill: 'BLUE',
          wordWrap: true,
          wordWrapWidth: newplayer.width,
          align: 'center'
        };

        var newPlayerText = this.add.text(0, -50, playerName + '\nRevelle', playerStyle)
        newPlayerText.setOrigin(0.5, 0.5);

        //Container contains the player sprite and player text
        this.players[playerName] = this.add.container(x, y, [newplayer, newPlayerText]);
        this.players[playerName].setSize(64, 64);
        this.physics.world.enable(this.players[playerName]);
        this.players[playerName].body.setCollideWorldBounds(true);
      }
    })
  }
  
  update () {
    this.container.body.velocity.set(0, 0);
    this.isMoving = false;
    this.isMovingX = false;
    var velocity = 250;
    if(this.keyShift.isDown)
      velocity *= 2

    if(this.key1.isDown)
      this.player.setTexture('player')
    if(this.key2.isDown)
      this.player.setTexture('bunny')
    
    //TODO: Fix animations so that sprite always stops at standing frame

    if (this.keyA.isDown) {
      //this.menu.visible = true;
      this.container.body.setVelocityX(-velocity);
      this.isMoving = true;
      this.isMovingX = true;
      this.player.anims.play('walkLeft', true);
      /*
      this.player.once('animationcomplete', ()=>{
        this.player.anims.play();
      }*/

      this.doNotUpdate = false
    this.socket.emit('move-player', {
      x: this.container.x,
      y: this.container.y,
      vx: this.container.body.velocity.x,
      vy: this.container.body.velocity.y,
      playerName: this.socket.id
    });
    } else if (this.keyD.isDown) {
      //this.menu.visible = false;
      this.container.body.setVelocityX(velocity);
      this.isMovingX = true;
      this.isMoving = true;
      this.player.anims.play('walkRight', true);

      this.doNotUpdate = false

    this.socket.emit('move-player', {
      x: this.container.x,
      y: this.container.y,
      vx: this.container.body.velocity.x,
      vy: this.container.body.velocity.y,
      playerName: this.socket.id
    });
    }

    if (this.keyW.isDown) {
      this.container.body.setVelocityY(-velocity);
      this.isMoving = true;
      if (!this.isMovingX) {
        this.player.anims.play('walkUp', true);
      }

      this.doNotUpdate = false
    this.socket.emit('move-player', {
      x: this.container.x,
      y: this.container.y,
      vx: this.container.body.velocity.x,
      vy: this.container.body.velocity.y,
      playerName: this.socket.id
    });
    } else if (this.keyS.isDown) {
      this.container.body.setVelocityY(velocity);
      this.isMoving = true;
      if (!this.isMovingX) {
        this.player.anims.play('walkDown', true);
      }

      this.doNotUpdate = false
    this.socket.emit('move-player', {
      x: this.container.x,
      y: this.container.y,
      vx: this.container.body.velocity.x,
      vy: this.container.body.velocity.y,
      playerName: this.socket.id
    });
    }
    if(!this.isMoving){
      this.player.anims.stop();
      if(!this.doNotUpdate)
        this.socket.emit('move-player', {
          x: this.container.x,
          y: this.container.y,
          vx: this.container.body.velocity.x,
          vy: this.container.body.velocity.y,
          playerName: this.socket.id
        });

    this.doNotUpdate = true
    }

    /*
    this.socket.emit('move-player', {
      x: this.container.x,
      y: this.container.y,
      vx: this.container.body.velocity.x,
      vy: this.container.body.velocity.y,
      playerName: this.socket.id
    });
    */

    while(this.player_updates.length > 0){

      const {x, y, vx, vy, playerName} = this.player_updates.shift()

      if(this.players[playerName]){
        this.players[playerName].setX(x);
        this.players[playerName].setY(y);
        this.players[playerName].body.setVelocityX(vx);
        this.players[playerName].body.setVelocityY(vy);

        var tempMovingX = false

        if (vx < 0) {
          tempMovingX = true;
          this.players[playerName].first.anims.play('walkLeft', true);
        } 
        else if (vx > 0) {
          tempMovingX = true;
          this.players[playerName].first.anims.play('walkRight', true);
        }

        else if (vy < 0) {
          this.players[playerName].first.anims.play('walkUp', true);
        } 
        else if (vy > 0) {
          this.players[playerName].first.anims.play('walkDown', true);
        } else {
          this.players[playerName].first.anims.stop();
        }
      } 

      /*
      else {
        //Set player position
        var newplayer = this.physics.add.sprite(0, 0, 'player');

        //this.player.setCollideWorldBounds(true);
        newplayer.setOrigin(0.5, 0.5);
        newplayer.depth = 1000;

        //Player text shows name and college, follows player
        var playerStyle = { 
          font: '12px Arial',
          fill: 'BLUE',
          wordWrap: true,
          wordWrapWidth: newplayer.width,
          align: 'center'
        };

        var newPlayerText = this.add.text(0, -50, playerName + '\nRevelle', playerStyle)
        newPlayerText.setOrigin(0.5, 0.5);

        //User controls a container which contains the player sprite and player text
        this.players[playerName] = this.add.container(x, y, [newplayer, newPlayerText]);
        this.players[playerName].setSize(64, 64);
        this.physics.world.enable(this.players[playerName]);
        this.players[playerName].body.setCollideWorldBounds(false);
        //this.container.body.velocity.set(0, 0);
      }
      */
    }

    /*
    for(let player in this.playerData){

      if(player === this.socket.id) {
        console.log("its me: " + this.playerData[player].x)
        continue
      }
      
      if(this.players[player]){
        console.log("setting position for " + player)
        this.players[player].setX(this.playerData[player].x);
        this.players[player].setY(this.playerData[player].y);
        this.players[player].body.setVelocityX(this.playerData[player].vx);
        this.players[player].body.setVelocityY(this.playerData[player].vy);

        console.log("received VELOCITY: " + this.players[player].body.velocity.x);

        var tempMovingX = false
        if (this.players[player].body.velocity.x < 0) {
          tempMovingX = true;
          this.players[player].first.anims.play('walkLeft', true);
        } 
        else if (this.players[player].body.velocity.x > 0) {
          tempMovingX = true;
          this.players[player].first.anims.play('walkRight', true);
        }

        if (!tempMovingX) {
          if (this.players[player].body.velocity.y < 0) {
            this.players[player].first.anims.play('walkUp', true);
          } 
          else if (this.players[player].body.velocity.y > 0) {
            this.players[player].first.anims.play('walkDown', true);
          } 
          else {
            this.players[player].first.anims.stop();
          }
        }
      } 
      else {
        console.log("creating new " + player)

        //Set player position
        console.log(player);
        var newplayer = this.physics.add.sprite(0, 0, 'player');
        //this.player.setCollideWorldBounds(true);
        newplayer.setOrigin(0.5, 0.5);
        newplayer.depth = 1000;

        //Player text shows name and college, follows player
        var playerStyle = { font: '12px Arial',
        fill: 'BLUE',
        wordWrap: true,
        wordWrapWidth: newplayer.width,
        align: 'center'};
        var newPlayerText = this.add.text(0, -50, this.playerData[player].playerName + '\nRevelle', playerStyle);
        newPlayerText.setOrigin(0.5, 0.5);

        //User controls a container which contains the player sprite and player text
        this.players[player] = this.add.container(this.playerData[player].x, this.playerData[player].y, [newplayer, newPlayerText]);
        this.players[player].setSize(64, 64);
        this.physics.world.enable(this.players[player]);
        this.players[player].body.setCollideWorldBounds(false);
        this.container.body.velocity.set(0, 0);
      }
    }
  */
  }
}
export default PhaserScene;
