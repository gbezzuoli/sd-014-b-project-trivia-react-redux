import React from 'react';
import PropTypes from 'prop-types';

export default function Login(props) {
  const {
    state: { name, email },
    disabled,
    handleChange,
    handleSubmit,
  } = props;

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

Login.propTypes = {
  state: PropTypes.shape({ name: PropTypes.string, email: PropTypes.string }),
  disabled: PropTypes.bool,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
}.isRequired;
