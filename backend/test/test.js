require('dotenv').config({path: require('path').resolve(__dirname, '../.env')})

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const axios = require('axios')

const app = require('../index')
before(function(){
  console.log('Waiting for MongoDB connection...')
  return require('../models/db')
})

dependencies = { chai, chaiHttp, axios, app }

require('./auth')(dependencies)
