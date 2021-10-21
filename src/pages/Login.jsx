import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchToken } from '../redux/actions';
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
    this.formElement = this.formElement.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleValidation(email, name) {
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const regexName = /^[a-zA-Z0-9 ]{3,}$/;
    return regexEmail.test(email) && regexName.test(name);
  }

  formElement() {
    const {
      state: { email, name },
      props: { startFetching },
      handleValidation, handleChange,
    } = this;

    const isValid = handleValidation(email, name);

    return (
      <form>
        <label htmlFor="name">
          Nome
          <input
            type="text"
            name="name"
            id="name"
            onChange={ handleChange }
            value={ name }
            placeholder="Insira seu Nome"
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="text"
            name="email"
            id="email"
            onChange={ handleChange }
            value={ email }
            placeholder="Insira seu Email"
            data-testid="input-gravatar-email"
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          onClick={ startFetching }
          disabled={ !isValid }
        >
          Jogar
        </button>
      </form>
    );
  }

  render() {
    const {
      props: { redirect, code, isFetching, history },
      formElement,
    } = this;

    let output = formElement();

    if (isFetching) {
      output = <Loading />;
    } else if (redirect) {
      localStorage.setItem('token', code);
      history.push('/game');
    }

    return output;
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  redirect: PropTypes.bool,
  code: PropTypes.string,
  isFetching: PropTypes.bool,
  startFetching: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  redirect: state.token.redirect,
  code: state.token.code,
  isFetching: state.token.isFetching });

const mapDispatchToProps = (dispatch) => ({
  startFetching: () => dispatch(fetchToken()) });

export default connect(mapStateToProps, mapDispatchToProps)(Login);
