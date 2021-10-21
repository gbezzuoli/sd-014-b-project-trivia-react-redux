import React, { Component } from 'react';
import logo from './trivia.png';
import './App.css';
import Login from './components/pages/Login';

class App extends Component {
  render() {
    return (
      <main className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <Login />
        </header>
      </main>
    );
  }
}

export default App;
