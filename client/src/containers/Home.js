import React from 'react';
import '../styles/App.css';

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
          <form method="get" action="/registerorganization">
            <button class="btn-success" type="submit">Register an Organization</button>
          </form>
          <br></br><br></br>

          <form method="get" action="/friends">
            <button class="btn-primary" type="submit">Friends</button>
          </form>
          <form method="get" action="/splash">
            <button class="btn-primary" type="submit">Splash Page</button>
          </form>
          <form method="get" action="/random">
            <button class="btn-primary" type="submit">Random Call</button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Home;
