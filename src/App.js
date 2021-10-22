import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Config } from './pages/Config';
import Game from './pages/Game';
import Login from './pages/Login';
import Feedbacks from './pages/Feedbacks';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Game } />
      <Route path="/configuration" component={ Config } />
      <Route path="/feedbacks" component={ Feedbacks } />
    </Switch>
  );
}
