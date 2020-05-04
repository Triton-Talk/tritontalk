import React from 'react';

const Auth = React.createContext();
export default Auth;
export const AuthProvider = (props) => {
  const [user, setUser] = React.useState(null)
  const [credential, setCredential] = React.useState(null)
  
  return (
    <Auth.Provider value={{user, setUser, credential, setCredential}}>
      {props.children}
    </Auth.Provider>
  )

}
