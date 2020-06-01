import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'

import Room from '../components/Room';

import Auth from '../utils/auth';
import request from '../utils/request';
//import Chart from '../components/Chart/Chart';

const VideoChat = (props) => {
  const history = useHistory()
  const { user } = React.useContext(Auth);
  const [token, setToken] = useState(null);

  const options = { body: { room: props.roomName } }

  const handleLogout = event => {
    history.push("/")
  }

  React.useEffect(() => {
    let mounted = true
    request('/api/video/token', options).then(res => {
      console.log('REQUEST',mounted)
      if(mounted)
        setToken(res.token)
    })
  
    return () => {
      mounted = false
      console.log('cleanup',mounted)
      if(props.host){
        const options = {body: {name: props.roomName}, method: 'POST'}
        return request('/api/video/endCall', options).then(event => console.log('TRIED TO CLOSE', event))
      }
      return null
    }
  }, [])


  if (token && user) {
    return <Room style={{ padding: "10px" }} roomName={props.roomName} token={token} handleLogout={handleLogout} host={props.host}/>
  } 
  else {
    return <h1>Getting things ready for you</h1>
  }
};

export default VideoChat;
