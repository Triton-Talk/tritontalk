import createPlayer from './create.player.js'
import createWalk from './create.walk.js'
import createWalls from './create.walls.js'
import createSocket from './io.js'
import createMenus from './create.menus.js';

const create = game => {

  //set up the library walk and geisel
  createWalk(game)

  //set up the player object
  createPlayer(game)

  //create game walls for the player
  createWalls(game)

  //initialize socket and all necessary communication objects 
  createSocket(game)

  //initialize all in game menus
  createMenus(game)

}

export default create
