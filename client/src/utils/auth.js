import React, { useState, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom'

import db, { GoogleSignOn } from './firebase'
import Cookies from 'universal-cookie'

import request from './request'

const Auth = React.createContext();
export default Auth;

const cookies = new Cookies()

const sessionCookie = cookies.get('sessionCookie')

const URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001'

export const AuthProvider = (props) => {
  const [user, _setUser] = React.useState(null)

  const history = useHistory()
  const location = useLocation()

  const setUser = (newUser) => {
    _setUser(newUser)
  }

  const handleSignOn = () => {
    db.auth().signInWithPopup(GoogleSignOn).then(result => {
      const email = result.user.email
      if (!email || email.substr(email.lastIndexOf('@')) !== '@ucsd.edu') {
        alert("That's not a UCSD email address!")
        return undefined
      }

      return db.auth().currentUser.getIdToken()
    }).then(token => {
      if (token) {
        return serverLogin(token)
      }
    }).catch(error => {
      console.log(error)
    })
  }

  const handleSignOut = () => {
    setUser(null);
    cookies.remove('sessionCookie')
    history.push('/')
  }

  const serverLogin = React.useCallback(credential => {
    request('/api/login', { body: { credential } }).then(res => {
      setUser(res)
      if (location.pathname === '/')
        history.push('/splash')
    })
  }, [history, location])

  React.useEffect(() => {
    if (sessionCookie)
      serverLogin(null)
  }, [serverLogin])

  const exportObj = {
    user, setUser,
    handleSignOn, handleSignOut,
    URL
  }

  return (
    <Auth.Provider value={exportObj}>
      {props.children}
    </Auth.Provider>
  )
}
