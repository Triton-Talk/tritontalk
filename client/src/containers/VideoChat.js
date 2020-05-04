import React, { useState, useCallback } from 'react';
import Lobby from '../components/Lobby';
import Room from '../components/Room';
import Auth from '../auth';
import db from '../firebase';

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

      if(!user || !roomName){ 
        alert('You must sign in first!')
        return
      }

      const data = await fetch('/api/video/token', {
        method: 'POST',
        body: JSON.stringify({
          identity: user.email,
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
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <Lobby
        roomName={roomName}
        handleRoomNameChange={handleRoomNameChange}
        handleSubmit={handleSubmit}
      />
    );
  }
  return render;
};

export default VideoChat;
