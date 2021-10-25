import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
import Game from './pages/Game';
import SettingsScreen from './pages/SettingsScreen';
import Feedbacks from './pages/Feedbacks';

export default function App() {
  return (
    <div>
      <Switch>
        <Route path="/Game" component={ Game } />
        <Route path="/settings" component={ SettingsScreen } />
        <Route path="/feedbacks" component={ Feedbacks } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}
