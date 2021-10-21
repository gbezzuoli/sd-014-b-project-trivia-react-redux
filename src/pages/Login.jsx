import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import getApiToken from '../services/ApiRequest';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
    this.handleClickButton = this.handleClickButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  async handleClickButton() {
    const getResultsFromAPI = await getApiToken();
    localStorage.setItem('token', JSON.stringify(getResultsFromAPI.token))
  }

  //Ao clicar no botão "Jogar", um requisição para a API do Trivia deve ser feita para obter o token de jogador

  render() {
    const { name, email } = this.state;
    const disabled = name === '' || email === '';
    return (
      <div>
        <label htmlFor="input-player-name">
          Nome
          <input
            type="text"
            name="name"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input-gravatar-email">
          E-mail
          <input
            type="email"
            name="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <Link to="/Trivia">
          <button
            data-testid="btn-play"
            type="button"
            onClick={ this.handleClickButton }
            disabled={ disabled }
            >
            Jogar
          </button>
        </Link>
      </div>
    );
  }
}

export default Login;
