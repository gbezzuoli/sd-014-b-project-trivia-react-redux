import React from 'react';
import logo from './trivia.png';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './pages/Login';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Login />
        <p>
          SUA VEZ
        </p>
      </header>
    </div>
  );
}
