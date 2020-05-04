import React from 'react';

import App from './App'
import { AuthProvider } from '../auth'

const Router = () => {
  
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}

export default Router
