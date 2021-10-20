import React, { Component } from 'react';
import Input from '../Components/Input';
import Button from '../Components/Button';

export default class Login extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      name: '',
      gravatarEmail: '',
    };
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    const { name, gravatarEmail } = this.state;
    const disabled = name.length > 0 && gravatarEmail.length > 0;
    return (
      <main className="login-page">
        <form action="">
          <Input
            type="text"
            className="input-player-name"
            onChange={ this.handleChange }
            textLabel="Nome:"
            inputName="name"
            value={ name }
          />

          <Input
            type="email"
            className="input-gravatar-email"
            onChange={ this.handleChange }
            textLabel="Email:"
            inputName="gravatarEmail"
            value={ gravatarEmail }
          />

          <Button
            dataTestId="btn-play"
            onClick={ () => {} }
            textButton="Jogar"
            disabled={ !disabled }
          />
        </form>
      </main>
    );
  }
}
