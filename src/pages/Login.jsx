import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.validateForms = this.validateForms.bind(this);
  }

  handleInputChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  validateForms() {
    const { email, name } = this.state;
    const minLength = 2;
    const emailValidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailValidate.test(email) && name.length > minLength;
  }

  render() {
    const { email, name } = this.state;

    return (
      <main className="container">
        <form className="form-container">
          <h1>test</h1>
          <div>
            <input
              data-testid="input-player-name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={ name }
              onChange={ this.handleInputChange }
            />
            <div className="underline" />
          </div>
          <div>
            <input
              data-testid="input-gravatar-email"
              type="text"
              name="email"
              placeholder="Enter your email"
              value={ email }
              onChange={ this.handleInputChange }
            />
            <div className="underline" />
          </div>
          <button
            data-testid="btn-play"
            type="button"
            className="buttonLogin"
            disabled={ !this.validateForms() }
            onClick={ () => this.submitemail(email) }
          >
            Jogar
          </button>
        </form>
      </main>
    );
  }
}

export default Login;
