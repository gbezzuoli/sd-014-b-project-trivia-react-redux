import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import logo from './trivia.png';
import Login from './pages/Login';
import Game from './pages/Game';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Game } />
    </Switch>
  );
}
