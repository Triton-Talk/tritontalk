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

//USER FACING HOOKS
clubSchema.pre('save', async function(){
  await mongoose.models['User'].findByIdAndUpdate(this.creator, {$addToSet: { clubs: this.id}})
})

clubSchema.pre('remove', async function(){
  if(this.room){
    await mongoose.models['Room'].deleteMany({_id: this.room})
  }

  await mongoose.models['User'].findByIdAndUpdate(this.creator, {$pull: { clubs: this.id}})
})

//INTERNALLY USED HOOKS
clubSchema.pre('deleteMany', async function(doc){
  console.log('removing clubs internallly')
})

const Club = mongoose.model('Club', clubSchema)
module.exports = Club
