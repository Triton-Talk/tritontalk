import React from 'react';
import '../styles/App.css';

import VideoChat from './VideoChat';
import Chat from './Chat';
import Navbar from './Navbar';
import LibraryWalk from '../components/LibraryWalk';

const App = () => {
  return (

    <div className="app">
      <main>
        <Navbar />
        <div style={{ backgroundColor: "lightblue", width: "100%", textAlign: "center", top: 0, position: "relative" }}>
          <VideoChat />
          <Chat />
	  <LibraryWalk />
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
