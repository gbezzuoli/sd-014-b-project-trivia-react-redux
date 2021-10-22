import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Login extends Component {
  render() {
    const {
      state: { name, email },
      disabled,
      handleChange,
      handleSubmit,
    } = this.props;

    return (
      <form>
        <label htmlFor="name">
          Nome:
          <input
            data-testid="input-player-name"
            type="text"
            id="name"
            placeholder="Digite o seu nome"
            value={ name }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            data-testid="input-gravatar-email"
            type="email"
            id="email"
            placeholder="email@email.com"
            value={ email }
            onChange={ handleChange }
          />
        </label>
        <button
          data-testid="btn-play"
          disabled={ disabled }
          type="button"
          onClick={ handleSubmit }
        >
          Jogar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  state: PropTypes.shape({ name: PropTypes.string, email: PropTypes.string }).isRequired,
  disabled: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
