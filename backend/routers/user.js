const express = require('express');

const User = require('../models/User')

const router = new express.Router();

router.post('/api/login', async (req, res) => {
  const query = {email: req.identity.email}

  let user = await User.findOne(query)

  if(!user){
    user = new User({
      name: req.identity.name,
      email: req.identity.email,
      picture: req.identity.picture
    })

    await user.save()
    console.log('New user created')

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
    return res.status(404).send('Cannot modify a nonexistent user')

  console.log('User updated')

  res.status(200).send(user)
})

router.delete('/api/deleteUser', async (req, res) => {
  const query = {email: req.identity.email}

  let user = await User.findOne(query)

  if(!user)
    return res.status(404).send('Cannot delete a nonexistent user')

  await user.remove()

  console.log('User deleted')

  res.status(200).send({result: 'user deleted'})
})

module.exports = router
