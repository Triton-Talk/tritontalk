const axios = require('axios')

const startGameServer = (httpServer, data) => {
  const {booths} = data

  console.log('instantiating game server with', booths)

  const phaser = require('socket.io')(httpServer);

  const players = {}
  const oldPlayers = {}

  phaser.on('connection', socket => {

    console.log('new connection to phaser socket', socket.id)

    socket.emit('ready', null)

    // When a player connects
    socket.on('new-player', data => {
      players[socket.id] = data
      data.playerId = socket.id

      // Emit the update-players method in the client side
      socket.emit('current-players', players)
      /*
      socket.emit('current-rooms', booths)
      console.log('current-rooms', booths)
      */

      axios.get('http://localhost:3001/api/room/getAll', {data: {'admin': true}}).then(response => {
        socket.emit('current-rooms', response.data)
        console.log('current-rooms', response.data)
      })

      socket.broadcast.emit('new-player', data)
    })

    socket.on('call-notif', names => {
      for(const playerId in players)
        if(names['receiver'] == players[playerId].name)
          phaser.to(playerId).emit('call-notif', names)      
    })

    socket.on('player-returned', name => {
      socket.broadcast.emit('call-dismissed', name)
    })

    socket.on('disconnect', data => {
      delete players[socket.id]
      phaser.emit('delete-player', socket.id)
    })

    socket.on('update-sprite', data => {
      const {sprite, playerId} = data

      socket.broadcast.emit('update-sprite', {sprite, playerId})
      players[socket.id].sprite = sprite
    })

    socket.on('update-college', data => {
      const {college, playerId} = data

      socket.broadcast.emit('update-college', {college, playerId})
      players[socket.id].college = college
    })

    socket.on('update-bio', data => {
      const {bio, playerId} = data

      socket.broadcast.emit('update-bio', {bio, playerId})
      players[socket.id].bio = bio
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
      players[socket.id].sprite = sprite
    })
  })

  return phaser
}

module.exports = {start: startGameServer}
