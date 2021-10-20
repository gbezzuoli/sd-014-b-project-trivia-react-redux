import React, { Component } from 'react';
import CustomInput from '../../components/CustomInput';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.disabledButton = this.disabledButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
        <button
          disabled={ this.disabledButton() }
          data-testid="btn-play"
          type="button"
        >
          Jogar
        </button>
      </section>
    );
  }
}

export default Login;
