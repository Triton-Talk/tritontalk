import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap'

const NavigationBar = () => {
    
    //const { user, loggedIn } = useContext(AuthContext);

    const [user, setUser] = useState("none")
    const [loggedIn, setLoggedIn] = useState(false)

    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Library Walk</Navbar.Brand>
        <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-end">
          { loggedIn ? 
          ( 
            <>
              <Navbar.Text>
                Signed in as:  {user} 
                <button onClick={() => {setLoggedIn(!loggedIn)}}> sign out </button>
              </Navbar.Text>
            </>
            )
          : 
            (
            <Navbar.Text> 
              Not currently signed in
              <button onClick={() => {setLoggedIn(!loggedIn)}}> sign in </button>
            </Navbar.Text>
            )
          }
        </Navbar.Collapse>
      </Navbar>
    )
}

export default NavigationBar;
