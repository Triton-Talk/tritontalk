import React from 'react';

const Auth = React.createContext();
export default Auth;
export const AuthProvider = (props) => {
  const [user, setUser] = React.useState(null)
  
  return (
    <Auth.Provider value={{user, setUser}}>
      {props.children}
    </Auth.Provider>
  )

}
