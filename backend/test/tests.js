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
    const log = this.log
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
