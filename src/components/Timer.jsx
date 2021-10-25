import React, { Component } from 'react';

export default class Timer extends Component {
  constructor() {
    super();
    this.state = {
      counter: 30,
    };
    this.subtractTimer = this.subtractTimer.bind(this);
  }

  async componentDidMount() {
    const seg = 1000;
    setInterval(this.subtractTimer, seg);
  }

  subtractTimer() {
    this.setState(({ counter }) => (
      counter > 0 ? ({ counter: counter - 1 }) : ({ counter: 0 })));
  }

  render() {
    const { counter } = this.state;
    return (
      <h3>
        Tempo:
        {' '}
        {counter}
      </h3>
    );
  }
}
