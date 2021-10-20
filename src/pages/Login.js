import React, { Component } from 'react';
import Link from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      nameInput: '',
      emailInput: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.verifyLogin = this.verifyLogin.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  verifyLogin() {
    const { emailInput, nameInput } = this.state;
    const emailtest = /\S+@+\S+.+\S/;
    if (emailtest.test(emailInput) && nameInput) {
      return false;
    }
    return true;
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    console.log('alalala');
  }

  render() {
    const { nameInput, emailInput } = this.state;
    return (
      <form>
        <label htmlFor="input-player-name">
          <input
            data-testid="input-player-name"
            type="text"
            name="nameInput"
            placeholder="Digite seu nome"
            onChange={ this.handleChange }
            value={ nameInput }
          />
        </label>
        <label htmlFor="input-gravatar-email">
          <input
            data-testid="input-gravatar-email"
            type="email"
            name="emailInput"
            placeholder="Digite um email"
            onChange={ this.handleChange }
            value={ emailInput }
          />
        </label>
        <Link to="/game">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ this.verifyLogin() }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </Link>
      </form>
    );
  }
}

export default Login;
