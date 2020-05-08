import React, { useContext } from 'react';
import { Navbar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/NavBar.css';

import Auth from '../context/auth';

import { Link } from 'react-router-dom';
import { NONE } from 'phaser';

const NavigationBar = () => {

  const { user, handleSignOut } = useContext(Auth);
  const lengthOfButton = user ? user.name.length * 10 : NONE;


  const lengthOfButtonString = lengthOfButton + "px";
  return (
    <div id='navbar'>
      <Navbar style={styles} bg="dark" variant="dark">
        <Navbar.Toggle />
        {
          user !== null && user !== undefined ?
            <>
              <div className="centered" style={{ textAlign: "center", height: "10px" }}>
                <Link to="/splash"><h1 className="NavBarLogo">TritonTalk</h1></Link>
              </div>
              <Navbar.Collapse className="justify-content-end">
                <div className="dropdown">
                  <button style={{ width: lengthOfButtonString }} className="navbtn">{user.name}</button>
                  <div className="dropdown-content">
                    <Link to='/lobby'>
                      <button className="dropdown">Lobby</button>
                    </Link>
                    <Link to='/random'>
                      <button className="dropdown">Meet a Student</button>
                    </Link>
                    <Link to='/home'>
                      <button className="dropdown">Library Walk</button>
                    </Link>
                    <Link to='/friends'>
                      <button className="dropdown">Friends</button>
                    </Link>
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
