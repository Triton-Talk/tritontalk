import React, {useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap'
import Auth from '../auth';
import db, { GoogleSignOn } from '../firebase'

const NavigationBar = () => {
    
    const { user, setUser } = useContext(Auth);

    const handleLoginWithGoogle = () => {
      try{
	db.auth().signInWithPopup(GoogleSignOn).then(result => {

          const email = result.user.email
          if(!email || email.substr(email.lastIndexOf('@')) !== '@ucsd.edu'){
            alert("That's not a UCSD email address!")
            return
          }

          setUser(result.user.displayName);
        });
      }
      catch (error){
	alert(error);
      }
    }

    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Library Walk</Navbar.Brand>
        <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-end">
          { user !== null ? 
          ( 
            <>
              <Navbar.Text>
                Signed in as:  {user} 
                <button onClick={() => {setUser(null)}}> sign out </button>
              </Navbar.Text>
            </>
            )
          : 
            (
            <Navbar.Text> 
              Not currently signed in
              <button onClick={handleLoginWithGoogle}> sign in </button>
            </Navbar.Text>
            )
          }
        </Navbar.Collapse>
      </Navbar>
    )
}

export default NavigationBar;
