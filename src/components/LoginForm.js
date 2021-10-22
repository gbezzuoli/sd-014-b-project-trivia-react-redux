import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import setLogin, { getToken } from '../redux/actions';
import Buttons from './Buttons';
import '../App.css';

class LoginForm extends React.Component {
  constructor() {
    super();

    this.state = {
      login: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async handleClick() {
    const { valueToken, loginSet } = this.props;
    const { login, email } = this.state;
    loginSet(login, email);
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const apiToken = await response.json();
    const { token } = apiToken;
    valueToken(token);
    localStorage.setItem('token', token);
  }

  render() {
    const { login, email } = this.state;
    const validadeButton = login && email; // retorna true caso os campos estejam preenchidos
    return (
      <main className="login-main">
        <h2>Trivia</h2>
        <label htmlFor="login">
          <i className="material-icons">
            Nome
          </i>
          <input
            data-testid="input-player-name"
            id="login"
            name="login"
            value={ login }
            onChange={ this.handleChange }
            placeholder=" Nome"
          />
        </label>
        <label htmlFor="email">
          <i className="material-icons">
            Email
          </i>
          <input
            data-testid="input-gravatar-email"
            id="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            placeholder=" Email"
            type="email"
          />
        </label>
        <br />
        <Buttons validadeButton={ validadeButton } handleClick={ this.handleClick } />
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToState = (dispatch) => ({
  loginSet: (login, email) => dispatch(setLogin(login, email)),
  valueToken: (token) => dispatch(getToken(token)),
});

LoginForm.propTypes = {
  valueToken: PropTypes.func.isRequired,
  loginSet: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToState)(LoginForm);
