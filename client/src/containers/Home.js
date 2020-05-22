import React from 'react';
import '../styles/App.css';

import VideoChat from './VideoChat';
import Chat from './Chat';
//import Footer from '../components/footer';
import {useLocation} from 'react-router-dom'

const Home = () => {

  const location = useLocation()

  const homeStyle = {
    background: 'linear-gradient(180deg, rgba(23,40,74, 1) 5%, rgba(23,40,74, .8) 30%,rgba(0,0,0, .9) 60%), url(https://i.imgur.com/a0XP0R0.png)',
    width: "100%",
    height: "100%",
    position: "relative",
    flexGrow: "1",
    zIndex: "0"
  }

  var PAGE = "HOME";
  var body;
  if (PAGE === "HOME") {
    console.log(location.state.name)
    body = <VideoChat roomName={location.state.name}/>;
  } else {
    body = <Chat />;
  }

  return (
    <div style={homeStyle}>
      <br></br>
      {body}
    </div >
  )
}

export default Home;
