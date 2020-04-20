import React from 'react';
import './App.css';
import VideoChat from './VideoChat';
import Chat from './Chat';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Alert } from 'react-bootstrap';
import { Alert, Navbar } from 'react-bootstrap'
const App = () => {
  return (

    <div className="app">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Library Walk</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <main>
        <div style={{ backgroundColor: "lightblue", width: "100%", textAlign: "center", top: 0, position: "relative" }}>
          <VideoChat />
          <Chat />
          {/* make a new project with redux for state management */}
        </div>
      </main>
      <footer>
        <p>
          Made with{' '}
          <span role="img" aria-label="React">
            ⚛️
          </span>{' '}
          by M^3 and C
        </p>
      </footer>
    </div >
  );
};

export default App;
