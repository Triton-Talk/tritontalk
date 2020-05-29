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
    trim: true,
    unique: true
  },
  chat_logs: [ chatSchema ],
  creator: {
    type: ObjectId, 
    ref: 'User'
  },
  club: {
    type: ObjectId,
    ref: 'Club'
  }, 
  index: {
    type: Number
  }
}, {collection: 'Rooms'})

//USER FACING HOOKS
roomSchema.pre('save', async function(){
  await mongoose.models['Club'].findByIdAndUpdate(this.club, {room: this.id})

  const array = Array(20).fill(0)
  const booths = await mongoose.models['Room'].find({})
  for(let booth in booths){ 
    array[booths[booth].index] = 1
  }

  this.index = array.lastIndexOf(0)

  if(this.index === -1)
    return 'Failed to create booth'

  return
})

roomSchema.post('remove', async function(doc){
  console.log('removing room')

  await mongoose.models['Club'].findByIdAndUpdate(doc.club, {room: undefined})

  global.phaser.emit('delete-room', doc.index)

})

//INTERNALLY USED HOOKS
roomSchema.pre('deleteMany', async function(){
  console.log('removing room internallly')
})


const Room = mongoose.model('Room', roomSchema)
module.exports = Room
