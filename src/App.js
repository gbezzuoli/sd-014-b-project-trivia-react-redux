import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';

import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Switch>
            <Route path="/game" component={ Game } />
            <Route path="/settings" component={ Settings } />
            <Route exact path="/" component={ Login } />
          </Switch>
        </div>
      </header>
    </div>
  );
}
