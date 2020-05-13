module.exports = dependencies => {

  const {chai, app} = dependencies

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
}
