import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
import Game from './pages/Game';
import SettingsScreen from './pages/SettingsScreen';

export default function App() {
  return (
    <div>
      <Switch>
        <Route path="/Game" component={ Game } />
        <Route path="/" component={ Login } />
        <Route path="/settings" component={ SettingsScreen } />
      </Switch>
    </div>
  );
}
