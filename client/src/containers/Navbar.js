import React, { useContext } from 'react';
import { Navbar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/NavBar.css';

import Auth from '../context/auth';

import { Link } from 'react-router-dom';

const NavigationBar = () => {

  const { user, handleSignOut } = useContext(Auth);

  return (
    <div id='navbar'>
      <Navbar style={styles} bg="dark" variant="dark">
        <Navbar.Toggle />
        {
          user !== null && user !== undefined ?
            <>
              <Link to='/random'><button className='navbtn'>Go Chat</button></Link>
              <div className="centered" style={{ textAlign: "center", height: "10px" }}>
                <Link to="/"><h1 className="NavBarLogo">TritonTalk</h1></Link>
              </div>
              <Navbar.Collapse className="justify-content-end">
                <div className="dropdown">
                  <button className="navbtn">Account</button>
                  <div className="dropdown-content">
                    <Link to='/profile'>
                      <button className="dropdown">Settings</button>
                    </Link>

                    <button className="dropdown"
                      onClick={handleSignOut}>Sign out</button>
                  </div>
                </div>
              </Navbar.Collapse>
            </>
            :
            <div className="centered">
              <h1 className="NavBarLogo">TritonTalk</h1>
            </div>
        }
      </Navbar >
    </div>
  )
}

export default NavigationBar;
