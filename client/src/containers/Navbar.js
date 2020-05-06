import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Button } from 'react-bootstrap'
import styles from '../styles/NavBar.css';
import Auth from '../auth'

const NavigationBar = () => {

  const { user, handleSignOn, handleSignOut } = useContext(Auth);

  return (
    <Navbar style={styles} bg="dark" variant="dark">
      <Navbar.Toggle />
      <Button style={{ backgroundColor: "#FFDF35", color: "black" }}>Go Chat</Button>
      <div className="centered">
        <h1 className="NavBarLogo">TritonTalk</h1>
      </div>
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
      </Navbar.Collapse>
    </Navbar >
  )
}

export default NavigationBar;
