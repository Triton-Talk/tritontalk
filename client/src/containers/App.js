import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import '../styles/App.css';

import Home from './Home';
import LibraryWalk from '../components/LibraryWalk';
import Friends from '../containers/Friends';
import ProfileSettings from '../containers/ProfileSettings';
import RandomCall from '../containers/RandomCall';
import RegisterOrganization from '../containers/RegisterOrganization';
import SplashPage from '../containers/SplashPage';


import { AuthProvider } from '../auth'

const App = () => {
  return (

    <AuthProvider>
      <div className="app">
        <Router>
          <Switch>
            <Route path="/" exact component={() => <Home />} />
            <Route path="/home" exact component={() => <LibraryWalk />} />
            <Route path="/friends" exact component={() => <Friends />} />
            <Route path="/ProfileSettings" exact component={() => <ProfileSettings />} />
            <Route path="/RandomCall" exact component={() => <RandomCall />} />
            <Route path="/RegisterOrganization" exact component={() => <RegisterOrganization />} />
            <Route path="/SplashPage" exact component={() => <SplashPage />} />
          </Switch>
        </Router>
      </div >
    </AuthProvider>
  );
};

export default App;
