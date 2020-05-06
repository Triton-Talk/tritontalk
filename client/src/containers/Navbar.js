import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Button } from 'react-bootstrap'
import styles from '../styles/NavBar.css';
import Auth from '../auth'

const NavigationBar = ({ handleSignOn, handleSignOut }) => {

  const { user } = useContext(Auth);

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Toggle />
      <Button style={{ backgroundColor: "#FFDF35", color: "black" }}>Go Chat</Button>
      <div class="centered">
        <h1 class="NavBarLogo">TritonTalk</h1>
      </div>
      <Navbar.Collapse className="justify-content-end">
        {user !== null && user !== undefined ?
          (
            <>
              <Navbar.Text>
                Signed in as: {user.displayName}
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
      </Navbar.Collapse>
    </Navbar >
  )
}

export default NavigationBar;
