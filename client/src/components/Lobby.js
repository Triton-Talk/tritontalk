import Auth from '../context/auth'
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'
const Lobby = ({
  roomName,
  handleRoomNameChange,
  handleSubmit
}) => {
  const { user } = React.useContext(Auth)

  return (
    <div>
      <center>
        <Card style={{ marginBottom: "10px", paddingBottom: "10px", margin: "50px", width: "300px", backgroundColor: "dark" }}>
          <Card.Header style={{ marginBottom: "10px", backgroundColor: "#535864", color: "white" }}><h2>Enter a room</h2></Card.Header>
          <form onSubmit={handleSubmit}>
            <div>
              {user ?
                <label htmlFor="name">Name: {user.name} </label> :
                <label htmlFor="name">Name: Please sign in first!</label>}
            </div>

            <div>
              <label htmlFor="room">Room name:</label>
              <input
                type="text"
                id="room"
                value={roomName}
                onChange={handleRoomNameChange}
                required
              /><br></br>
              <button style={{ marginRight: "10px" }} type="submit">Submit</button>
              <Link to='/newclub'>
                <button className="btn-success">Register a Club</button>
              </Link>
            </div>
          </form>
        </Card>
      </center>
    </div>
  );
};

export default Lobby;
