import { Route, Switch } from 'react-router';
import React from 'react';
import Login from '../pages/Login';
import Game from '../pages/Game';
import Ranking from '../pages/Ranking';
import Feedback from '../pages/Feedback';
import Config from '../pages/Config';

class Content extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
        <Route path="/config" component={ Config } />
      </Switch>
    );
  }
}

export default Content;
