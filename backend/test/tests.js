require('dotenv').config({path:'../.env'})

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const axios = require('axios')

const app = require('../index')
before(function(done){
  console.log('Waiting for MongoDB connection...')
  require('../models/db').then(() => done())
})

describe('Testing basic HTTP server functionality', function(){

  it('requests /greeting', function(done){
    chai.request(app).get('/greeting').then(function(res){
      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.have.property('greeting')
      chai.expect(res.body['greeting']).to.equal('Hello World!')

      done()
    }).catch(function(error){
      throw error; 
    });
  })

})

describe('Testing auth.js', function(){

  before(async function(){
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+process.env.FIREBASE_API_KEY
    const body = { email: "example@ucsd.edu", password: "example", returnSecureToken: true }
    this.credential = (await axios.post(url, body)).data.idToken
  })

  beforeEach(function(done){
    this.timeout(1000)

    this.log = console.log
    console.log = output => {
      this.log('\t\t', output)
    }

    done()
  })

  afterEach(function(done){
    this.timeout(1000)

    console.log = this.log
    done()
  })

  it('requests with valid token', function(done){
    chai.request(app).post('/api/verifyIdentity').send({credential: this.credential}).then(function(res){
      console.log = this.log
      chai.expect(res).to.have.status(200);

      done()
    }).catch(function(error){
      throw error; 
    });
  })

  it('requests with invalid token', function(done){
    chai.request(app).post('/api/verifyIdentity').then(function(res){
      console.log = this.log
      chai.expect(res).to.have.status(404);
      chai.expect(res.text).to.equal('Error: failed to parse identity')

      done()
    }).catch(function(error){
      console.log(error)
      throw error; 
    });
  })

})

describe('Database testing', function(done){

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

/*

  const shubham = new User({
    name: 'Shubham', 
    email: 'skulkarn@ucsd.edu',
    bio: 'I am a second year computer science major',
    hobbies: 'coding' 
  })


  const Room = require('./Room')

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
  */
})

