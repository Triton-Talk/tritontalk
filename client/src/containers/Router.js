import React,{useContext} from 'react';
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

import { AuthProvider } from '../context/auth';

const Router = () => {
  return (

    <BrowserRouter>
      <AuthProvider>
        <div className="app">
          <Navbar/>
          <Switch>
            <Route path="/" exact component={() => <Home />} />
            <Route path="/home" exact component={() => <LibraryWalk />} />
            <Route path="/friends" exact component={() => <Friends />} />
            <Route path="/settings" exact component={() => <ProfileSettings />} />
            <Route path="/random" exact component={() => <RandomCall />} />
            <Route path="/registerorganization" exact component={() => <RegisterOrganization />} />
            <Route path="/splash" exact component={() => <SplashPage />} />
          </Switch>
        </div >
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Router;
