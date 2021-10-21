import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getToken } from '../redux/actions/index';

import { Button } from './Button';

export class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      gravatarEmail: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState(() => ({
      [name]: value,
    }));
  }

  async handleClick() {
    const { valueToken } = this.props;

    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const apiToken = await response.json();
    const { token } = apiToken;
    valueToken(token);

    localStorage.setItem('token', token);
  }

  render() {
    const { name, gravatarEmail } = this.state;
    const { handleChange, handleClick } = this;

    const validEmail = () => {
      const regex = /\S+@\S+.\S+/;
      return regex.test(gravatarEmail);
    };

    const validName = () => !!name;

    return (
      <form className="login-form">
        <label htmlFor="gravatarEmail">
          Gravatar E-mail
          <input
            type="text"
            data-testid="input-gravatar-email"
            name="gravatarEmail"
            onChange={ handleChange }
            value={ gravatarEmail }
          />
        </label>
        <label htmlFor="name">
          Player Name
          <input
            type="text"
            data-testid="input-player-name"
            name="name"
            onChange={ handleChange }
            value={ name }
          />
        </label>
        <Link to="/game">
          <Button
            text="Start!"
            dataTestid="btn-play"
            onClick={ handleClick }
            disabled={ !(validEmail() && validName()) }
          />
        </Link>
      </form>
    );
  }
}

LoginForm.propTypes = {
  valueToken: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  valueToken: (token) => dispatch(getToken(token)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
