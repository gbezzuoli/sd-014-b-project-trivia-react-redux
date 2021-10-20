import React, { Component } from 'react';

class Login extends Component {
  constructor () {
    super()
    this.state = {
    nameInput:'',
    emailInput:'',
    }
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }



  render() {
    return (
      <div>
        <label htmlFor="input-player-name" />Nome
        <input name="nameInput" onChange={this.handleChange} data-testid="input-player-name" type="text" />
        <label htmlFor="input-player-name" />Email
        <input name="emailInput" onChange={this.handleChange} data-testid="input-gravatar-email" type="text" />
        <button data-testid="btn-play">Jogar</button>
      </div>
    );
  }
}

export default Login;