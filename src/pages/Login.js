import PropTypes from 'prop-types';
import React from 'react';
import ButtonConfig from '../components/ButtonConfig';
import { fetchToken } from '../services';
import './LoginPage.css';
import image from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.btnDisabled = this.btnDisabled.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.redirectConfig = this.redirectConfig.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  btnDisabled() {
    const { email, name } = this.state;
    if (email.length !== 0 && name.length !== 0) {
      return false;
    }
    return true;
  }

  async handleClick() {
    const { history } = this.props;
    const { token } = await fetchToken();
    const { email, name } = this.state;
    const player = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };

    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('state', JSON.stringify(player));

    history.push('/game');
  }

  redirectConfig() {
    const { history } = this.props;
    history.push('/config');
  }

  render() {
    const { email, name } = this.state;
    return (
      <div>
        <ButtonConfig redirectConfig={ this.redirectConfig } />
        <form>
          <fieldset className="form-login">
            <img src={ image } alt="Logo Trivia" className="image-login" />
            <label htmlFor="email-input">
              Email:
              <input
                className="input-email"
                type="email"
                id="email-input"
                data-testid="input-gravatar-email"
                name="email"
                onChange={ this.handleChange }
                value={ email }
              />
            </label>
            <label htmlFor="name-input">
              Nome:
              <input
                className="input-name"
                type="text"
                id="name-input"
                data-testid="input-player-name"
                name="name"
                onChange={ this.handleChange }
                value={ name }
              />
            </label>
            <button
              className="button-play"
              type="button"
              data-testid="btn-play"
              disabled={ this.btnDisabled() }
              onClick={ this.handleClick }
            >
              Jogar
            </button>
          </fieldset>
        </form>
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
