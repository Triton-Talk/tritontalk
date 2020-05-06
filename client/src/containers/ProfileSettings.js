import React, { Component } from 'react'
import Settings from '../components/Settings';
import 'bootstrap/dist/css/bootstrap.min.css';


class ProfileSettings extends Component {

  render() {
    return (
      <div style={{ maxWidth: "100%" }} >
        <Settings />
      </div >
    )
  }
}

export default ProfileSettings;
