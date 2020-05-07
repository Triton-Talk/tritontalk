import React from 'react';
import '../styles/App.css';

import { Link } from 'react-router-dom'

import VideoChat from './VideoChat';
import Chat from './Chat';
import Footer from '../components/footer';

const Home = () => {

  const homeStyle = {
    backgroundColor: "lightblue",
    width: "100%",
    height: "auto",
    maxHeight: "100%",
    textAlign: "center",
    position: "fixed",
    zIndex: "0",
    bottom: 70,
    top: 80,

  }

  var PAGE = "HOME";
  var body;
  if (PAGE === "HOME") {
    body = <VideoChat />;
  } else {
    body = <Chat />;
  }

  return (
    <>
      <main>
        <div class="shadow-lg p-3  " style={homeStyle}>
          {body}

          <Link to='/registerorganization'>
            <button className="btn-success">Register an Organization</button>
          </Link>

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
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Home;
