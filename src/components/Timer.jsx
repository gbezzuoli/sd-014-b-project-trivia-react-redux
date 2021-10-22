import React from 'react';

const ONE_SECOND = 1000;

class Timer extends React.Component {
  constructor() {
    super();

    this.state = {
      timer: 30,
    };

    this.tiktak = this.tiktak.bind(this);
  }

  componentDidMount() {
    this.tiktak();
  }

  componentWillUnmount() {
    clearInterval(this.tiktak);
  }

  tiktak() {
    setInterval(() => {
      this.setState(({ timer }) => ({ timer: timer === 0 ? 0 : timer - 1 }));
    }, ONE_SECOND);
  }

  render() {
    /* Contador feito pelo Guilherme Gomes 14-b */
    const { timer } = this.state;
    return (<span>{ timer }</span>);
  }
}

export default Timer;
