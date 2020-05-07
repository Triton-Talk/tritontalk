const express = require('express');

require('../models/db')
const User = require('../models/User')

const router = new express.Router();

router.post('/api/login', async (req, res) => {
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
    res.status(200).send(JSON.stringify(user));
  }

  else{
    console.log('User successfully found')
    res.status(200).send(JSON.stringify(user));
  }
});

router.put('/api/updateUser', async (req, res) => {
  const query = {email: req.identity.email}

  let user = await User.findOneAndUpdate(query, req.body.user, { new: true})

  if(!user)
    res.status(404).send('Cannot modify a nonexistent user')

  console.log(user)

  res.status(200).send(user)
})

router.delete('/api/me', async (req, res) => {
  const query = {email: req.identity.email}

  let user = await User.findOne(query)

  if(!user)
    res.status(404).send('Cannot delete a nonexistent user')

  await user.remove()

  res.status(200).send('User deleted')
})

module.exports = router
