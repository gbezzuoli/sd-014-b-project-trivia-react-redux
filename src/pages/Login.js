import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { savePlayerAction } from '../Redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      gravatarEmail: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateEmailAndName = this.validateEmailAndName.bind(this);
    this.requestAPI = this.requestAPI.bind(this);
  }

  async requestAPI() {
    const { history } = this.props;
    const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';
    const requestAPI = await fetch(URL_TOKEN);
    const data = await requestAPI.json();
    localStorage.setItem('token', data.token);
    history.push('/game');
  }

  handleChange({ target: { id, value } }) {
    this.setState({
      [id]: value,
    });
  }

  validateEmailAndName() {
    const { name, gravatarEmail } = this.state;
    if (name.length > 0 && gravatarEmail.length > 0) return false;
    return true;
  }

  render() {
    const { name, gravatarEmail } = this.state;
    const { handleChange, validateEmailAndName, state, requestAPI } = this;
    const { savePlayerInfoToGlobal } = this.props;
    return (
      <form>
        <label htmlFor="name">
          Name:
          <input
            value={ name }
            onChange={ handleChange }
            data-testid="input-player-name"
            id="name"
            type="text"
          />
        </label>
        <label htmlFor="gravatarEmail">
          Email:
          <input
            value={ gravatarEmail }
            onChange={ handleChange }
            data-testid="input-gravatar-email"
            id="gravatarEmail"
            type="email"
          />
        </label>
        <button
          onClick={ () => {
            savePlayerInfoToGlobal(state);
            requestAPI();
          } }
          disabled={ validateEmailAndName() }
          data-testid="btn-play"
          type="button"
        >
          Jogar
        </button>
        <Link to="/configuration" data-testid="btn-settings">
          <button
            type="button"
            onClick=""
          >
            Configurações
          </button>
        </Link>
      </form>
    );
  }
}

Login.propTypes = {
  savePlayerInfoToGlobal: PropTypes.func.isRequired,
  history: PropTypes.objectOf(
    PropTypes.any,
  ).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  savePlayerInfoToGlobal: (playerInfo) => dispatch(savePlayerAction(playerInfo)),
});

export default connect(null, mapDispatchToProps)(Login);
