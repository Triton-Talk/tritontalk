const express = require('express');
const { videoToken } = require('../video/tokens');

const config = require('../video/config');
const client = require('twilio')(config.twilio.accountSid, config.twilio.authToken)

const router = new express.Router();

const sendTokenResponse = (token, res) => {
  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify({ token: token.toJwt() }));
};

router.get('/token', (req, res) => {
  const identity = req.identity
  const room = req.query.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});

router.post('/token', (req, res) => {
  console.log('request has arrived')

  const room = req.body.room;
  const token = videoToken(req.identity.email, room, config);
  sendTokenResponse(token, res);
});

router.post('/endCall', (req, res) => {
  client.video.rooms(req.body.name).update({status: 'completed'})
                                   .then(room => res.send({msg: 'success'}))
                                   .catch(error => res.send({msg:'error'}))
})

module.exports = router
