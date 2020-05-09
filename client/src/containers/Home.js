import React from 'react';
import '../styles/App.css';

import background_image from '../assets/background_image.png'

//import { Link } from 'react-router-dom'

import VideoChat from './VideoChat';
import Chat from './Chat';
//import Footer from '../components/footer';

const Home = () => {

  const homeStyle = {
    background:`linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url(${background_image})`,
    width: "100%",
    height: "100%",
    position: "relative",
    zIndex: "0",
    flexGrow: "1"
  }

  var PAGE = "HOME";
  var body;
  if (PAGE === "HOME") {
    body = <VideoChat />;
  } else {
    body = <Chat />;
  }

  return (
    <div style={homeStyle}>
      <div style={{ paddingTop: "100px" }}>
        {body}
      </div>
    </div >

  )
}

export default Home;
