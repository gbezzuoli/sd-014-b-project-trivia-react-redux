import React, { Component } from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Login from '../pages/Login';
import Configs from '../pages/Configs';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/configuracoes" component={ Configs } />
      </Switch>
    );
  }
}

export default Routes;
