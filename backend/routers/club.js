const express = require('express');

const User = require('../models/User')
const Club = require('../models/Club')

const router = new express.Router();

router.get('/get', async (req, res, next) => {
  const query = {name: req.body.name}

  const club = await Club.findOne(query)

  if(!club)
    return res.status(404).send('Failed to find a club with that name')

  res.status(200).send(club)
})

// READ
router.get('/getAll', async (req, res) => {
  const clubs = await Club.find({})

  if(!clubs)
    return res.status(404).send('There are no clubs!')

  res.status(200).send(clubs)
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
  
  const club = new Club( req.body.club )
  club.creator = req.user
  club.room = undefined
  
  try{
    await club.save()

    req.user.clubs.push(club)
    await req.user.save()

    res.status(200).send(club)
  }
  catch(err){
    console.log(err)
  }

});

router.put('/update', async (req, res) => {

  const query = {name: req.body.name, creator: req.user}

  const club = await Club.findOneAndUpdate(query, req.body.club, {new: true})

  if(!club){
    return res.status(404).send('Failed to update')
  }

  res.status(200).send(club)
})

router.delete('/delete', async (req, res) => {

  const query = {name: req.body.name, creator: req.user}
  console.log(query)

  const result = await Club.deleteOne(query)
  console.log(result);

  if(result.deletedCount !== 1)
    return res.status(404).send('Failed to delete club')

  return res.status(200).send({summary: 'Club deleted'})
})

module.exports = router
