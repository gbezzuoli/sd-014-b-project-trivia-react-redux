// https://newbedev.com/javascript-eslint-unable-to-resolve-path-to-module-import-no-unresolved-code-example
import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Login, Game, Settings } from './pages';

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
          exact
          path="/"
          component={ Login }
        />
      </Switch>
    </div>
  );
}
