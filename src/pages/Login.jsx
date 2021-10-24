import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import { user as userAction } from '../action';
import '../styles/Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
    };
  }

  bonitinho = () => (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>
      </header>
    </div>
  )

  handleClick = async () => {
    const { history, user } = this.props;
    await fetch('https://opentdb.com/api_token.php?command=request')
      .then((item) => item.json()
        .then((payload) => localStorage.setItem('token', payload.token)));
    user(this.state);
    history.push('/game');
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  }

  render() {
    const { name, email } = this.state;
    const { history } = this.props;
    return (
      <div className="login">
        { this.bonitinho() }
        <label htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            value={ name }
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="email">
          E-Mail:
          <input
            type="email"
            id="email"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <div>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !(name && email) }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => history.push('/settings') }
          >
            Settings
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  user: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  user: (e) => dispatch(userAction(e)),
});

export default connect(null, mapDispatchToProps)(Login);
