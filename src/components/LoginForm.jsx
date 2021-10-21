import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTrivia, sendData } from '../redux/actions';
import Button from './Button';

export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState(() => ({
      [name]: value,
    }));
  }

  handleClick() {
    const { getToken, storeData } = this.props;
    getToken();
    storeData(this.state);
  }

  render() {
    const { name } = this.state;
    const { handleChange, handleClick } = this;

    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    function validateEmail(email) {
      const userEmail = /\S+@\S+\.\S+/;
      return userEmail.test(email);
    }

    const validateName = () => !!name;

    return (
      <form className="login-form">
        <label htmlFor="email">
          Email
          <input
            type="email"
            data-testid="input-gravatar-email"
            name="email"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="name">
          Nome
          <input
            type="text"
            data-testid="input-player-name"
            name="name"
            onChange={ handleChange }
            value={ name }
          />
        </label>
        <Button
          text="Jogar!"
          dataTestid="btn-play"
          onClick={ handleClick }
          disabled={ !(validateEmail() && validateName()) }
        />
        <Link to="/settings">
          <button
            type="submit"
            data-testid="btn-settings"
          >
            Configurações
          </button>
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchTrivia()),
  storeData: (state) => dispatch(sendData(state)),
});

LoginForm.propTypes = {
  getToken: PropTypes.func.isRequired,
  storeData: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(LoginForm);
