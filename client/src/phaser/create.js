import Phaser from 'phaser';

import createPlayer from './create.player.js'
import createWalk from './create.walk.js'
import createWalls from './create.walls.js'
import createSocket from './io.js'

const URL = process.env.NODE_ENV === 'production' || process.env.REACT_APP_VARIABLE === 'docker' ? 
            '' : 'http://localhost:3001'

const create = game => {

  //set up the library walk and geisel
  createWalk(game)

  //set up the player object
  createPlayer(game)

  //create game walls for the player
  createWalls(game)

  //initialize socket and all necessary communication objects 
  createSocket(game)

  //TODO: Make game a container?

  //Tooltips menu to show users how to do use Tritontalk
  const tooltipsStyle = { 
    font: '14px Arial',
    fill: 'WHITE',
    wordWrap: true,
    wordWrapWidth: game.player.width,
  };

  game.tooltipsText = game.add.text(0, 75, 
                                    "Welcome to Triton Talk!\n" +
                                    "WASD to move your character\n" +
                                    "Hold shift while moving to sprint\n" +
                                    "Num keys 1-5 to select character\n" +
                                    "Enter to teleport back to Geisel\n" +
                                    "Click on a player to interact\n" +
                                    "Press E at a booth to check it out", tooltipsStyle);
  game.tooltipsText.setOrigin(0.5, 0.5);

  game.tooltipsBox = game.add.rectangle(0, 0, 300, 300, 0x192847, 70);

  game.tooltips = game.add.container(150, 0, [game.tooltipsBox, game.tooltipsText]);
  game.tooltips.setScrollFactor(0); //Follows camera


  //Menu that appears when player interacts with a number of components
  game.menuBox = game.add.rectangle(0, 0, 500, 1350, 0x192847, 70);
  game.menuPortrait = game.add.rectangle(-125, 150, 175, 175, 0xebb734);
  game.menuPic = game.add.image(-125, 150, "profilePicture").setScale(0.25);

  game.menuClose = game.add.text(175, 40, "CLOSE", tooltipsStyle).setInteractive();

  game.menuTitle = game.add.text(-200, 35, "Student/Club Name", tooltipsStyle);
  game.menuText = game.add.text(-225, 250, "Description:\nPull from user profile or club info", tooltipsStyle);

  game.menuCallButton = game.add.rectangle(100, 150, 100, 50, 0xebb734);
  game.menuCallText = game.add.text(50, 150, "Join Call", tooltipsStyle);
  
  //Container holds all menu components
  game.menu = game.add.container(1300, 0, [game.menuBox, game.menuPortrait, game.menuClose, game.menuCallButton, 
                                           game.menuText, game.menuTitle, game.menuPic, game.menuCallText]);
  game.menu.visible = false; //Appears when prompted
  game.menu.setScrollFactor(0); //Follows camera

  //Close menu why isn't this working
  game.menuClose.on('pointerdown', function (pointer) {
    game.menu.visible = false;
  });
  
  //Ensure menu is over all other game objects
  //NOTE: You can still click players from through the menu
  game.tooltips.depth = 2000
  game.menu.depth = 2000
}

export default create
