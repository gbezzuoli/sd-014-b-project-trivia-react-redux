import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Game from './pages/Game/Game';
import './App.css';
import Settings from './pages/Settings/Settings';

export default function App() {
  return (
    <Switch>
      <Route path="/game" component={ Game } />
      <Route path="/settings" component={ Settings } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}
