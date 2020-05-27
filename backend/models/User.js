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
  sprite: {
    type: String,
    default: 'tritondude'
  },
  picture: {
    type: String,
    default: ''
  },
  college: {
    type: String,
    default: ''
  },
  year: {
    type: String,
    default: ''
  },
  major: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  hobbies: {
    type: String,
    default: ''
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

userSchema.pre('remove', async function(){
  await mongoose.models['Room'].deleteMany({creator: this.id})
  await mongoose.models['Club'].deleteMany({creator: this.id})

  await mongoose.models['User'].updateMany({friends:this.id}, {$pull: {friends: this.id}})
  return
})

const User = mongoose.model('User', userSchema)
module.exports = User
