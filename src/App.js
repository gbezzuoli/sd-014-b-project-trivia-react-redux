import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
import Game from './pages/Game';
import './App.css';
/* <header className="App-header">
/* <img src={ logo } className="App-logo" alt="logo" />
/* </header> */
export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/Game" component={ Game } />
        <Route path="/" component={ Login } />
      </Switch>
    </div>
  );
}
