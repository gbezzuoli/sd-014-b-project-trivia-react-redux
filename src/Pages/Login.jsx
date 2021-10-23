import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from '../Components/Input';
import Button from '../Components/Button';
import requestToken from '../services/token';
import { addPlayerEmailAndName, addPlayerToken } from '../Redux/actions';

class Login extends Component {
  constructor() {
    super();

    this.handlePlay = this.handlePlay.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      name: '',
      gravatarEmail: '',
      redirect: false,
    };
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  addTokenLocalStorage(playerToken, { name, gravatarEmail }) {
    localStorage.setItem('token', playerToken);

    const playerScore = {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail,
    };

    localStorage.setItem('state', JSON.stringify({ player: playerScore }));
  }

  async handlePlay() {
    const { dispatchPlayerToken, dispatchPlayerNameAndEmail } = this.props;

    const requestObject = await requestToken();
    const playerToken = requestObject.token;

    dispatchPlayerToken(playerToken);

    dispatchPlayerNameAndEmail(this.state);

    this.addTokenLocalStorage(playerToken, this.state);

    this.setState({ redirect: true });
  }

  handleSettings() {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { name, gravatarEmail, redirect } = this.state;
    const disabled = name.length > 0 && gravatarEmail.length > 0;
    return (
      <main className="login-page">
        <form action="">
          <Input
            type="text"
            className="input-player-name"
            onChange={ this.handleChange }
            textLabel="Nome:"
            inputName="name"
            value={ name }
          />

          <Input
            type="email"
            className="input-gravatar-email"
            onChange={ this.handleChange }
            textLabel="Email:"
            inputName="gravatarEmail"
            value={ gravatarEmail }
          />

          <Button
            dataTestId="btn-play"
            onClick={ this.handlePlay }
            textButton="Jogar"
            disabled={ !disabled }
          />
        </form>
        { redirect && <Redirect to="/game" /> }

        <Button
          dataTestId="btn-settings"
          onClick={ this.handleSettings }
          textButton="Configurações"
        />
      </main>
    );
  }
}

Login.propTypes = {
  dispatchPlayerNameAndEmail: PropTypes.func.isRequired,
  dispatchPlayerToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => (
  {
    dispatchPlayerToken: (token) => dispatch(addPlayerToken(token)),
    dispatchPlayerNameAndEmail: (emailAndName) => dispatch(
      addPlayerEmailAndName(emailAndName),
    ),
  }
);

export default connect(null, mapDispatchToProps)(Login);
