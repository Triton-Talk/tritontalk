import React, { useState, useCallback } from 'react';
import Lobby from '../components/Lobby';
import Room from '../components/Room';
import Auth from '../context/auth';
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap';
import Footer from '../components/footer';
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
      <div style={{ position: "relative", maxHeight: "100%" }}>
        <Lobby
          roomName={roomName}
          handleRoomNameChange={handleRoomNameChange}
          handleSubmit={handleSubmit}
        />
        <center>
          <Card style={{ width: "20%", marginBottom: "10px", paddingBottom: "10px" }}>
            <Card.Header style={{ marginBottom: "10px" }}>For Dev Purposes</Card.Header>


            <br></br><br></br>

            <Link to='/friends'>
              <button className="btn-primary">Friends</button>
            </Link>

            <br></br><br></br>

            <Link to='/splash'>
              <button className="btn-primary">Splash Page</button>
            </Link>

            <br></br><br></br>

            <Link to='/random'>
              <button className="btn-primary">Random Call</button>
            </Link>

            <br></br><br></br>

            <Link to='/home'>
              <button className="btn-primary">Library Walk</button>
            </Link>
          </Card>
        </center>
        <Footer />
      </div>
    );
  }
  return render;
};

export default VideoChat;
