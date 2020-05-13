module.exports = dependencies => {
  
  const {app, chai} = dependencies

  describe('Basic database testing - CRUD functionality', function(done){

    describe('User tests', function(done){

      it('creates a new User', function(done){
        const User = require('../models/User')
        
        const exampleuser = new User({
          name: 'Example user',
          email: 'example@ucsd.edu', 
        })

        exampleuser.save().then(() => done())
      })

      it('reads a User', function(done){
        const User = require('../models/User')
        
        const query = {email: 'example@ucsd.edu'}

        User.findOne(query).then(exampleuser => {
          chai.expect(exampleuser.name).to.equal('Example user')

          done()
        })
      })

      it('updates a User', function(done){
        const User = require('../models/User')
        
        const query = {email: 'example@ucsd.edu'}

        User.findOneAndUpdate(query, {bio: 'example update'}, {new: true}).then(exampleuser => {
          chai.expect(exampleuser.name).to.equal('Example user')
          chai.expect(exampleuser.bio).to.equal('example update')

          done()
        })
      })

      it('deletes a User', async function(){
        const User = require('../models/User')
        
        const query = {email: 'example@ucsd.edu'}

        await User.deleteOne(query)      

        const e = await User.findOne(query) 
        chai.expect(e).to.be.null
      })

    })

    describe('Club tests', function(done){

      it('creates a new Club', function(done){
        const Club = require('../models/Club')

        const exampleclub = new Club({
          name: 'Example club',
          description: 'example club'
        })

        exampleclub.save().then(() => done())
      })

      it('reads a Club', function(done){
        const Club = require('../models/Club')

        const query = { name: 'Example club' }

        Club.findOne(query).then(exampleclub => {
          chai.expect(exampleclub.description).to.equal('example club')
          
          done()
        })
      })

      it('updates a Club', function(done){
        const Club = require('../models/Club')

        const query = { name: 'Example club' }

        Club.findOneAndUpdate(query, {description: 'new description'}, {new: true}).then(exampleclub => {
          chai.expect(exampleclub.description).to.equal('new description')
          
          done()
        })
      })

      it('deletes a Club', async function(){
        const Club = require('../models/Club')

        const query = { name: 'Example club' }

        await Club.deleteOne(query)

        const c = await Club.findOne(query)
        chai.expect(c).to.be.null
      })

    })

    describe('Room tests', function(done){

      it('creates a new Room', function(){
        const Room = require('../models/Room')

        const exampleroom = new Room({ name: 'Example room' })

        return exampleroom.save()
      })

      it('reads a Room', function(done){
        const Room = require('../models/Room')

        const query = { name: 'Example room' }

        Room.findOne(query).then(exampleroom => {
          chai.expect(exampleroom).to.not.be.null
          
          done()
        })
      })

      it('updates a Room', function(done){
        const Room = require('../models/Room')

        const query = { name: 'Example room' }

        Room.findOneAndUpdate(query, {name: 'new name'}, {new: true}).then(exampleroom => {
          chai.expect(exampleroom.name).to.equal('new name')
          
          done()
        })
      })

      it('deletes a Room', async function(){
        const Room = require('../models/Room')

        const query = { name: 'new name' }

        await Room.deleteOne(query)

        const c = await Room.findOne(query)
        chai.expect(c).to.be.null
      })

    })


  })

}
