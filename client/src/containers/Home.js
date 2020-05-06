import React from 'react';
import '../styles/App.css';

import Auth from '../auth';
import db, { GoogleSignOn } from '../firebase';

import VideoChat from './VideoChat';
import Chat from './Chat';
import Navbar from './Navbar';

const Home = () => {

  const { setUser, setCredential } = React.useContext(Auth);

  const homeStyle = {
    backgroundColor: "lightblue",
    width: "100%",
    textAlign: "center",
    top: 0,
    position: "relative"
  }


  const handleSignOn = () => {
    db.auth().signInWithPopup(GoogleSignOn).then(result => {
      const email = result.user.email
      if (!email || email.substr(email.lastIndexOf('@')) !== '@ucsd.edu') {
        alert("That's not a UCSD email address!")
        return undefined
      }

      setUser(result.user);

      return db.auth().currentUser.getIdToken()
    }).then(token => {
      if (token)
        setCredential(token)
    }).catch(error => {
      alert(error)
    })
  }

  const handleSignOut = () => {
    setUser(null)
    setCredential(null)
  }
  var PAGE = "HOME";
  var body;
  if (PAGE == "HOME") {
    body = <VideoChat />;
  } else {
    body = <Chat />;
  }

  return (
    <>
      <main>
        <Navbar handleSignOn={handleSignOn} handleSignOut={handleSignOut} />
        <div style={homeStyle}>
          <VideoChat />
        </div>
      </main>
      <footer>
        <p>
          Made with{' '}
          <span role="img" aria-label="React">
            ⚛️
            </span>{' '}
            by M^3 and C
          </p>
      </footer>
    </>
  )
}

export default Home;
