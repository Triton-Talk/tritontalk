import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap'
import styles from '../styles/NavBar.css';
import Auth from '../auth'

import { Redirect } from 'react-router-dom';

const NavigationBar = () => {

  const { user, handleSignOn, handleSignOut } = useContext(Auth);

  const [redirect, setRedirect] = React.useState(null)

  if(redirect)
    return <Redirect to={redirect} />

  else
    return (
      <Navbar style={styles} bg="dark" variant="dark">
        <Navbar.Toggle />
        <button>Go Chat</button>
        <div className="centered">
          <a href="/"><h1 className="NavBarLogo">TritonTalk</h1></a>
        </div>
        <Navbar.Collapse className="justify-content-end">
          {
            user !== null && user !== undefined ?
            <div class="dropdown">
              <button className="dropbtn">Account Settings</button>
              <div className="dropdown-content">
                <button onClick={()=> setRedirect('/settings') }
                        className="dropdown-button">Profile Settings</button>
                <button className="dropdown-button" 
                        onClick={handleSignOut}>Sign out</button>
              </div>
            </div>
            : 
            <div class="dropdown">
              <button className="dropbtn" onClick={handleSignOn}>Sign in</button>
            </div>
          }
        </Navbar.Collapse>
      </Navbar >
    )
}

export default NavigationBar;
