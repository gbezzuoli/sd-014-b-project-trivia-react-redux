import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      userEmail: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { userName, userEmail } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="user">
            <input
              data-testid="input-player-name"
              type="text"
              name="userName"
              value={ userName }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            <input
              data-testid="input-gravatar-email"
              type="email"
              name="userEmail"
              value={ userEmail }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="btn-play"
            type="submit"
            name="button"
            disabled={ userName.length <= 0 || userEmail.length <= 0 }
          >
            Jogar
          </button>
        </form>
        <Link to="/settings" >
          <button data-testid="btn-settings" type="button">Configurações</button>
        </Link>
      </div>
    );
  }
}

export default Login;
