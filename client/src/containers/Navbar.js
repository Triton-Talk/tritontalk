import React, { useContext } from 'react';
import { Navbar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie'

import AlertDismissible from '../components/AlertDismissible';
import Auth from '../utils/auth';

import styles from '../styles/NavBar.css';

const cookies = new Cookies()
let killAlert = cookies.get('killAlert');

const NavigationBar = () => {

  const { user, handleSignOut } = useContext(Auth);
  const lengthOfButton = user ? user.name.length * 10 : null;

  const location = useLocation()

  const [show, setShow] = React.useState(killAlert === undefined ? true : !killAlert)

  const navStyle = {
    ...styles,
    background: "rgb(23,40,74)",
  }

  const height = show && !(location.pathname === '/' || location.pathname === '/login') ? 'calc(8vh + 17vh)' : '8vh'

  const lengthOfButtonString = lengthOfButton + "px";
  //if (location.pathname === '/login') return <></>
  return (
    <div id="navbar-div" style={{ display: location.pathname === '/login' ? 'none' : 'block',  
    height, backgroundColor: "rgb(23, 40, 74)", zIndex: "2" }}>
      <Navbar style={navStyle}>
        <Navbar.Toggle />
        {
          user !== null && user !== undefined ?
            <>
              <Link to='/myclubs'>
              <button id="clubsButton" style={{
                width: 100,
              }}>Clubs</button>
              </Link>
              <div className="centered" style={{ textAlign: "center", height: '54px' }}>
                <Link to="/"><h1 className="NavBarLogo">TritonTalk</h1></Link>
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
                    {/*
                    <Link to='/friends'>
                      <button className="dropdown">Friends</button>
                    </Link>
                    */}
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
      {killAlert ? null :
        <div style={location.pathname === '/' || location.pathname === '/home' ? { display: 'none' } : null} >
          <AlertDismissible setShow={setShow} killAlert={e => cookies.set('killAlert', true)} />
        </div>}
    </div >
  )
}

export default NavigationBar;
