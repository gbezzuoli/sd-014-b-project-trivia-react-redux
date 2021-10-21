import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTrivia } from '../services/triviaAPI';
import { submitPlayerAction } from '../redux/actions';

const REGEX_EMAIL = /\S+@\S+\.\S+/;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitPlayer = this.submitPlayer.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, this.validatePlayer);
  }

  validatePlayer() {
    const { name, email } = this.state;
    localStorage.setItem('name', name);
    const validEmail = REGEX_EMAIL.test(email);

    if (name && validEmail) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  submitPlayer() {
    const { dispatchSetValue } = this.props;
    fetchTrivia();
    const token = localStorage.getItem('token');
    dispatchSetValue(this.state, token);
  }

  render() {
    const { disabled } = this.state;
    return (
      <form>
        <input
          labelText="Jogador"
          name="name"
          data-testid="input-player-name"
          type="text"
          onChange={ this.handleChange }
        />
        <input
          labelText="E-mail"
          name="email"
          data-testid="input-gravatar-email"
          type="text"
          onChange={ this.handleChange }
        />
        <Link to="/game">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ disabled }
            onClick={ this.submitPlayer }
          >
            Jogar
          </button>
        </Link>
        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </form>
    );
  }
}

Login.propTypes = {
  dispatchSetValue: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSetValue: (player, token) => (
    dispatch(submitPlayerAction(player, token))
  ),
});

export default connect(null, mapDispatchToProps)(Login);
