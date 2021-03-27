import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { Paper } from '@material-ui/core';

import MainPage from './views/MainPage/MainPage'
import LoginPage from './views/LoginPage/LoginPage'
import BlogPage from './views/BlogPage/BlogPage'
import Navbar from './views/Navbar/Navbar'

import Auth from './hoc/auth'

import './App.scss';

const App: React.FC =() => {
  return (
    <div className="App">
      <Router>
        <Navbar/>
          <Route exact path='/' component={MainPage} />
          {/* <Route path='/login' component={LoginPage} /> */}
          <Route path='/blog' component={Auth(BlogPage, null)} />
      </Router>
    </div>
  );
}

export default App;
