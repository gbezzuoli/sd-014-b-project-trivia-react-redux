import React, { Component } from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Login from '../pages/Login';
import GamePage from '../pages/GamePage';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/paginadojogo" component={ GamePage } />

      </Switch>
    );
  }
}

export default Routes;
