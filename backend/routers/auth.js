const express = require('express');

const admin = require('../utils/firebase')

const router = new express.Router();

// PREPROCESSOR FOR ALL API ROUTES
router.use('/api/*', (req, res, next) => {
  if(req.cookies.sessionCookie){
    const sessionCookie = req.cookies.sessionCookie || '';

    admin.auth().verifySessionCookie(sessionCookie).then(identity => {
      req.identity = identity

      console.log('Identity processed via cookie, continuing.')
      next()
    }).catch(error => {
      console.log(`Failed to verify identity by cookie: ${req.cookies}`);
      res.clearCookie('sessionCookie')
      res.status(404).send('Error: verify identity by cookie')
    });
  }
  else {
    //verify identity
    try{
      admin.auth().verifyIdToken(req.body.credential).then(identity => {
        req.identity = identity
        //verify ucsd email address
        if(identity.email.substr(identity.email.lastIndexOf('@')) !== '@ucsd.edu')
          throw new Error();

        console.log('Identity processed via request body')

        const expiresIn = 60 * 60 * 24 * 1000;

        return admin.auth().createSessionCookie(req.body.credential, {expiresIn})
      }).then(cookie => {
        //set a session cookie
        //const options = {maxAge: expiresIn, httpOnly: true, secure: true};
        const options = {}
        res.cookie('sessionCookie', cookie, options)

        console.log('Setting session cookie')

        next()
      })
    }
    catch(error){
      console.log(`Failed to parse identity: ${req.body}`);
      res.status(404).send('Error: failed to parse identity')
    }
  }
})

router.post('/api/verifyIdentity', (req, res) => {
  res.status(200).send(req.identity)
})


module.exports = router
