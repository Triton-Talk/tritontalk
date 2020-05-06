import React from 'react';
import Navbar from "./Navbar";
import styles from '../styles/SplashPage.css';
import BackgroundImage from "./SplashPageBackground.png";

function SplashPage() {
  return (
    <div styles={{ ...styles, backgroundImage: { BackgroundImage } }}>
      <Navbar />
      <h1 className="Logo">TritonTalk</h1>
      <h3 className="SubText">The Virtual Library Walk</h3>
    </div>
  );
}

export default SplashPage;
