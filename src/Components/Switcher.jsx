import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../Pages/Login';

export default class Switcher extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    );
  }
}
