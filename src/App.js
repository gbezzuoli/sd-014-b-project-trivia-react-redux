import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import ButtonSettings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/settings" component={ ButtonSettings } />
        <Route path="/game" component={ Game } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </BrowserRouter>
  );
}
