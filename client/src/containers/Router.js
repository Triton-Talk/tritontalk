import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import App from './App'
import { AuthProvider } from '../auth'

const Router = () => {
  
  const placeholder = () => { return <h1> placeholder text! </h1> }
    
  /*
  return (
    <AuthProvider>
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route path="/" component={App} />
            <Route path="/login" component={placeholder}/>
            <Route path="/game" component={placeholder}/>
            <Route path="/room" component={placeholder}/>
          </Switch>
        </BrowserRouter>
      </div>
    </AuthProvider>
  )
  */

  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}

export default Router
