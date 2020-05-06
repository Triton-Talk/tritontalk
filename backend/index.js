require('dotenv').config()

const config = require('./config');
const express = require('express');
const { videoToken } = require('./tokens');
const path = require('path');
const cors = require('cors');
const admin = require('firebase-admin')

require('./db')
const User = require('./models/User')
const Room = require('./models/Room')
const Club = require('./models/Club')

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
  console.log('Processing identity')
  if(req.body.postman){
    req.identity = {}
    req.identity.name = 'Shubham Kulkarni'
    req.identity.email = 'skulkarn@ucsd.edu';
    req.identity.picture = 'http://randomuser.me/api/portraits/men/44.jpg'
    next()
  }
  admin.auth().verifyIdToken(req.body.credential).then(identity => {
    req.identity = identity
    next()
  }).catch(error => {
    res.status(404).send('Error: failed to parse identity')
  })
})

app.post('/api/login', async (req, res) => {
  const query = {email: req.identity.email}

  let user = await User.findOne(query)

  if(!user){
    console.log('User not found')

    user = new User({
      name: req.identity.name,
      email: req.identity.email,
      picture: req.identity.picture
    })

    await user.save()
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(user));
  }

  else{
    console.log('User successfully found')
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(user));
  }
});

app.patch('/api/updateUser', async (req, res) => {
  const query = {email: req.identity.email}

  let user = await User.findOne(query)

  if(!user)
    res.status(404).send('Cannot modify a nonexistent user')

  user = {...user, ...req.body.user}
  await user.save()
  
  res.send(user)
})

app.delete('/api/me', async (req, res) => {
  const query = {email: req.identity.email}

  let user = await User.findOne(query)

  if(!user)
    res.status(404).send('Cannot delete a nonexistent user')

  await user.remove()

  res.send('User deleted')
})

app.post('/api/video/token', (req, res) => {
  console.log('request has arrived')

  const room = req.body.room;
  const token = videoToken(req.identity.email, room, config);
  sendTokenResponse(token, res);
});

server = app.listen(3001, () => console.log('node running on localhost:3001'));

const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.on('new_message', (data) => {
    io.sockets.emit('new_message', data);
  })
})
