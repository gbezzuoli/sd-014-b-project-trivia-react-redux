import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RequestApi from './RequestApi';
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
    const { history, valueToken } = this.props;

    const apiToken = await RequestApi();
    valueToken(apiToken);
    localStorage.setItem('token', apiToken.token);
    history.push('/game');
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
        <Button
          text="Start!"
          dataTestid="btn-play"
          onClick={ handleClick }
          disabled={ !(validEmail() && validName()) }
        />
      </form>
    );
  }
}

LoginForm.propTypes = {
  valueToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  valueToken: (token) => dispatch(getToken(token)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
