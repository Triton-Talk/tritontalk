import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import '../styles/App.css';

import Navbar from './Navbar'

import Home from './Home';
import LibraryWalk from '../components/LibraryWalk';
import Friends from './Friends';
import ProfileSettings from './ProfileSettings';
import RandomCall from './RandomCall';
import RegisterOrganization from './RegisterOrganization';
import SplashPage from './SplashPage';
import RegisterUser from './RegisterUser';
import MyClubs from './MyClubs'
import { AuthProvider } from '../utils/auth';

const Router = () => {

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app" id="main-component">
          <Navbar />
          <Switch>
            <Route path="/" exact component={SplashPage} />
            <Route path="/home" exact component={LibraryWalk} />
            <Route path="/friends" exact component={Friends} />
            <Route path="/profile" exact component={ProfileSettings} />
            <Route path="/random" exact component={RandomCall} />
            <Route path="/newclub" exact component={RegisterOrganization} />
            <Route path="/lobby" exact component={Home} />
            <Route path="/newuser" exact component={RegisterUser} />
            <Route path="/myclubs" exact component={MyClubs} />
          </Switch>
        </div >
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Router;
