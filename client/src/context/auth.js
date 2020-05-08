import React from 'react';
import { useHistory, useLocation } from 'react-router-dom'

import db, {GoogleSignOn} from '../firebase'
import Cookies from 'universal-cookie'

const Auth = React.createContext();
export default Auth;

const cookies = new Cookies()

let initialUser = cookies.get('user')
if(initialUser === 'null')
  initialUser = undefined

let initialCredential = cookies.get('credential')
if(initialCredential === 'null')
  initialCredential = undefined

const URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001'

export const AuthProvider = (props) => {

  const [user, _setUser] = React.useState(initialUser)
  const [credential, _setCredential] = React.useState(initialCredential)

  const history = useHistory()
  const location = useLocation()

  React.useEffect(() => { 
    if(initialCredential){
      /*
      const refreshKey = process.env.firebase_refresh_api_key
      fetch('https://securetoken.googleapis.com/v1/token?key='+process.env.firebase_refresh_api_key, {
        
      }
      */
      serverLogin(initialCredential)
    }
  }, [])
  
  const setUser = (newUser) => {
    _setUser(newUser)
    cookies.set('user', newUser)
  }

  const setCredential = (newCredential) => {
    _setCredential(newCredential)
    cookies.set('credential', newCredential)
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
      if (token){
        serverLogin(token)
        return setCredential(token)
      }
    }).catch(error => {
      alert(error)
    })
  }


  const serverLogin = token => {
    const method = 'POST'
    const body = JSON.stringify({credential: token})
    const headers = {'Content-Type': 'application/json'}

    return fetch(URL+'/api/login', {
      method,
      body,
      headers
    }).then(response => {
      return response.json()
    }).then(user => {
      setUser(user)
      if(location.pathname === '/splash')
        history.push('/')
    })
  }

  const handleSignOut = () => {
    setUser(null)
    setCredential(null)
    history.push('/splash')
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
