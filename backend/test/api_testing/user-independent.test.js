module.exports = dependencies => {

  const {app, axios, chai} = dependencies

  describe('Testing independent calls', function(){

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

    it('signs up as new user', function(done){
      chai.request(app).post('/api/user/login').send({credential: this.credential}).then(function(res){
        console.log('request succeeded')
        chai.expect(res).to.have.status(200);

        chai.expect(res).to.have.header('user_found', 0)

        done()
      }).catch(function(error){
        throw error; 
      });
    })

    it('signs in as an existing user via credentials', function(done){
      chai.request(app).post('/api/user/login').send({credential: this.credential}).then(function(res){
        chai.expect(res).to.have.status(200);

        chai.expect(res).to.have.header('user_found', 1)

        chai.expect(res).to.have.cookie('sessionCookie');


        done()
      }).catch(function(error){
        throw error; 
      });
    })

    it('requests user information for self', function(done){
      chai.request(app).get('/api/user/me').send({credential: this.credential}).then(function(res){

        chai.expect(res).to.have.status(200);
        chai.expect(res.body.name).to.eql('Example User')

        done()
      }).catch(function(error){
        console.log(error)
        throw error; 
      });
    })

    it('requests user information for self', function(done){
      chai.request(app).get('/api/user/get').send({credential: this.credential, email: 'example@ucsd.edu'}).then(function(res){

        chai.expect(res).to.have.status(200);
        chai.expect(res.body.name).to.eql('Example User')

        done()
      }).catch(function(error){
        console.log(error)
        throw error; 
      });
    })

    it('requests all user information', function(done){
      chai.request(app).get('/api/user/getAll').send({credential: this.credential}).then(function(res){

        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.be.a('array')
        chai.expect(res.body[0].name).to.eql('Example User')

        done()
      }).catch(function(error){
        console.log(error)
        throw error; 
      });
    })

    it('updates a user', function(done){
      const user = {name: 'Example User', email: 'example@ucsd.edu', bio: 'I am an example user'}
      chai.request(app).put('/api/user/update').send({credential: this.credential, user}).then(function(res){
        chai.expect(res).to.have.status(200);

        chai.expect(res.body.name).to.eql('Example User')
        chai.expect(res.body.email).to.eql('example@ucsd.edu')
        chai.expect(res.body.bio).to.eql('I am an example user')

        chai.expect(res.body.major).to.eql('')

        done()
      }).catch(function(error){
        console.log(error)
        throw error; 
      });
    })

    it('deletes a user', function(done){
      chai.request(app).delete('/api/user/delete').send({credential: this.credential}).then(function(res){
        chai.expect(res).to.have.status(200);
        chai.expect(res.body.summary).to.equal('User deleted')

        done()
      }).catch(function(error){
        console.log(error)
        throw error; 
      });
    })

  })
}
