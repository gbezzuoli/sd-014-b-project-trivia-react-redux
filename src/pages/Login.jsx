import React from 'react';

// Requisito 1
class Login extends React.Component {
  constructor() {
    super();

    this.handleInput = this.handleInput.bind(this);

    this.state = {
      playerName: '',
      playerEmail: '',
    };
  }

  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { playerEmail, playerName } = this.state;

    return (
      <form>
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
        <button
          className="button-login"
          type="button"
          data-testid="btn-play"
          disabled={ playerEmail === '' || playerName === '' }
        >
          Jogar
        </button>
      </form>
    );
  }
}

export default Login;
