import React, { useContext } from 'react';
import { Navbar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/NavBar.css';

import Auth from '../context/auth'
import Page from '../context/page'

import { Link } from 'react-router-dom';

const NavigationBar = () => {

  const { user, handleSignOn, handleSignOut } = useContext(Auth);

  const { page, setPage } = useContext(Page)

  return (
    <Navbar style={styles} bg="dark" variant="dark">
      <Navbar.Toggle />
      <button onClick={() => setPage('/random')}>Go Chat</button>
      <div className="centered">
        <Link to="/"><h1 className="NavBarLogo">TritonTalk</h1></Link>
      </div>
      <Navbar.Collapse className="justify-content-end">
        {
          user !== null && user !== undefined ?
            <div className="dropdown">
              <button className="dropbtn">Account</button>
              <div className="dropdown-content">
                <button className="dropdown"
                  onClick={() => setPage('/settings')}>Settings</button>
                <button className="dropdown"
                  onClick={handleSignOut}>Sign out</button>
              </div>
            </div>
            :
            <div className="dropdown">
              <button className="dropbtn" onClick={handleSignOn}>Sign in</button>
            </div>
        }
      </Navbar.Collapse>
    </Navbar >
  )
}

export default NavigationBar;
