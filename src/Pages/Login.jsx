import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from '../Components/Input';
import Button from '../Components/Button';
import requestToken from '../services';
import { addPlayerEmailAndName, addPlayerToken } from '../Redux/actions';

class Login extends Component {
  constructor() {
    super();

    this.handlePlay = this.handlePlay.bind(this);
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

  addTokenLocalStorage(playerToken) {
    localStorage.setItem('token', playerToken);
  }

  async handlePlay() {
    const { dispatchPlayerToken, dispatchPlayerNameAndEmail } = this.props;
    const { name, gravatarEmail } = this.state;

    const requestObject = await requestToken();
    const playerToken = requestObject.token;

    dispatchPlayerToken(playerToken);

    dispatchPlayerNameAndEmail({ name, gravatarEmail });

    this.addTokenLocalStorage(playerToken);

    this.setState({ redirect: true });
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
      </main>
    );
  }
}

Login.propTypes = {
  dispatchPlayerToken: PropTypes.func.isRequired,
  dispatchPlayerNameAndEmail: PropTypes.func.isRequired,
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
