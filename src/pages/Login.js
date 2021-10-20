import React, { Component } from 'react';

function validateEmail(email) {
  const userEmail = /\S+@\S+\.\S+/;
  return userEmail.test(email);
}

class Login extends Component {
  constructor() {
    super();
    this.handleButton = this.handleButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      name: '',
      isDisabled: true,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.handleButton());
  }

  handleButton() {
    const { email, name } = this.state;
    if (validateEmail(email) && name.length > 0) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { isDisabled } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email">
            Gravatar Email:
            <input
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
              name="email"
              type="email"
            />
          </label>
          <label htmlFor="name">
            Nome:
            <input
              data-testid="input-player-name"
              onChange={ this.handleChange }
              name="name"
              type="text"
            />
          </label>
          <button
            data-testid="btn-play"
            type="submit"
            disabled={ isDisabled }
          >
            JOGAR!
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
