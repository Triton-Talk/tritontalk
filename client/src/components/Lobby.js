import Auth from '../context/auth'
import React from 'react';
import { Card, Jumbotron, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Footer from '../components/footer';
const Lobby = ({
  roomName,
  handleRoomNameChange,
  handleSubmit
}) => {
  const { user } = React.useContext(Auth)

  return (
    <div>
      <Jumbotron fluid style={{ backgroundImage: 'url(https://ucsdnews.ucsd.edu/news_uploads/Back-to-School-150110.jpg', backgroundPosition: "0px -100px", height: "400px", backgroundRepeat: 'repeat', width: "100%", borderBottomStyle: "solid", borderBottomWidth: ".02px", top: "-5px", position: "absolute" }}>
        <div style={{ marginLeft: "100px" }}>
          <ul style={{ textAlign: "justify", width: "100%", display: "flex", verticalAlign: "top" }}>
            <li style={{ position: "relative" }}>
              <Card style={{ width: "350px", backgroundColor: "dark", marginRight: "100px" }}>
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

            </li>
            <li>
              <Card style={{ width: "180px", marginBottom: "10px", paddingBottom: "10px" }}>
                <Card.Header style={{ marginBottom: "10px" }}>For Dev Purposes</Card.Header>


                <br></br>

                <center>
                  <Link to='/friends'>
                    <button className="btn-danger">Friends</button>
                  </Link>
                </center>

                <br></br>

                <center>
                  <Link to='/splash'>
                    <button className="btn-danger">Splash Page</button>
                  </Link>
                </center>

                <br></br>


                <center>
                  <Link to='/home'>
                    <button className="btn-danger">Library Walk</button>
                  </Link>
                </center>
              </Card>
            </li>
          </ul>
        </div>
      </Jumbotron>
    </div>
  );
};

export default Lobby;
