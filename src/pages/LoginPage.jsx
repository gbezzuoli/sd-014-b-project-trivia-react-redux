import React from 'react';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.onSubmitConfig = this.onSubmitConfig.bind(this);
  }

  onSubmit() {
    const { history } = this.props;
    history.push('/game');
  }

  onSubmitConfig() {
    const { history } = this.props;
    history.push('/config');
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({ [id]: value });
  }

  validateForm() {
    const { email, name } = this.state;
    return (email.length > 0 && name.length > 0);
  }

  render() {
    const { name, email } = this.state;

    return (
      <div>
        <form>
          <label htmlFor="name">
            Nome:
            <input
              id="name"
              type="text"
              value={ name }
              onChange={ this.handleChange }
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              id="email"
              value={ email }
              type="email"
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            onClick={ this.onSubmit }
            disabled={ !this.validateForm() }
          >
            Jogar
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.onSubmitConfig }
          >
            Configurações
          </button>
        </form>
      </div>
    );
  }
}

export default LoginPage;
