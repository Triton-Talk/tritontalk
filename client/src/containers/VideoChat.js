import React, { useState, useCallback } from 'react';
import Lobby from '../components/Lobby';
import Room from '../components/Room';
import Auth from '../auth';

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

      /*
      const data = await fetch('/api/video/token', {
        method: 'POST',
        body: JSON.stringify({
          identity: user.displayName,
          credential: credential,
          room: roomName
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
      setToken(data.token);
      */

//      setToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2M2NjQzZDlhYjMyZWM0MDAwYzZjYjFhMDk4OTAxYjk1LTE1ODg2MjU2MDgiLCJpc3MiOiJTS2M2NjQzZDlhYjMyZWM0MDAwYzZjYjFhMDk4OTAxYjk1Iiwic3ViIjoiQUNjYjYxNWZiMGI4MjBlZDMzNTBjNTk2NjVkY2YyYWI0NSIsImV4cCI6MTU4ODYyOTIwOCwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiU2h1YmhhbSBLdWxrYXJuaSIsInZpZGVvIjp7InJvb20iOiJnZW5lcmFsIn19fQ.Q6kitwCRXW6G51rkZJApZc_sGRk1VLPOP6elm-c8eoI')
      setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2Q4ODgyN2M2ODM3MjJjMjQ0YmRkMjQ0NTI5OGM2YWZmLTE1ODg2MjYyMDciLCJncmFudHMiOnsiaWRlbnRpdHkiOiJTaHViaGFtIEt1bGthcm5pIiwidmlkZW8iOnsicm9vbSI6ImdlbmVyYWwifX0sImlhdCI6MTU4ODYyNjIwNywiZXhwIjoxNTg4NjI5ODA3LCJpc3MiOiJTS2Q4ODgyN2M2ODM3MjJjMjQ0YmRkMjQ0NTI5OGM2YWZmIiwic3ViIjoiQUNjYjYxNWZiMGI4MjBlZDMzNTBjNTk2NjVkY2YyYWI0NSJ9.oCYJXox1CoWl7AoDEy_KVp0WaIyv5DrjKgzKmy1A1qA')
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
