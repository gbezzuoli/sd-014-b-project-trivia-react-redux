// https://newbedev.com/javascript-eslint-unable-to-resolve-path-to-module-import-no-unresolved-code-example
import React from 'react';

import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Login, Game, Settings, Feedback, Ranking } from './pages';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          path="/settings"
          component={ Settings }
        />
        <Route
          path="/game"
          component={ Game }
        />
        <Route
          path="/feedback"
          component={ Feedback }
        />
        <Route
          path="/ranking"
          component={ Ranking }
        />
        <Route
          exact
          path="/"
          component={ Login }
        />
      </Switch>
    </div>
  );
}
