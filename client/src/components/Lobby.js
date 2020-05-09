import Auth from '../context/auth'
import React from 'react';
import { Card, Jumbotron, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Footer from '../components/footer';
import Photo from './istockphoto-1157983544-170667a.jpg'
const Lobby = ({
  roomName,
  handleRoomNameChange,
  handleSubmit
}) => {
  const { user } = React.useContext(Auth)

  return (
    <div style={{ marginTop: "20px" }}>
      <Jumbotron class="rounded" fluid style={{ marginRight: "5%", marginLeft: "5%", backgroundPosition: "0px 0px", height: "400px", backgroundRepeat: 'repeat', top: "600px", borderRadius: "80px", background: "url(50%-transparent-white.png)", background: "rgba(000,000,000,0.5)" }} >
        <div style={{ margin: "auto", position: "relative" }}>
          < center >
            <Card style={{ width: "350px", marginBottom: "4px" }}>
              <Card.Header style={{ marginBottom: "10px" }}><h2>Enter a room</h2></Card.Header>
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
      </Jumbotron>

      <div><center><h1 className="OnlineText">Currently: 3 people are online.</h1></center></div>
    </div >
  );
};

export default Lobby;
