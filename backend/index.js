require('dotenv').config()
require('./models/db')

const express = require('express');
const http = require('http')

const path = require('path');
const cors = require('cors');

const authMiddleware = require('./routers/auth')

const userRouter = require('./routers/user')
const videoRouter = require('./routers/video')

const { videoToken } = require('./video/tokens');
const config = require('./video/config');

const app = express();

app.use(express.json());

app.use(require('cookie-parser')())

app.use(cors({origin: 'http://localhost:3000', credentials: true}));

// DEFAULT TESTING ROUTE
app.get('/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.use(authMiddleware)

app.use(videoRouter)
app.use(userRouter)

server = app.listen(3001, () => console.log('node running on localhost:3001'));

/*
const chat = require('socket.io')(server);
chat.on('connection', (socket) => {
  socket.on('new_message', (data) => {
    console.log(data)
    socket.emit('new_message', data);
  })
})
*/

const phaser = require('socket.io')(server);

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
    const {x, y, playerName} = data

    // If the player is invalid, return
    if (players[socket.id] === undefined) {
      return
    }

    // Update the player's data if he moved
    players[socket.id].x = x
    players[socket.id].y = y

    players[socket.id].playerName = playerName

    // Send the data back to the client
    phaser.emit('update-players', players)
  })
  
  const updatePlayers = () => {
    phaser.emit('update-players', players)
    setTimeout(() => updatePlayers(), 17)
  }
})

module.exports = app
