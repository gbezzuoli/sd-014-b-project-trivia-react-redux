import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Login from './pages/Login';
import Game from './pages/Game';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/game" component={ Game } />
    </Switch>
  );
}
