const startGameServer = httpServer => {
  const phaser = require('socket.io')(httpServer);

  const players = {}
  const oldPlayers = {}

  phaser.on('connection', socket => {

    console.log('new connection to phaser socket')

    // When a player connects
    socket.on('new-player', state => {
      console.log('New player joined with state:', state)
      players[socket.id] = state

      // Emit the update-players method in the client side
      socket.emit('update-players', players)

    })

    socket.on('disconnect', state => {
      delete players[socket.id]
      phaser.emit('update-players', players)
    })

    // When a player moves
    socket.on('move-player', data => {
      const {x, y, vx, vy, playerName} = data

      // If the player is invalid, return
      if (players[socket.id] === undefined) {
        return
      }

      // Update the player's data if he moved
      players[socket.id].x = x
      players[socket.id].y = y
      players[socket.id].vx = vx
      players[socket.id].vy = vy

      players[socket.id].playerName = playerName

      // Send the data back to the client
      phaser.emit('update-players', players)
    })
    
    const updatePlayers = () => {
      phaser.emit('update-players', players)
      setTimeout(() => updatePlayers(), 17)
    }
  })
}

module.exports = {start: startGameServer}
