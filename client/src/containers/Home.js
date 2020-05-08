import React from 'react';
import '../styles/App.css';

import { Link } from 'react-router-dom'

import VideoChat from './VideoChat';
import Chat from './Chat';
import Footer from '../components/footer';

const Home = () => {

  const homeStyle = {
    backgroundColor: "lightblue",
    width: "100%",
    height: "100%",
    maxHeight: "100%",
    position: "fixed",
    zIndex: "0",
    top: 80,

  }

  var PAGE = "HOME";
  var body;
  if (PAGE === "HOME") {
    body = <VideoChat />;
  } else {
    body = <Chat />;
  }

  return (
    <main>
      <div style={homeStyle}>
        {body}

      </div>
    </main>

  )
}

export default Home;
