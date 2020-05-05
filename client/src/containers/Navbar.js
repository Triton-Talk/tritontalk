import React, {useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap'

import Auth from '../auth'

const NavigationBar = ({handleSignOn, handleSignOut}) => {
    
    const { user } = useContext(Auth);

    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Library Walk</Navbar.Brand>
        <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-end">
          { user !== null && user !== undefined ? 
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
      </Navbar>
    )
}

export default NavigationBar;
