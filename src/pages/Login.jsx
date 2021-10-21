import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchToken from '../services/token';
import { sendUserEmail } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      score: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const { history, dispatchSetValue } = this.props;
    dispatchSetValue(this.state);
    const token = await fetchToken();
    localStorage.setItem('token', JSON.stringify(token));
    history.push('/game');
  }

  validate(name, email) {
    if (name.length && email.length) {
      return true;
    }
  }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <input
          onChange={ this.handleChange }
          name="name"
          value={ name }
          data-testid="input-player-name"
          type="text"
          placeholder="Nome"
        />
        <input
          onChange={ this.handleChange }
          name="email"
          value={ email }
          data-testid="input-gravatar-email"
          type="email"
          placeholder="Email"
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !this.validate(name, email) }
          onClick={ this.handleClick }
        >
          Jogar
        </button>
        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchSetValue: (payload) => dispatch(sendUserEmail(payload)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatchSetValue: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
