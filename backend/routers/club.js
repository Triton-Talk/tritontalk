const express = require('express');

const Club = require('../models/Club')

const router = new express.Router();

router.get('/api/getClub' async (req, res) => {
  const query = {name: req.body.name}

  const club = await Club.findOne(query)
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

router.post('/api/createClub', async (req, res) => {

  const club = new Club({
    name: req.body.name,
    description: req.body.description,
    booth_image: req.body.booth_image,
    flyer: req.body.flyer,
    meeting_times: req.body.meeting_times,
    created_by: req.user
  })

  await club.save()

  res.status(200).send(club)

});

router.put('/api/updateClub', async (req, res) => {

  const query = {name: req.body.name, created_by: req.user}

  const club = Club.findOneAndUpdate(query, req.body.club, {new: true})

  if(!club){
    return res.status(404).send('Failed to update')
  }

  res.status(200).send(club)
})

router.delete('/api/deleteClub', async (req, res) => {

  const query = {name: req.body.name, created_by: req.user}

  const result = await Club.deleteOne(query)

  if(result.deletedCount !== 1)
    return res.status(404).send('Failed to delete club')

  return res.status(200).send({summary: 'Club deleted'})
})

module.exports = router
