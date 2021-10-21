import React from 'react';
// import logo from './trivia.png';
import Login from './pages/Login';
import Game from './pages/Game';
import './App.css';
import { Switch, Route } from 'react-router';

      {/* <header className="App-header">
        {/* <img src={ logo } className="App-logo" alt="logo" /> */}
      {/* </header> */}
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
