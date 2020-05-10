import React, { useState, useCallback } from 'react';

import Lobby from '../components/Lobby';
import Room from '../components/Room';


import Auth from '../context/auth';
import request from '../context/request';
import Chart from '../components/Chart/Chart';


//import { Link } from 'react-router-dom'
//import { Card } from 'react-bootstrap';

const VideoChat = () => {
  const { user } = React.useContext(Auth);
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);
  const handleRoomNameChange = useCallback(event => {
    setRoomName(event.target.value);
  }, []);

  const handleSubmit = event => {
    event.preventDefault();

    if (!user || !roomName) {
      alert('You must sign in first!')
      return
    }

    const options = { body: { room: roomName } }
    request('/api/video/token', options).then(res => setToken(res.token))
  }

  const handleLogout = event => setToken(null);

  let render;
  if (token) {
    render = (
      <Room style={{ padding: "10px" }} roomName={roomName} token={token} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <div style={{ maxHeight: "100%", maxWidth: "100%" }}>
        <Lobby
          roomName={roomName}
          handleRoomNameChange={handleRoomNameChange}
          handleSubmit={handleSubmit}
        />
        <br></br>
        <div><center><h1 className="OnlineText">Currently: 3 people are online.</h1></center></div>
        <div style={{ paddingBottom: "100px" }}>
          <center><Chart /></center>
        </div>
      </div>
    );
  }
  return render;
};

export default VideoChat;
