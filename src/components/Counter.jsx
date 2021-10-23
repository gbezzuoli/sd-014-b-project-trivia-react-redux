// Referência para implementação da Contagem Regressiva: Zhiyue Yi
// src: https://dev.to/zhiyueyi/how-to-create-a-simple-react-countdown-timer-4mc3

import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 30 };
    this.setCounter = this.setCounter.bind(this);
  }

  componentDidUpdate() {
    const { counter } = this.state;
    const ONE_SECOND = 1000;
    if (counter > 0) {
      setTimeout(() => this.setCounter(counter - 1), ONE_SECOND);
    }
  }

  setCounter(value) {
    this.setState({ counter: value });
  }

  render() {
    const { counter } = this.state;
    return <div>{`Tempo Restante: ${counter}`}</div>;
  }
}

export default Counter;
