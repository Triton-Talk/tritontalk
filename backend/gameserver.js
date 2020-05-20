const startGameServer = httpServer => {
  const phaser = require('socket.io')(httpServer);

  const players = {}
  const booths = {}
  const oldPlayers = {}

  phaser.on('connection', socket => {

    console.log('new connection to phaser socket', socket.id)

    socket.emit('ready', null)

    // When a player connects
    socket.on('new-player', data => {
      console.log('New player joined with state:', data)
      players[socket.id] = data
      data.playerId = socket.id

      // Emit the update-players method in the client side
      socket.emit('current-players', players)
      socket.broadcast.emit('new-player', data)
    })

    socket.on('disconnect', data => {
      delete players[socket.id]
      phaser.emit('delete-player', socket.id)
    })

    socket.on('update-sprite', data => {
      const {sprite, playerId} = data

      socket.broadcast.emit('update-player-sprite', {sprite, playerId})
      players[socket.id].sprite = sprite
    })

    // When a player moves
    socket.on('move-player', data => {
      const {x, y, vx, vy, sprite, playerId, name} = data

      // Send update to all clients
      socket.broadcast.emit('update-player-location', {x, y, vx, vy, sprite, playerId})

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
      players[socket.id].playerId = playerId
    })
  })

  return phaser
}

module.exports = {start: startGameServer}
