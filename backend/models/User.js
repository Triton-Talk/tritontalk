const mongoose = require('mongoose')
const validator = require('validator');

const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true, 
    unique: true, 
    lowercase: true,
    validate(value){
      if(!validator.isEmail(value))
        throw new Error('Email is invalid')
    }
  },
  picture: {
    type: String,
  },
  college: {
    type: String
  },
  year: {
    type: String
  },
  major: {
    type: String
  },
  bio: {
    type: String,
  },
  hobbies: {
    type: String,
  },
  friends: [{
    type: ObjectId, 
    ref: 'User'
  }], 
  clubs: [{
    type: ObjectId,
    ref: 'Club'
  }],
  hosted_rooms: [{
    type: ObjectId,
    ref: 'Room'
  }],
}, {collection: 'Users'})

const User = mongoose.model('User', userSchema)
module.exports = User
