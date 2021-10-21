import React from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './trivia.png';
import Login from './pages/Login';
import Game from './pages/Game';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <div>
          <Switch>
            <Route path="/game" component={ Game } />
            <Route exact path="/" component={ Login } />
          </Switch>
        </div>
      </header>
    </div>
  );
}
