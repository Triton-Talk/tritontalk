import React from 'react';
import '../styles/App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './Home';
import LibraryWalk from '../components/LibraryWalk';

const App = () => {
  return (
    <div className="app">
	<Router>
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/home" exact component={() => <LibraryWalk />} />
        </Switch>
      </Router>
    </div >
  );
};

export default App;
