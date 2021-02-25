import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'

import MainPage from './components/pages/MainPage'
import LoginPage from './components/pages/LoginPage'

import './App.css';

const App: React.FC =() => {
  return (
    <div className="App">
      HELLO JJUHEY's WORLD
      <Router>
        <Route path='/main' component={MainPage} />
        <Route path='/sign' component={LoginPage} />
      </Router>
    </div>
  );
}

export default App;
