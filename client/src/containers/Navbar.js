import React, { useContext } from 'react';
import { Navbar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/NavBar.css';
import AlertDismissible from '../components/AlertDismissible';
import Auth from '../utils/auth';

import { Link } from 'react-router-dom';
import { NONE } from 'phaser';

const NavigationBar = () => {

  const { user, handleSignOut } = useContext(Auth);
  const lengthOfButton = user ? user.name.length * 10 : NONE;
  
  const navStyle = {
    ...styles, 
    background: "rgb(23,40,74)",
  }

  const lengthOfButtonString = lengthOfButton + "px";
  return (
    <div style={{ backgroundColor: "rgb(197,146,66)" }}>
      <div>
        <Navbar style={ navStyle }>
          <Navbar.Toggle />
          {
            user !== null && user !== undefined ?
              <>
                <div className="centered" style={{ textAlign: "center", height: '54px' }}>
                  <Link to="/lobby"><h1 className="NavBarLogo">TritonTalk</h1></Link>
                </div>
                <Navbar.Collapse className="justify-content-end">
                  <div className="dropdown">
                    <button style={{
                      width: lengthOfButtonString,
                      cursor: 'default'
                    }}> {user.name}</button>
                    <div className="dropdown-content">
                      <Link to='/profile'>
                        <button className="dropdown">Account Settings</button>
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
      <div ><AlertDismissible /></div>
    </div >
  )
}

export default NavigationBar;
