import updateSelf from './update.self.js'
import updatePlayers from './update.players.js'
import updateBooths from './update.booth.js'

const update = game => {

  //do updates for self object
  updateSelf(game)

  //do updates for other players
  updatePlayers(game)

  //do updates for booths
  updateBooths(game)

  game.tooltips.setY(game.cameras.main.y + 80);
  game.tooltips.setX(game.cameras.main.x + 150);
}

export default update
