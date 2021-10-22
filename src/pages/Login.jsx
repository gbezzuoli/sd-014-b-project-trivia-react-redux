import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../redux/actions';
import getApiToken from '../services/ApiRequest';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClickTrivia = this.handleClickTrivia.bind(this);
    this.handleClickSettings = this.handleClickSettings.bind(this);
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  async handleClickTrivia() {
    const { history, dispatchFetchQuestions } = this.props;
    const { token } = await getApiToken();
    localStorage.setItem('token', token);
    dispatchFetchQuestions();
    history.push('/trivia');
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
        <button
          data-testid="btn-play"
          type="button"
          onClick={ this.handleClickTrivia }
          disabled={ disabled }
        >
          Jogar
        </button>
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

function mapDispatchToProps(dispatch) {
  return {
    dispatchFetchQuestions: () => dispatch(fetchQuestions()),
  };
}

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
