import React,{useContext} from 'react';
import styles from '../styles/SplashPage.css';
import BackgroundImage from "./SplashPageBackground.png";
import SplashPageBackground from './SplashPageBackground.png'

import Auth from '../context/auth';
import Page from '../context/page';

function SplashPage() {
  const { user, handleSignOn, handleSignOut } = useContext(Auth);
  const { page, setPage } = useContext(Page)
  return (
    <div className="App" style={{backgroundImage: `url(${SplashPageBackground})` }}>
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
