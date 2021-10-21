import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CustomInput from '../../components/CustomInput';
import returnTokenApi from '../../services/token_api';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.disabledButton = this.disabledButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  disabledButton() {
    const { name, email } = this.state;
    const minName = 0;
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (regexEmail.test(email) && name.length > minName) {
      return false;
    }
    return true;
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const token = await returnTokenApi();
    localStorage.setItem('token', token);
  }

  render() {
    return (
      <section>
        <CustomInput
          dataTestId="input-player-name"
          id="name"
          description="Nome:"
          onChange={ (event) => this.handleChange(event) }
        />
        <CustomInput
          dataTestId="input-gravatar-email"
          id="email"
          description="Email:"
          onChange={ (event) => this.handleChange(event) }
        />
        <Link to="/game">
          <button
            disabled={ this.disabledButton() }
            data-testid="btn-play"
            type="button"
            onClick={ () => this.handleClick() }
          >
            Jogar
          </button>
        </Link>
      </section>
    );
  }
}

export default Login;
