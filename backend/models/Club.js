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

clubSchema.pre('save', async function(){
  const creator = await mongoose.models['User'].findById(this.creator)
  creator.clubs.push(this.id)
  await creator.save()
})

clubSchema.pre('remove', async function(){
  if(this.room){
    console.log('cleared the room too!!')
    await mongoose.models['Room'].deleteOne({_id: this.room})
  }

  const creator = await mongoose.models['User'].findById(this.creator)
  const clubs = creator.clubs.filter(element => element.toString() !== this.id.toString())
  clubs.forEach(element => console.log(element, element == this.id.toString()))
  console.log('CREATOR!!!!!!', creator, clubs)

  creator.clubs = clubs
  await creator.save()
})

const Club = mongoose.model('Club', clubSchema)
module.exports = Club
