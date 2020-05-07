import React, { useContext } from 'react';
import {Navbar} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/NavBar.css';

import Auth from '../context/auth';

import { Link } from 'react-router-dom';

const NavigationBar = () => {

  const { user, handleSignOn, handleSignOut } = useContext(Auth);

  return (
    <div>
      {user !== null && user !== undefined ?
      <Navbar style={styles} bg="dark" variant="dark">
        <Navbar.Toggle />
        <button className='navbtn'>Go Chat</button>
        <div className="centered">
          <Link to="/"><h1 className="NavBarLogo">TritonTalk</h1></Link>
        </div>
        <Navbar.Collapse className="justify-content-end">
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

        </Navbar.Collapse>
      </Navbar > : null }
    </div>
  )
}

export default NavigationBar;
