const express = require('express');

const User = require('../models/User')

const router = new express.Router();

// CREATE / READ
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

    console.log(user)

    res.status(200).send(JSON.stringify(user));
  }

  else{
    console.log('User successfully found')
    console.log(user)
    res.status(200).send(JSON.stringify(user));
  }
});

// READ
router.get('/api/getUser', async (req, res) => {
  const query = {email: req.identity.email}

  const user = await User.findOne(query) 

  if(!user)
    return res.status(404).send('Cannot get a nonexistent user')

  res.status(200).send(user)
})

// UPDATE
router.put('/api/updateUser', async (req, res) => {
  const query = {email: req.identity.email}

  const user = await User.findOneAndUpdate(query, req.body.user, { new: true })

  if(!user)
    return res.status(404).send('Cannot modify a nonexistent user')

  console.log('User updated')

  res.status(200).send(user)
})

// DELETE
router.delete('/api/deleteUser', async (req, res) => {
  const query = {email: req.identity.email}

  const result = await User.deleteOne(query)

  if(result.deletedCount !== 1)
    return res.status(404).send('Failed to delete user')

  return res.status(200).send({summary: 'User deleted'})
})

module.exports = router
