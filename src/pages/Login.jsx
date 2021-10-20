import React from 'react';
import PropTypes from 'prop-types';

// Requisito 1
class Login extends React.Component {
  constructor() {
    super();

    this.handleInput = this.handleInput.bind(this);
    this.configButton = this.configButton.bind(this);

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

  configButton() {
    const { history } = this.props;
    history.push('/settings');
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
        <button
          className="button-login"
          type="button"
          data-testid="btn-play"
          disabled={ playerEmail === '' || playerName === '' }
        >
          Jogar
        </button>
        <button
          className="button-settings"
          type="button"
          data-testid="btn-settings"
          onClick={ this.configButton }
        >
          Configurações
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
