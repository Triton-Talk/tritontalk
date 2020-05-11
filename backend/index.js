require('dotenv').config()
require('./models/db')

const express = require('express');
const http = require('http')

const path = require('path');
const cors = require('cors');

const authMiddleware = require('./routers/auth')

const userRouter = require('./routers/user')
const videoRouter = require('./routers/video')

const gameserver = require('./gameserver')

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

gameserver.start(server)

module.exports = app
