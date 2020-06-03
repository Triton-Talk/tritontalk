import React from 'react';
import { useHistory, useLocation } from 'react-router-dom'

import db, { GoogleSignOn } from './firebase'
import Cookies from 'universal-cookie'

import request from './request'

const Auth = React.createContext();
export default Auth;

const cookies = new Cookies()

export const AuthProvider = (props) => {

  const sessionCookie = cookies.get('sessionCookie')

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
    history.push('/login')
  }

  const serverLogin = React.useCallback(credential => {
    const body = {credential}
    request('/api/user/login', {body}, true).then(response => {
      const {body, headers} = response
      const newUser = headers.get('user_found') === "0"
      setUser(body)
      if (location.pathname === '/login') {
        if (newUser) {
          history.push({pathname: "/profile", state: {newUser}})
        } else {
          history.push('/')
        }
      }
    }).catch(error => {
      console.log(error)
      history.push('/login')
    })
  }, [history, location])

  React.useEffect(() => {
    if (sessionCookie) {
      serverLogin(null)
    } else {
      console.log('session cookie', sessionCookie, 'was null')
      history.push('/login')
    }
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
