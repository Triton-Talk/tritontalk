// connect to mongodb in Mongoose
require('dotenv').config()
require('./db.js')

const User = require('./User')
const Club = require('./Club')
const Room = require('./Room')

const shubham = new User({
  name: 'Shubham', 
  email: 'skulkarn@ucsd.edu',
  bio: 'I am a second year computer science major',
  hobbies: 'coding' 
})

const scsc = new Club({
  name: 'Sixth College Student Council',
  description: 'The student government of Sixth College'
})

const gbm = new Room({
  name: 'SCSC General Body Meeting'
})

shubham.clubs.push(scsc)

shubham.hosted_rooms.push(gbm)
gbm.authorized_users.push(shubham)

gbm.chat_logs.push({
  message: 'hey everybody!',
  sent_by_user: shubham
})

console.log('user', shubham, '\n')
console.log('club', scsc, '\n')
console.log('room', gbm, '\n')

shubham.save()
scsc.save()
gbm.save()
