require('dotenv').config()
require('./models/db')

const express = require('express');
const http = require('http')
const https = require('https')
const fs = require('fs')

const path = require('path');
const cors = require('cors');

const authMiddleware = require('./routers/auth')

const user = require('./routers/user')
const club = require('./routers/club')
const room = require('./routers/room')

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

app.use('/api/user', user)
app.use('/api/club', club)
app.use('/api/room', room)

httpServer = app.listen(3001, () => console.log('node running on localhost:3001'));

/*
const creds = {
  ca: fs.readFileSync('/usr/src/ssl/chain1.pem'),
  cert: fs.readFileSync('/usr/src/ssl/cert1.pem'),
  key: fs.readFileSync('/usr/src/ssl/privkey1.pem')
};*/


const httpsServer = https.createServer();

httpsServer.listen(3002);

gameserver.start(httpServer)

module.exports = app
