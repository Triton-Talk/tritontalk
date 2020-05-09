import React from 'react';
import '../styles/App.css';

import { Link } from 'react-router-dom'

import VideoChat from './VideoChat';
import Chat from './Chat';
import Footer from '../components/footer';

const Home = () => {

  const homeStyle = {
    backgroundImage: 'url(https://i.imgur.com/a0XP0R0.png)',
    width: "100%",
    height: "100%",
    maxHeight: "100%",
    position: "fixed",
    zIndex: "0",
    top: 55,

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
      {body}

    </div>

  )
}

export default Home;
