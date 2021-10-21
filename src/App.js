import React from 'react';
// import logo from './trivia.png';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import SettingsScreen from './pages/SettingsScreen';
import './App.css';

export default function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        {/* <img src={ logo } className="App-logo" alt="logo" /> */}
      {/* </header> */}
      <Router>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/settings" component={ SettingsScreen } />
        </Switch>
      </Router>
    </div>
  );
}
