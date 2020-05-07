import React from 'react';
import '../styles/App.css';

import { Link } from 'react-router-dom'
import Page from '../context/page'

import VideoChat from './VideoChat';
import Chat from './Chat';
import Footer from '../components/footer';

const Home = () => {

  const { page, setPage } = React.useContext(Page)

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
          <button onClick={() => setPage("/registerorganization")}
            className="btn-success">Register an Organization</button>
          <br></br><br></br>
          <button className="btn-primary"
            onClick={() => setPage('/friends')}>Friends</button>
          <br></br><br></br>
          <button className="btn-primary"
            onClick={() => setPage('/splash')}>Splash Page</button>
          <br></br><br></br>
          <button className="btn-primary"
            onClick={() => setPage('/random')}>Random Call</button>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Home;
