import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import '../styles/App.css';

import Navbar from './Navbar'

import Home from './Home';
import LibraryWalk from '../components/LibraryWalk';
import Friends from './Friends';
import Settings from '../components/Settings';
import RegisterOrganization from './RegisterOrganization';
import SplashPage from './SplashPage';
import RegisterUser from './RegisterUser';
import EditClub from './EditClub'
import NotPage from './NotPage'
import MyClubs from './MyClubs'
import { AuthProvider } from '../utils/auth';

const Router = () => {  

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app" id="main-component" >
          <Navbar />
          <Switch>
            <Route path="/login" exact component={SplashPage} />
            <Route path="/" exact component={LibraryWalk} />
            <Route path="/friends" exact component={Friends} />
            <Route path="/profile" exact component={Settings} />
            <Route path="/newclub" exact component={RegisterOrganization} />
            <Route path="/lobby" exact component={Home} />
            <Route path="/newuser" exact component={RegisterUser} />
            <Route path="/myclubs" exact component={MyClubs} />
            <Route path="/editclub" exact component={EditClub}/>
            <Route path="/" component={NotPage}/>
          </Switch>
        </div >
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Router;
