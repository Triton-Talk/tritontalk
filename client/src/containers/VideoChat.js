import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'

import Room from '../components/Room';

import Auth from '../utils/auth';
import request from '../utils/request';
//import Chart from '../components/Chart/Chart';

const VideoChat = (props) => {
  const history = useHistory()
  const { user } = React.useContext(Auth);
  const [token, _setToken] = useState(null);

  const setToken = t => _setToken(t)


  const options = { body: { room: props.roomName } }

  const handleLogout = React.useCallback( () => {
      history.push("/")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    let mounted = true
    request('/api/video/token', options).then(res => {
      if(mounted)
        setToken(res.token)
    })
  
    return () => {
      mounted = false
      if(props.host){
        const options = {body: {name: props.roomName}, method: 'POST'}
        return request('/api/video/endCall', options)
            .then(() => request('/api/room/delete', {...options, method: 'DELETE'}))
      }
    
      return null
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (token && user) {
    return <Room style={{ padding: "10px" }} roomName={props.roomName} token={token} handleLogout={handleLogout} host={props.host}/>
  } 
  else {
    return <h1 style={{ color: "white" }}>Getting things ready for you</h1>
  }
};

export default VideoChat;
