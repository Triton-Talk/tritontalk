import React, { useState, useCallback } from 'react';
import Lobby from '../components/Lobby';
import Room from '../components/Room';
import Auth from '../context/auth';

//import { Link } from 'react-router-dom'
//import { Card } from 'react-bootstrap';
import AlertDismissible from '../components/AlertDismissible';
const URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001'

const VideoChat = () => {
  const { user, credential } = React.useContext(Auth);
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);
  const handleRoomNameChange = useCallback(event => {
    setRoomName(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();

      if (!user || !roomName) {
        alert('You must sign in first!')
        return
      }

      const data = await fetch(URL + '/api/video/token', {
        method: 'POST',
        body: JSON.stringify({
          credential: credential,
          room: roomName
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
      setToken(data.token);

    },
    [roomName, user, credential]
  );

  const handleLogout = useCallback(event => {
    setToken(null);
  }, []);

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
      </div>
    );
  }
  return render;
};

export default VideoChat;
