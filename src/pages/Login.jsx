import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name, email } = this.state;
    const disabled = name === '' || email === '';
    return (
      <div>
        <label htmlFor="input-player-name">
          Nome
          <input
            type="text"
            name="name"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input-gravatar-email">
          E-mail
          <input
            type="email"
            name="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          data-testid="btn-play"
          type="button"
          disabled={ disabled }
        >
          Jogar
        </button>
      </div>
    );
  }
}

export default Login;
