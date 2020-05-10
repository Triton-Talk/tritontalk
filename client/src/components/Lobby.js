import Auth from '../context/auth'
import React from 'react';
import { Card } from 'react-bootstrap';
// import { Card, Jumbotron, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom'
// import Footer from '../components/footer';
// import Photo from './istockphoto-1157983544-170667a.jpg'

const Lobby = ({ roomName, handleRoomNameChange, handleSubmit }) => {

  const { user } = React.useContext(Auth)


  /* 
  const jumbotronStyle = {
    backgroundPosition: "0px 0px",
    height: "400px",
    width: "370px",
    backgroundRepeat: 'repeat',
    borderRadius: "30px",
    background: "url(50%-transparent-white.png)",

  }

  */



  return (
    <div style={{}}>
      <div style={{ width: "100%" }}>
        <div style={{}}>
          < center >
            <Card style={{ width: "350px", borderColor: "rgb(23,40,74)" }}>
              <Card.Header style={{ backgroundColor: "rgb(39,96,152)", color: "white" }}><h2>Enter a room</h2></Card.Header>
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
                  <button style={{ marginRight: "10px", backgroundColor: "rgb(201,226,243)" }} type="submit">Submit</button>
                  <Link to='/newclub'>
                    <button style={{ backgroundColor: "rgb(248,206,70)" }} >Register a Club</button>
                  </Link>
                </div>
              </form>
            </Card>
          </center>
        </div>
      </div>
    </div >
  );
};

export default Lobby;
