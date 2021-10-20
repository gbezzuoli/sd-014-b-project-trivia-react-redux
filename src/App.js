import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import GamePage from './pages/GamePage';
import ConfigPage from './pages/ConfigPage';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/game" component={ GamePage } />
        <Route path="/config" component={ ConfigPage } />
        <Route exact path="/" component={ LoginPage } />
      </Switch>
    </div>
  );
}
