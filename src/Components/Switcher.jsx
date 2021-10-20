import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../Pages/Login';
import Settings from '../Pages/Settings';

export default class Switcher extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    );
  }
}
