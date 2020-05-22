import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'

import Room from '../components/Room';

import Auth from '../utils/auth';
import request from '../utils/request';
//import Chart from '../components/Chart/Chart';

const VideoChat = (props) => {
  const history = useHistory()
  const { user } = React.useContext(Auth);
  const roomName = props.roomName
  //const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);
  /*const handleRoomNameChange = useCallback(event => {
    setRoomName(event.target.value);
  }, []);*/

  /* if (!user || !roomName) {
    alert('You must sign in first!')
    return
  }*/
  const options = { body: { room: roomName } }
  request('/api/video/token', options).then(res => setToken(res.token))
  

  const handleLogout = event => {
    setToken(null);
    history.push("/home")
  }
  console.log(token)
  console.log(roomName)
  if (token && user) {
    return <Room style={{ padding: "10px" }} roomName={roomName} token={token} handleLogout={handleLogout} />
  } else {
    return <h1>No token and user</h1>
    
    /*return (
      <div style={{ maxHeight: "100%", maxWidth: "100%" }}>
        <Lobby
          roomName={roomName}
          handleRoomNameChange={handleRoomNameChange}
          handleSubmit={handleSubmit}
        />
        <br></br>
        <div><center><h1 className="OnlineTextSpecial">3</h1><h1 className="OnlineText"> people are online.</h1></center></div>
        <div style={{ paddingBottom: "100px" }}>
        </div>
      </div>
    ); */
    
  }
};

export default VideoChat;
