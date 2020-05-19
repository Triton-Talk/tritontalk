require('dotenv').config({path: require('path').resolve(__dirname, '../.env')})
process.env.host='cluster0-ee9ru.mongodb.net/test?retryWrites=true&w=majority'

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const axios = require('axios')

const app = require('../index')
before(function(){
  this.timeout(5000)
  console.log('Waiting for MongoDB connection...')
  return require('../models/db')
})

dependencies = { chai, axios, app }

/*
describe('Sanity check', function(){
  require('./index.js.test')(dependencies)
})

describe('Ensuring credentials can be properly set', function(){
  require('./auth.js.test')(dependencies)
})

describe('Database testing', function(){
  
  require('./db_testing/db_basic_crud.js.test')(dependencies)

  require('./db_testing/db_linked_crud.js.test')(dependencies)
})
*/

describe('API Endpoint testing', function(){

  //require('./api_testing/user.js.test')(dependencies)
  require('./api_testing/room.js.test')(dependencies)

})
