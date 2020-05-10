import React from 'react';
import '../styles/App.css';

import VideoChat from './VideoChat';
import Chat from './Chat';
//import Footer from '../components/footer';

const Home = () => {

  const homeStyle = {
    background: 'linear-gradient(180deg, rgba(23,40,74, 1) 5%, rgba(23,40,74, .8) 30%,rgba(0,0,0, .9) 60%), url(https://i.imgur.com/a0XP0R0.png)',
    width: "100%",
    height: "100%",
    position: "relative",
    flexGrow: "1",
    zIndex: "0",
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
      <div style={homeStyle}>
        <div style={{}}>
          {body}
        </div>
      </div >
    </>

  )
}

export default Home;
