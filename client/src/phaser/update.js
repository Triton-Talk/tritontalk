import updateSelf from './update.self.js'
import updatePlayers from './update.players.js'

const update = game => {

  //do updates for self object
  updateSelf(game)

  //do updates for other players
  updatePlayers(game)
}

export default update
