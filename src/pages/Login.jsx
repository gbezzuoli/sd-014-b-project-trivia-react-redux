import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { setInfo } from '../redux/actions';

// Requisito 1
class Login extends React.Component {
  constructor() {
    super();

    this.handleInput = this.handleInput.bind(this);
    this.setUserInfo = this.setUserInfo.bind(this);

    this.state = {
      playerName: '',
      playerEmail: '',
    };
  }

  setUserInfo() {
    const { playerName, playerEmail } = this.state;
    const { userInfo } = this.props;

    const gravatarEmail = md5(playerEmail).toString();
    const imgAvatar = `https://www.gravatar.com/avatar/${gravatarEmail}`;

    const info = {
      name: playerName,
      avatar: imgAvatar,
      score: 0,
    };

    // a função do onclick chama a action que seta o email para o estado global
    userInfo(info);
  }

  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { playerEmail, playerName } = this.state;

    return (
      <form className="login-form">
        <label htmlFor="input-player-name">
          <input
            id="input-player-name"
            className="input-name"
            type="text"
            data-testid="input-player-name"
            name="playerName"
            onChange={ this.handleInput }
          />
        </label>

        <label htmlFor="input-gravatar-email">
          <input
            id="input-gravatar-email"
            className="input-email"
            type="email"
            data-testid="input-gravatar-email"
            name="playerEmail"
            onChange={ this.handleInput }
          />
        </label>
        <button
          className="button-login"
          type="button"
          data-testid="btn-play"
          disabled={ playerEmail === '' || playerName === '' }
          onClick={ this.setUserInfo }
        >
          Jogar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  userInfo: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userInfo: (info) => dispatch(setInfo(info)),
});

export default connect(null, mapDispatchToProps)(Login);
