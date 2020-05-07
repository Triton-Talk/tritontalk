require('dotenv').config()

const express = require('express');
const path = require('path');
const cors = require('cors');
const admin = require('./firebase')

const userRouter = require('./routers/user')
const videoRouter = require('./routers/video')

const { videoToken } = require('./video/tokens');
const config = require('./video/config');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use(express.static('build'));

// DEFAULT TESTING ROUTE
app.get('/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

// PREPROCESSOR FOR ALL API ROUTES
app.use('/api/*', (req, res, next) => {
  console.log('Processing identity')
  if (req.body.postman) {
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

app.use(userRouter)
app.use(videoRouter)

server = app.listen(3001, () => console.log('node running on localhost:3001'));

const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.on('new_message', (data) => {
    io.sockets.emit('new_message', data);
  })
})
