import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Game from '../pages/Game';
import Login from '../pages/Login';
import Settings from '../pages/Settings';
import Feedback from '../pages/Feedback';

class Content extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/settings" component={ Settings } />
        <Route path="/feedback" component={ Feedback } />
      </Switch>
    );
  }
}

export default Content;
