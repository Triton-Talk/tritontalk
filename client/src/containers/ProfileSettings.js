import React, { Component } from 'react'
import Settings from '../components/Settings';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/footer';

class ProfileSettings extends Component {

  render() {
    return (
      <div style={{ maxWidth: "100%" }} >
        <Settings />
        <br></br>
        <Footer />
      </div >
    )
  }
}

export default ProfileSettings;
