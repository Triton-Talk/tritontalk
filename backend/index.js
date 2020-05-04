require('dotenv').config()

const config = require('./config');
const express = require('express');
const { videoToken } = require('./tokens');
const path = require('path');
const cors = require('cors');
const admin = require('firebase-admin')

//set up firebase admin
const serviceAccount = require("./tritontalk-d063d-firebase-adminsdk-hnpwi-f1538684d6.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tritontalk-d063d.firebaseio.com"
});

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use(express.static('build'));

const sendTokenResponse = (token, res) => {
  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify({ token: token.toJwt() }));
};

//TESTING ROUTES
app.get('/*', function(req, res, next) {
  console.log(req.url);
  console.log('call has arrived');
  res.send('hello world')
  next()
});

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get('/api/video/token', (req, res) => {
  const identity = req.query.identity;
  const room = req.query.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});

// PRODUCTION ROUTES
app.post('/api/*', (req, res, next) => {
  admin.auth().verifyIdToken(req.body.credential).then(identity => {
    req.identity = identity
  })
})

app.post('/api/login', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${req.identity.name}!` }));
});

app.post('/api/video/token', (req, res) => {
  const room = req.body.room;
  const token = videoToken(req.identity.email, room, config);
  sendTokenResponse(token, res);
});

server = app.listen(3000, () => console.log('node running on localhost:3000'));

const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.on('new_message', (data) => {
    io.sockets.emit('new_message', data);
  })
})
