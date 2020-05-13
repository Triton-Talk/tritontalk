module.exports = dependencies => {
  const {app, axios, chai} = dependencies

  describe('Testing auth.js', function(){

    before(async function(){
      const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+process.env.FIREBASE_API_KEY
      const body = { email: "example@ucsd.edu", password: "example", returnSecureToken: true }
      this.credential = (await axios.post(url, body)).data.idToken
    })

    beforeEach(function(done){
      this.log = console.log
      console.log = () => {}
      done()
    })

    afterEach(function(done){
      console.log = this.log
      done()
    })

    it('requests with valid token', function(done){
      chai.request(app).post('/api/verifyIdentity').send({credential: this.credential}).then(function(res){
        chai.expect(res).to.have.status(200);

        done()
      }).catch(function(error){
        throw error; 
      });
    })

    it('requests with invalid token', function(done){
      chai.request(app).post('/api/verifyIdentity').send({credential: 'invalidcredential'}).then(function(res){

        console.log('\n\n\n',res.text)
        chai.expect(res).to.have.status(404);
        chai.expect(res.text).to.equal('Error: failed to parse identity')

        done()
      }).catch(function(error){
        console.log(error)
        throw error; 
      });
    })

    it('requests with no token', function(done){
      chai.request(app).post('/api/verifyIdentity').then(function(res){
        chai.expect(res).to.have.status(404);
        chai.expect(res.text).to.equal('Error: failed to parse identity')

        done()
      }).catch(function(error){
        console.log(error)
        throw error; 
      });
    })

  })
}
