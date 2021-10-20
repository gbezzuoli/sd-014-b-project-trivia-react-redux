import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  validate(name, email) {
    if (name.length && email.length) {
      return true;
    }
  }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <input
          onChange={ this.handleChange }
          name="name"
          value={ name }
          data-testid="input-player-name"
          type="text"
          placeholder="Nome"
        />
        <input
          onChange={ this.handleChange }
          name="email"
          value={ email }
          data-testid="input-gravatar-email"
          type="email"
          placeholder="Email"
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !this.validate(name, email) }
        >
          Jogar
        </button>
      </div>
    );
  }
}

export default Login;
