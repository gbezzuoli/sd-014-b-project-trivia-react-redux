import React from 'react';
import { Link } from 'react-router-dom';

// Requisito 1
class Login extends React.Component {
  constructor() {
    super();

    this.handleInput = this.handleInput.bind(this);
    this.getTokenFromAPI = this.getTokenFromAPI.bind(this);

    this.state = {
      playerName: '',
      playerEmail: '',
    };
  }

  async getTokenFromAPI() {
    const URL = 'https://opentdb.com/api_token.php?command=request';
    const result = await fetch(URL);
    const response = await result.json();
    const { token } = response;
    localStorage.setItem('token', token);
  }

  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { playerEmail, playerName } = this.state;

    return (
      <form className="login-form">
        <label htmlFor="input-player-name">
          <input
            id="input-player-name"
            className="input-name"
            type="text"
            data-testid="input-player-name"
            name="playerName"
            onChange={ this.handleInput }
          />
        </label>

        <label htmlFor="input-gravatar-email">
          <input
            id="input-gravatar-email"
            className="input-email"
            type="email"
            data-testid="input-gravatar-email"
            name="playerEmail"
            onChange={ this.handleInput }
          />
        </label>
        <Link to="/game">
          <button
            className="button-login"
            type="button"
            data-testid="btn-play"
            disabled={ playerEmail === '' || playerName === '' }
            onClick={ this.getTokenFromAPI }
          >
            Jogar
          </button>
        </Link>
      </form>
    );
  }
}

export default Login;
