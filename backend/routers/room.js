const express = require('express');

const User = require('../models/User')
const Room = require('../models/Room')

const router = new express.Router();

router.get('/get', async (req, res) => {
  const query = {name: req.body.name}

  const room = await Room.findOne(query)

  if(!room)
    return res.status(404).send('Failed to find a room with that name')

  res.status(200).send(room)
})

// READ
router.get('/getAll', async (req, res) => {
  const rooms = await Room.find({})

  if(!rooms)
    return res.status(404).send('There are no rooms!')

  res.status(200).send(rooms)
})

// all other routes in this file require a valid, authenticated user 
router.use(async (req, res, next) => {
  const query = {email: req.identity.email}

  const user = await User.findOne(query)

  if(!user)
    return res.status(404).send('Please sign in first')

  req.user = user
  next()
})

router.post('/create', async (req, res) => {

  const room = new Room(req.body.room)

  room.authorized_users.push(req.user)

  await room.save()

  //req.app.locals.booths[room.name] = room
  res.status(200).send(room)

});

router.post('/createForClub', async (req, res) => {

  const room = new Room(req.body.room)

  room.authorized_users.push(req.user)
  room.club = req.body.club

  const array = Array(20).fill(0)
  for(let booth in req.app.locals.booths){ 
    array[req.app.locals.booths[booth].index] = 1
  }
  
  console.log(array)

  room.index = array.lastIndexOf(0)

  console.log(room)

  if(room.index === -1)
    return res.status(404).send('Failed to create booth')

  await room.save()

  req.app.locals.booths.push(room)
  console.log(req.app.locals.booths, room.index)
  req.app.locals.phaser.emit('new-room', room)

  res.status(200).send(room)
});

router.put('/update', async (req, res) => {

  const query = {name: req.body.name, authorized_users: req.user}

  const room = await Room.findOneAndUpdate(query, req.body.room, {new: true})

  if(!room){
    return res.status(404).send('Failed to update')
  }

  res.status(200).send(room)
})

router.delete('/delete', async (req, res) => {

  const query = {name: req.body.name, authorized_users: req.user}

  const result = await Room.findOne(query)

  if(!result)
    return res.status(404).send('Failed to delete room')

  req.app.locals.phaser.emit('delete-room', result.index)

  req.app.locals.booths = req.app.locals.booths.filter( element => element.name !== result.name)
  console.log(req.app.locals.booths)
  await result.remove()

  return res.status(200).send({summary: 'Room deleted'})
})

module.exports = router
