import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../helper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as userActions from '../redux/actions/index';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
    this.handleClickTrivia = this.handleClickTrivia.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickSettings = this.handleClickSettings.bind(this);
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  async handleClickTrivia() {
    const { getName, getEmail } = this.props;
    const { name, email } = this.state;
    getName(name);
    getEmail(email);
    await getToken();
  }

  handleClickSettings() {
    const { history } = this.props;
    history.push('/settings');
  }

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
            value={ name }
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input-gravatar-email">
          E-mail
          <input
            type="email"
            name="email"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <Link to="/trivia">
          <button
            data-testid="btn-play"
            type="button"
            onClick={ this.handleClickTrivia }
            disabled={ disabled }
          >
            Jogar
          </button>
        </Link>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ this.handleClickSettings }
        >
          Settings
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  getName: PropTypes.func.isRequired,
  getEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getEmail: (email) => dispatch(userActions.addEmail(email)),
  getName: (name) => dispatch(userActions.addName(name)),
});

export default connect(null, mapDispatchToProps)(Login);
