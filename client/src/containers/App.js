import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import '../styles/App.css';

import Home from './Home';
import LibraryWalk from '../components/LibraryWalk';

import { AuthProvider } from '../auth'

const App = () => {
  return (

    <AuthProvider>
      <div className="app">
        <Router>
          <Switch>
            <Route path="/" exact component={() => <Home />} />
            <Route path="/home" exact component={() => <LibraryWalk />} />
          </Switch>
        </Router>
      </div >
    </AuthProvider>
  );
};

export default App;
