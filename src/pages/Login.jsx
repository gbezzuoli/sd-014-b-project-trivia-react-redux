import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleClick() {
    // const { email } = this.state;
    const { history } = this.props;
    history.push('/game');
  }

  handleValidation(email, name) {
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const regexName = /^[a-zA-Z0-9 ]{3,}$/;
    return regexEmail.test(email) && regexName.test(name);
  }

  render() {
    const { email, name } = this.state;
    const isValid = this.handleValidation(email, name);

    return (
      <div>
        <label htmlFor="name">
          Nome
          <input
            type="text"
            name="name"
            id="name"
            onChange={ this.handleChange }
            value={ name }
            placeholder="Insira seu Nome"
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="text"
            name="email"
            id="email"
            onChange={ this.handleChange }
            value={ email }
            placeholder="Insira seu Email"
            data-testid="input-gravatar-email"
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          onClick={ this.handleClick }
          disabled={ !isValid }
        >
          Jogar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
