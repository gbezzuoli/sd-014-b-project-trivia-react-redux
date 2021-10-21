import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Game from '../pages/Game';
import Login from '../pages/Login';

class Content extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
      </Switch>
    );
  }
}

export default Content;
