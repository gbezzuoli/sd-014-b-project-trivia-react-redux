import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';

export default function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>
      </header> */}
      <Switch>
        <Route exact path="/" component={ Login } />
        {/* <Route path="/config" component={ Config } />
        <Route path="/game" component={ Game } /> */}
      </Switch>
    </div>
  );
}
