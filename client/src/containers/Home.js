import React from 'react';
import '../styles/App.css';

import VideoChat from './VideoChat';
import Chat from './Chat';
import Navbar from './Navbar';

const Home = () => {

  const homeStyle = {
    backgroundColor: "lightblue",
    width: "100%",
    textAlign: "center",
    top: 0,
    position: "relative"
  }


  var PAGE = "HOME";
  var body;
  if (PAGE === "HOME") {
    body = <VideoChat />;
  } else {
    body = <Chat />;
  }

  return (
    <>
      <main>
        <Navbar />
        <div style={homeStyle}>
          {body}
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
