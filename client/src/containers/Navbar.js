import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Button } from 'react-bootstrap'
import styles from '../styles/NavBar.css';
import Auth from '../auth'

const NavigationBar = () => {

  const { user, handleSignOn, handleSignOut } = useContext(Auth);

  const oldEnding = (
      <Navbar.Collapse className="justify-content-end">
        {user !== null && user !== undefined ?
          (
            <>
              <Navbar.Text>
                Signed in as: {user.name}
                <button onClick={handleSignOut}> sign out </button>
              </Navbar.Text>
            </>
          )
          :
          (
            <Navbar.Text>
              Not currently signed in
              <button onClick={handleSignOn}> sign in </button>
            </Navbar.Text>
          )
        }
      </Navbar.Collapse>)

  return (
    <Navbar style={styles} bg="dark" variant="dark">
      <Navbar.Toggle />
      <button>Go Chat</button>
      <div className="centered">
        <a href="/"><h1 className="NavBarLogo">TritonTalk</h1></a>
      </div>
      <Navbar.Collapse className="justify-content-end">
        <div class="dropdown">
        {
          user !== null && user !== undefined ?
          <>
            <button className="dropbtn">Account Settings</button>
            <div className="dropdown-content">
              <button onClick={()=> history.push('/profilesettings') }
                      className="dropdown-button">Profile Settings</button>
              <button className="dropdown-button" 
                      onClick={handleSignOut}>Sign out</button>
            </div>
          </>
          : 
          <>
            <button className="dropbtn" onClick={handleSignOn} 
                    styles={{width:'100px'}}>Sign in</button>
          </>
        }
        </div>
      </Navbar.Collapse>
    </Navbar >
  )
}

export default NavigationBar;
