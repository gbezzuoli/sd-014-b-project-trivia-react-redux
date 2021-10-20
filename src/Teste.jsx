import React, { Component } from 'react'
import {requestToken} from './services/Api';

export default class Teste extends Component {
  constructor () {
    super();
    this.state = {
      token: '',
    }
  }

  setToken = (token) => this.setState({token})

  async componentDidMount() {
    await requestToken();
    const token = localStorage.getItem('token')
    this.setToken(token);
  }

  render() {
    const {token} = this.state;

    return (
      <div>
        token: {token}
      </div>
    )
  }
}
