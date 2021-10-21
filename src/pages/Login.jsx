import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userLogin, fetchToken } from '../redux/actions';
import './Login.css';
import logo from '../trivia.png';
import Loading from '../components/Loading';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.formElement = this.formElement.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleClick() {
    const { dispatchLogin, history } = this.props;
    dispatchLogin({ ...this.state });
    history.push('/game');
  }

  handleValidation(email, name) {
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const regexName = /^[a-zA-Z0-9 ]{3,}$/;
    return regexEmail.test(email) && regexName.test(name);
  }

  formElement() {
    const { email, name } = this.state;
    return (
      <section className="center">
        <div className="form-login">
          <img src={ logo } alt="logo" />
          <label htmlFor="name">
            Nome:
            <input
              type="text"
              name="name"
              id="name"
              onChange={ this.handleChange }
              value={ name }
              placeholder="Insira seu Nome"
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="text"
              name="email"
              id="email"
              onChange={ this.handleChange }
              value={ email }
              placeholder="Insira seu Email"
              data-testid="input-gravatar-email"
            />
          </label>
          { this.renderButtons() }
        </div>
      </section>
    );
  }

  renderButtons() {
    const { email, name } = this.state;
    const { startFetching } = this.props;
    const isValid = this.handleValidation(email, name);

    return (
      <div className="form-buttons">
        <button
          type="button"
          data-testid="btn-play"
          onClick={ startFetching }
          disabled={ !isValid }
          className="settings"
        >
          Jogar
        </button>
        <Link to="/settings" className="settings">
          <button
            type="button"
            data-testid="btn-settings"
            className="btn-settings"
          >
            Configurações

          </button>
        </Link>
      </div>
    );
  }

  render() {
    const {
      props: { redirect, code, isFetching },
      formElement, handleClick,
    } = this;

    let output = formElement();

    if (isFetching) {
      output = <Loading />;
    } else if (redirect) {
      localStorage.setItem('token', code);
      handleClick();
    }

    return output;
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (state) => dispatch(userLogin(state)),
  startFetching: () => dispatch(fetchToken()),
});

const mapStateToProps = (state) => ({
  redirect: state.token.redirect,
  code: state.token.code,
  isFetching: state.token.isFetching,
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  dispatchLogin: PropTypes.func,
  redirect: PropTypes.bool,
  code: PropTypes.string,
  isFetching: PropTypes.bool,
  startFetching: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
