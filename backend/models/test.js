// connect to mongodb in Mongoose
require('dotenv').config()
require('./db.js')

const User = require('./User')
const Club = require('./Club')
const Room = require('./Room')

const newuser = new User({name: 'Shubham', email: 'shubhamkulkarni01@gmail.com'})

newuser.save().then(console.log('created new user' + newuser))
