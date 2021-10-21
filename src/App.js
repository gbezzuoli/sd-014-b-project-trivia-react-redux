import React from 'react';
import { Switch, Route } from 'react-router';

import './App.css';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Ranking } />
      <Route path="/feedback" component={ Feedback } />
      {/* <Route path="/ranking" component={ Ranking } /> */}
    </Switch>
  );
}
