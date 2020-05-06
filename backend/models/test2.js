// connect to mongodb in Mongoose
require('dotenv').config()
require('./db.js')

const User = require('./User')
const Club = require('./Club')
const Room = require('./Room')

User.findOne().then(user => {
  console.log(user)
})
