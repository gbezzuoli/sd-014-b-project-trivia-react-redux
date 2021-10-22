import React, { Component } from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Login from '../pages/Login';
import GamePage from '../pages/GamePage';
import Configs from '../pages/Configs';
import FeedbackPage from '../pages/FeedbackPage';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/paginadojogo" component={ GamePage } />
        <Route path="/configuracoes" component={ Configs } />
        <Route path="/feedback" component={ FeedbackPage } />
      </Switch>
    );
  }
}

export default Routes;
