const mongoose = require('mongoose')
const validator = require('validator');

const ObjectId = mongoose.Schema.Types.ObjectId

const meetingTimeSchema = new mongoose.Schema({
  day: Number,
  time: Number,
  frequency: Number 
})

const clubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, 
    unique: true
  },
  description: {
    type: String,
  },
  booth: {
    type: String,
  },
  meeting_times: [ meetingTimeSchema ], 
  creator: {
    type: ObjectId, 
    ref: 'User'
  },
  room: {
    type: ObjectId,
    ref: 'Room'
  }
}, {collection: 'Clubs'})

const Club = mongoose.model('Club', clubSchema)
module.exports = Club
