import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Login from '../pages/Login';
import Game from '../pages/Game';

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
