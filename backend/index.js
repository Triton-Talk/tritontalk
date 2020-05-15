require('dotenv').config()
require('./models/db')

const express = require('express');
const http = require('http')
const https = require('https')
const fs = require('fs')

const ssl = {
  ca: fs.readFileSync(’/usr/src/ssl/chain.pem’),
  cert: fs.readFileSync(’/usr/src/ssl/cert.pem’),
  key: fs.readFileSync(’/usr/src/ssl/privkey.pem’)
};


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

server = app.listen(3001, () => console.log('node running on localhost:3001'));

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(3002);

gameserver.start(httpsServer)

module.exports = app
