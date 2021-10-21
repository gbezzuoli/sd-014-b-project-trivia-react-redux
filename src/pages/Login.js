import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getGameTokenAction } from '../redux/actions';
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
    this.handleClick = this.handleClick.bind(this);
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

  async handleClick() {
    const { getGameToken } = this.props;
    const token = await fetchToken();
    getGameToken(token);
    localStorage.setItem('token', JSON.stringify(token));
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
        <Link to="/game">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ this.buttonActivation() }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </Link>
      </form>
    );
  }

  render() {
    return (
      <div>
        { this.renderForm() }
      </div>
    );
  }
}

Login.propTypes = {
  getGameToken: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getGameToken: (token) => dispatch(getGameTokenAction(token)),
});

export default connect(null, mapDispatchToProps)(Login);
