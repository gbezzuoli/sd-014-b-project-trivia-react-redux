import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getApiToken, { getApiTrivia } from '../services/ApiRequest';
import statusQuestions from '../redux/actions';

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
    const { sendToGlobal } = this.props;
    const getResultsFromAPI = await getApiToken();
    localStorage.setItem('token', JSON.stringify(getResultsFromAPI.token));
    const response = await getApiTrivia(JSON.parse(localStorage.getItem('token')));
    sendToGlobal(response.results);
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
        <Link to="/Trivia">
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
  sendToGlobal: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sendToGlobal: (arrayObjects) => dispatch(statusQuestions(arrayObjects)),
});

export default connect(null, mapDispatchToProps)(Login);
