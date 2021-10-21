import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Game from './pages/Game/Game';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route path="/" component={ Login } />
      <Route path="/game" component={ Game } />
    </Switch>
  );
}
