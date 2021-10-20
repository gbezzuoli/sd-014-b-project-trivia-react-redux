import React from 'react';
import PropTypes from 'prop-types';
import fetchToken from '../services';

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

    localStorage.setItem('token', JSON.stringify(token.toString()));
    history.push('/game');
  }

  render() {
    const { email, name } = this.state;
    return (
      <form>
        <fieldset>
          <label htmlFor="email-input">
            email:
            <input
              type="email"
              id="email-input"
              data-testid="input-gravatar-email"
              name="email"
              onChange={ this.handleChange }
              value={ email }
            />
          </label>
          <label htmlFor="name-input">
            name:
            <input
              type="text"
              id="name-input"
              data-testid="input-player-name"
              name="name"
              onChange={ this.handleChange }
              value={ name }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ this.btnDisabled() }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </fieldset>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
