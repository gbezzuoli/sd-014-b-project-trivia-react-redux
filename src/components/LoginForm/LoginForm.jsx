// Referencia validação email
// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { sendPlayerInfo, fetchAPI } from '../../redux/actions';
import './style.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      signedIn: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    console.log(name, value);
    this.setState(() => ({
      [name]: value,
    }));
  }

  async handleClick() {
    const { email, name } = this.state;
    const { submitPlayer } = this.props;
    await fetchAPI();
    this.setState({ signedIn: true });
    submitPlayer({ email, name });
  }

  render() {
    const { name, email, signedIn } = this.state;
    const validateEmail = () => {
      const userEmail = /\S+@\S+\.\S+/;
      return userEmail.test(email);
    };

    const validateName = () => !!name;
    if (signedIn) {
      return <Redirect to="/game" />;
    }
    return (
      <form className="login-form">
        <label htmlFor="email">
          Email
          <input
            className="text-input"
            type="email"
            data-testid="input-gravatar-email"
            name="email"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="name">
          Nome
          <input
            className="text-input"
            type="text"
            data-testid="input-player-name"
            name="name"
            onChange={ this.handleChange }
            value={ name }
          />
        </label>
        <button
          disabled={ !(validateEmail() && validateName()) }
          type="button"
          data-testid="btn-play"
          onClick={ this.handleClick }
        >
          Jogar
        </button>
        <Link to="/settings">
          <button type="submit" data-testid="btn-settings">
            Configurações
          </button>
        </Link>
      </form>
    );
  }
}

LoginForm.propTypes = {
  submitPlayer: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  submitPlayer: (...payload) => dispatch(sendPlayerInfo(...payload)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
