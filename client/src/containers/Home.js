import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/App.css';

import VideoChat from './VideoChat';

const Home = (props) => {
  const history = useHistory()
  if (!props.location.state) {
    history.push("/")
    return null
  }
  
  const homeStyle = {
    background: 'linear-gradient(180deg, rgba(23,40,74, 1) 5%, rgba(23,40,74, .8) 30%,rgba(0,0,0, .9) 60%), url(https://i.imgur.com/a0XP0R0.png)',
    width: "100%",
    height: "100%",
    position: "relative",
    flexGrow: "1",
    zIndex: "0"
  }

  return (
    <div style={homeStyle}>
      <br></br>
      <VideoChat host={props.location.state.host} roomName={props.location.state.name}/>
    </div >
  )
}

export default Home;
