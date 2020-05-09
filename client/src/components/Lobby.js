import Auth from '../context/auth'
import React from 'react';
import { Card, Jumbotron } from 'react-bootstrap';
// import { Card, Jumbotron, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom'
// import Footer from '../components/footer';

const Lobby = ({ roomName, handleRoomNameChange, handleSubmit }) => {
  const { user } = React.useContext(Auth)

  const jumbotronStyle = { 
    marginRight: "5%", 
    marginLeft: "5%", 
    backgroundImage: 'url(https://cdn.dribbble.com/users/203/screenshots/7061588/media/e1ac677468cb6c05c02070bb06a7b5e9.png', 
    backgroundPosition: "0px 0px", 
    height: "400px", 
    backgroundRepeat: 'repeat', 
    top: "600px", 
    borderRadius: "80px" 
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <Jumbotron fluid style={jumbotronStyle} >
        <div style={{ margin: "auto" }}>
          < center >
            <Card style={{ width: "350px", marginBottom: "4px" }}>
              <Card.Header style={{ marginBottom: "10px", backgroundColor: "#024b30", color: "white" }}><h2>Enter a room</h2></Card.Header>
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
