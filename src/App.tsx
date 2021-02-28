import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'

import MainPage from './views/MainPage/MainPage'
import LoginPage from './views/LoginPage/LoginPage'
import BlogPage from './views/BlogPage/BlogPage'
import Navbar from './views/Navbar/Navbar'

import './App.scss';
import { Paper } from '@material-ui/core';

const App: React.FC =() => {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <div className='outer'>
          <Paper className='paper' elevation={3}>
            <Route exact path='/' component={MainPage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/blog' component={BlogPage} />
          </Paper>
        </div>
      </Router>
    </div>
  );
}

export default App;
