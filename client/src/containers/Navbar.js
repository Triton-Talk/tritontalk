import React, { useContext } from 'react';
import {Navbar} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/NavBar.css';

import Auth from '../context/auth';
import Page from '../context/page';

import { Link } from 'react-router-dom';

const NavigationBar = () => {

  const { user, handleSignOn, handleSignOut } = useContext(Auth);

  const { page, setPage } = useContext(Page)

  return (
    <div>
      {user !== null && user !== undefined ?
      <Navbar style={styles} bg="dark" variant="dark">
        <Navbar.Toggle />
        <button>Go Chat</button>
        <div className="centered">
          <Link to="/"><h1 className="NavBarLogo">TritonTalk</h1></Link>
        </div>
        <Navbar.Collapse className="justify-content-end">
            <div className="dropdown">
              <button className="dropbtn">Account</button>
              <div className="dropdown-content">
                <button className="dropdown" 
                        onClick={() => setPage('/settings')}>Settings</button>
                <button className="dropdown" 
                        onClick={handleSignOut}>Sign out</button>
              </div>
            </div>

        </Navbar.Collapse>
      </Navbar > : null }
    </div>
  )
}

export default NavigationBar;
