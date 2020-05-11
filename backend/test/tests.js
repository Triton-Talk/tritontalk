//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../index')

describe('HTTP server', function(){

  it('requests /greeting', function(){
    chai.request(app).get('/greeting').end( function(err, res){
      chai.expect(err).to.be.null;
      chai.expect(res).to.have.status(200);
    });
  })
})
