import React, { Component } from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
import './styles/login.css';
import logo from '../trivia.png';

export class Login extends Component {
  render() {
    return (
      <div className="content">
        <img src={ logo } alt="Logomarca do jogo Trivia" width="200px" />
        <LoginForm />
      </div>
    );
  }
}

export default Login;
