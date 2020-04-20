require('dotenv').config()

const config = require('./config');
const express = require('express');
const { videoToken } = require('./tokens');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use(express.static('build'));

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
      console.log('call has arrived');
      res.send('hello world');
});

app.listen(3000, () =>
	  console.log('Express server is running on localhost:3000')
);
