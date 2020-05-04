require('dotenv').config()

const config = require('./config');
const express = require('express');
const { videoToken } = require('./tokens');
const path = require('path');
const cors = require('cors');
const admin = require('firebase-admin')

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use(express.static('build'));

const sendTokenResponse = (token, res) => {
	  res.set('Content-Type', 'application/json');
	  res.send(
		      JSON.stringify({
			            token: token.toJwt()
			          })
		    );
};

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
app.post('/api/video/token', (req, res) => {
	  const identity = req.body.identity;
	  const room = req.body.room;
	  const token = videoToken(identity, room, config);
	  sendTokenResponse(token, res);
});


app.get('/*', function(req, res) {
          console.log(req.url);
	  console.log('call has arrived');
          res.send('hello world')
});

server = app.listen(3000, () => console.log('node running on localhost:3000'));

const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('new user connected')

  socket.on('new_message', (data) => {
    io.sockets.emit('new_message', data);
  })
})
