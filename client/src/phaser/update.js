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
}

export default update
