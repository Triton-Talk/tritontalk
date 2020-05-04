const mongoose = require('mongoose')
const validator = require('validator');

const ObjectId = mongoose.Schema.Types.ObjectId

const chatSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  sent_by_user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  time_sent: {
    type: Date,
    default: Date.now
  }
})

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  chat_logs: [ chatSchema ],
  authorized_users: [
    {
      type: ObjectId, 
      ref: 'User'
    }
  ]
})

const Room = mongoose.model('Room', roomSchema)
module.exports = Room
