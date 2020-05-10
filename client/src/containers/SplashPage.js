import React,{useContext} from 'react';
import '../styles/SplashPage.css';
import SplashPageBackground from './SplashPageBackground.png'

import Auth from '../utils/auth';

function SplashPage() {
  const { handleSignOn } = useContext(Auth);

  return (
    <div className="App" style={{backgroundImage: `url(${SplashPageBackground})`, height:'calc(100vh - 76px)' }}>
      <h1 className="Logo">TritonTalk</h1>
      <h3 className="SubText">The Virtual Library Walk</h3>
      <div className="vertical">
        <button className="button">SIGN UP</button>
        <button className="button" onClick={handleSignOn}>LOGIN</button>
      </div>
    </div>
  );
}

export default SplashPage;
