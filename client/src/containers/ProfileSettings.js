import React, { Component } from 'react'
import Navbar from './Navbar';
import Settings from '../components/ProfileSettings';
import 'bootstrap/dist/css/bootstrap.min.css';


class ProfileSettings extends Component {

  render() {
    return (
      <div style={{ maxWidth: "100%" }} >
        <Navbar />
        <Settings />
      </div >
    )
  }
}

export default ProfileSettings;
