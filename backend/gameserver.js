const startGameServer = httpServer => {
  const phaser = require('socket.io')(httpServer);

  const players = {}
  const oldPlayers = {}

  phaser.on('connection', socket => {

    console.log('new connection to phaser socket', socket.id)

    socket.emit('ready', null)

    // When a player connects
    socket.on('new-player', state => {
      console.log('New player joined with state:', state)
      players[socket.id] = state
      state.playerName = socket.id

      // Emit the update-players method in the client side
      socket.emit('current-players', players)
      socket.broadcast.emit('new-player', state)
    })

    socket.on('disconnect', state => {
      delete players[socket.id]
      phaser.emit('delete-player', socket.id)
    })

    // When a player moves
    socket.on('move-player', data => {
      
      const {x, y, vx, vy, sprite, playerName} = data
      socket.broadcast.emit('update-player-data', {x, y, vx, vy, sprite, playerName})

      // If the player is invalid, return
      if (players[socket.id] === undefined) {
        console.log('invalid player')
        return
      }

      // Update the player's data if he moved
      players[socket.id].x = x
      players[socket.id].y = y
      players[socket.id].vx = vx
      players[socket.id].vy = vy
      players[socket.id].sprite = sprite
      players[socket.id].playerName = playerName
    })
  })
}

module.exports = {start: startGameServer}
