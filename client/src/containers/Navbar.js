import React, { useContext } from 'react';
import {Navbar} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/NavBar.css';

import Auth from '../context/auth';

import { Link } from 'react-router-dom';

const NavigationBar = () => {

  const { user, handleSignOn, handleSignOut } = useContext(Auth);

  return (
    <div id='navbar'>
      <Navbar style={styles} bg="dark" variant="dark">
        <Navbar.Toggle />
          <Link to='/random'><button className='navbtn'>Go Chat</button></Link>
        <div className="centered">
          <Link to="/"><h1 className="NavBarLogo">TritonTalk</h1></Link>
        </div>
        <Navbar.Collapse className="justify-content-end">
          {
            user !== null && user !== undefined ?
              <div className="dropdown">
                <button className="navbtn">Account</button>
                <div className="dropdown-content">
                  <Link to='/settings'>
                    <button className="dropdown">Settings</button>
                  </Link>

                  <button className="dropdown" 
                          onClick={handleSignOut}>Sign out</button>
                </div>
              </div> 
              : 
              null
          }
        </Navbar.Collapse>
      </Navbar > 
    </div>
  )
}

export default NavigationBar;
