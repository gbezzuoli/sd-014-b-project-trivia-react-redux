import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { submitUser } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      nameInput: '',
      emailInput: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.getToken = this.getToken.bind(this);
    this.saveUser = this.saveUser.bind(this);
  }

  async getToken() {
    const URL = 'https://opentdb.com/api_token.php?command=request';
    const requestToken = await fetch(URL);
    const responseToken = await requestToken.json();
    localStorage.setItem('token', JSON.stringify(responseToken.token));
    this.saveUser();
  }

  saveUser() {
    const { history, submitHash } = this.props;
    const { nameInput, emailInput } = this.state;
    const gravatarEmail = md5(emailInput).toString();
    const state = {
      player: {
        name: nameInput,
        assertions: 0,
        score: 0,
        gravatarEmail,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
    submitHash(nameInput, gravatarEmail);
    history.push('/paginadojogo');
  }

  /* checkLocalStorage(player) {
    if (!localStorage.getItem('state')) {
      const createArrayPlayers = [player];
      localStorage.setItem('state', JSON.stringify(createArrayPlayers));
    } else {
      const players = JSON.parse(localStorage.getItem('state'));

      const alreadyExists = players.some((item) => (
        item.gravatarEmail === player.gravatarEmail
      ));

      if (!alreadyExists) {
        const updatePlayers = [...players, player];
        localStorage.setItem('state', JSON.stringify(updatePlayers));
      }
    }
  } */

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
          onClick={ this.getToken }
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
  submitHash: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  submitHash: (name, hashGravatar) => dispatch(submitUser(name, hashGravatar)),
});

export default connect(null, mapDispatchToProps)(Login);
