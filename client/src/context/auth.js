import React from 'react';
import { useHistory, useLocation } from 'react-router-dom'

import db, { GoogleSignOn } from '../firebase'
import Cookies from 'universal-cookie'

const Auth = React.createContext();
export default Auth;

const cookies = new Cookies()

const sessionCookie = cookies.get('sessionCookie')

const URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001'

export const AuthProvider = (props) => {

  const [user, _setUser] = React.useState(null)
  const [credential, _setCredential] = React.useState(null)

  const history = useHistory()
  const location = useLocation()

  React.useEffect(() => { 
    if(sessionCookie)
      serverLogin(null)
  }, [])

  const setUser = (newUser) => {
    console.log('user object has been updated in AuthProvider')
    _setUser(newUser)
  }

  const setCredential = (newCredential) => {
    _setCredential(newCredential)
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
        //setCredential(token)
        return serverLogin(token)
      }
    }).catch(error => {
      alert(error)
    })
  }


  const serverLogin = token => {
    const method = 'POST'
    const body = JSON.stringify({ credential: token })
    const headers = { 'Content-Type': 'application/json' }
    const credentials = 'include'

    return fetch(URL + '/api/login', {
      method,
      body,
      headers,
      credentials
    }).then(response => {
      return response.json()
    }).then(user => {
      setUser(user)
      if (location.pathname === '/')
        history.push('/splash')
      return user
    })
  }

  const handleSignOut = () => {
    setUser(null)
    setCredential(null)
    cookies.remove('sessionCookie')
    history.push('/')
  }

  const exportObj = {
    user, setUser,
    credential, setCredential,
    handleSignOn, handleSignOut,
    URL
  }

  return (
    <Auth.Provider value={exportObj}>
      {props.children}
    </Auth.Provider>
  )
}
