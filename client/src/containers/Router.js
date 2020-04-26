import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import App from './App'
import Navbar from './Navbar'

const Router = () => {
  
  const placeholder = () => { return <h1> placeholder text! </h1> }
    
  return (
    <div className="app">
      <Navbar />
      <BrowserRouter>
        <Switch>
          <Route path="/" component={App} />
          <Route path="/login" component={placeholder}/>
          <Route path="/game" component={placeholder}/>
          <Route path="/room" component={placeholder}/>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default Router
