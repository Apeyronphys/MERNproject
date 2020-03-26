import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/layout/auth/Register'; 
import Login from './components/layout/auth/Login';
import './App.css';

const App = () => (
  <Router>
  <Fragment>
    <Navbar/>
    <Route exact path = '/' component = { Landing }/>
    <section className = "container" >
      <Switch>
        <Route exact path = "/regiser" component = { Register }/>
        <Route exact path = "/login" component = { Login }/> 
      </Switch>
    </section>
  </Fragment>
  </Router>
);

export default App;
