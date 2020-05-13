require('dotenv').config({path: require('path').resolve(__dirname, '../.env')})

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../index')

before(function(){
  console.log('Waiting for MongoDB connection...')
  return require('../models/db')
})

describe('Testing basic HTTP server functionality', function(done){

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

