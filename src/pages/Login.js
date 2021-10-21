import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGameTokenAction, getNameAndEmailAction } from '../redux/actions';

import fetchToken from '../services/FetchToken';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      nameInput: '',
      emailInput: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.buttonActivation = this.buttonActivation.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.handleClickGame = this.handleClickGame.bind(this);
  }

  buttonActivation() {
    const { emailInput, nameInput } = this.state;
    const emailtest = /\S+@+\S+.+\S/; // string + @ + string + . + string
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

  async handleClickGame() {
    // Salvando Token
    const { getGameToken } = this.props;
    const token = await fetchToken();
    getGameToken(token);
    localStorage.setItem('token', JSON.stringify(token));
    // Salvando nome e email
    const { getNameAndEmail } = this.props;
    const { nameInput, emailInput } = this.state;
    getNameAndEmail(nameInput, emailInput);
  }

  renderForm() {
    const { emailInput, nameInput } = this.state;
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
      </form>
    );
  }

  render() {
    return (
      <div>
        { this.renderForm() }
        <Link to="/game">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ this.buttonActivation() }
            onClick={ this.handleClickGame }
          >
            Jogar
          </button>
        </Link>
        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  getGameToken: PropTypes.func.isRequired,
  getNameAndEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getGameToken: (token) => dispatch(getGameTokenAction(token)),
  getNameAndEmail: (name, email) => dispatch(getNameAndEmailAction(name, email)),
});

export default connect(null, mapDispatchToProps)(Login);
