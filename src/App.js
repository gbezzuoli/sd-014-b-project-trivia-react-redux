import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import logo from './trivia.png';
import './App.css';
import Login from './components/pages/Login';
import Settings from './components/pages/Settings';

class App extends Component {
  render() {
    return (
      <Switch>
        <main className="App">
          <header className="App-header">
            <img src={ logo } className="App-logo" alt="logo" />
            <Route exact path="/" component={ Login } />
            <Route exact path="/settings" component={ Settings } />

          </header>
        </main>
      </Switch>
    );
  }
}

export default App;
