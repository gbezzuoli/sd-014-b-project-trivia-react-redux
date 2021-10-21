import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveTokenAction, getNameEmail } from '../redux/actions/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.validateForms = this.validateForms.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInputChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  validateForms() {
    const { email, name } = this.state;
    const minLength = 2;
    const emailValidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailValidate.test(email) && name.length > minLength;
  }

  async handleClick() {
    const { triviaAction } = this.props;
    const urlToken = await fetch('https://opentdb.com/api_token.php?command=request');
    const response = await urlToken.json();
    const { token } = response;
    triviaAction(token);
    const { getNameEmailAction } = this.props;
    const { name, email } = this.state;
    getNameEmailAction(name, email);
    localStorage.setItem('token', token);
  }

  render() {
    const { email, name } = this.state;
    const { history } = this.props;
    return (
      <main className="container">
        <form className="form-container">
          <div>
            <input
              data-testid="input-player-name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={ name }
              onChange={ this.handleInputChange }
            />
            <div className="underline" />
          </div>
          <div>
            <input
              data-testid="input-gravatar-email"
              type="text"
              name="email"
              placeholder="Enter your email"
              value={ email }
              onChange={ this.handleInputChange }
            />
            <div className="underline" />
          </div>
          <Link to="/game">
            <button
              data-testid="btn-play"
              type="button"
              className="buttonLogin"
              disabled={ !this.validateForms() }
              onClick={ this.handleClick }
            >
              Jogar
            </button>
          </Link>
          <button
            data-testid="btn-settings"
            type="button"
            onClick={ () => history.push('/settings') }
          >
            Configurações
          </button>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  triviaAction: PropTypes.func.isRequired,
  getNameEmailAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    history: PropTypes.string,
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  triviaAction: (token) => dispatch(saveTokenAction(token)),
  getNameEmailAction: (name, email) => dispatch(getNameEmail(name, email)),
});

export default connect(null, mapDispatchToProps)(Login);
