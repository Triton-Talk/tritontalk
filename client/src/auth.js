import React from 'react';

import Cookies from 'universal-cookie'

const Auth = React.createContext();
export default Auth;

const cookies = new Cookies()

export const AuthProvider = (props) => {

  const [user, _setUser] = React.useState(cookies.get('user'))
  const [credential, _setCredential] = React.useState(cookies.get('credential'))
  
  const setUser = (newUser) => {
    _setUser(newUser)
    cookies.set('user', newUser)
  }

  const setCredential = (newCredential) => {
    _setCredential(newCredential)
    cookies.set('credential', newCredential)
  }

  return (
    <Auth.Provider value={{user, setUser, credential, setCredential}}>
      {props.children}
    </Auth.Provider>
  )

}
