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

  //Menu that appears when player interacts
  game.menu = game.add.rectangle(1200, 600, game.boothWidth, 1250, 0x5e32a8, 70);
  game.menu.visible = false; //Appears when prompted
  game.menu.setScrollFactor(0); //Follows camera

}

export default create
