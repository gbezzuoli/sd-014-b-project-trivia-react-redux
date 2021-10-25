import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Game from '../pages/Game';
import Login from '../pages/Login';
import Settings from '../pages/Settings';
import Feedback from '../pages/Feedback';
import Ranking from '../pages/Ranking';

class Content extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/feedback" component={ Feedback } />
        <Route exact path="/ranking" component={ Ranking } />
      </Switch>
    );
  }
}

export default Content;
