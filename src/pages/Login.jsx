import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      nameInput: '',
      emailInput: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.getTokenOnClick = this.getTokenOnClick.bind(this);
  }

  async getTokenOnClick() {
    const { history } = this.props;
    const URL = 'https://opentdb.com/api_token.php?command=request';
    const requestToken = await fetch(URL);
    const responseToken = await requestToken.json();
    console.log(responseToken.token);
    localStorage.setItem('token', JSON.stringify(responseToken.token));
    history.push('/paginadojogo');
  }

  loadConfigsPage() {
    const { history } = this.props;
    history.push('/configuracoes');
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  // isEmailValid = (email) => {
  //   const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  //   return regexEmail.test(email) === true;
  // };

  render() {
    const { nameInput, emailInput } = this.state;
    const validInput = nameInput.length > 0 && emailInput.length > 0;
    return (
      <div>

        <input
          placeholder="Nome"
          id="input-player-name"
          name="nameInput"
          onChange={ this.handleChange }
          data-testid="input-player-name"
          type="text"
        />

        <input
          placeholder="Email"
          name="emailInput"
          id="input-gravatar-email"
          onChange={ this.handleChange }
          data-testid="input-gravatar-email"
          type="text"
        />
        <button
          type="button"
          disabled={ !validInput }
          data-testid="btn-play"
          onClick={ this.getTokenOnClick }
        >
          Jogar
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => this.loadConfigsPage() }
        >
          Configuração
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
