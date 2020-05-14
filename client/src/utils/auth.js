import React from 'react';
import { useHistory, useLocation } from 'react-router-dom'

import db, { GoogleSignOn } from './firebase'
import Cookies from 'universal-cookie'

import request from './request'

const Auth = React.createContext();
export default Auth;

const cookies = new Cookies()

const URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001'

export const AuthProvider = (props) => {

  const sessionCookie = cookies.get('sessionCookie')

  const [user, _setUser] = React.useState(null)

  const history = useHistory()
  const location = useLocation()

  const setUser = (newUser) => {
    _setUser(newUser)
  }

  const handleSignOn = () => {
    console.log('handleSignOn was called')

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
    console.log('handleSignOut was called')
    setUser(null);
    cookies.remove('sessionCookie')
    history.push('/')
  }

  const serverLogin = React.useCallback(credential => {
    console.log('serverLogin was called')
    request('/api/user/login', { body: { credential } }).then(res => {
      setUser(res)
      if (location.pathname === '/')
        history.push('/lobby')
    })
  }, [history, location])

  React.useEffect(() => {
    console.log('react effect hook was called')
    if (sessionCookie)
      serverLogin(null)
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
