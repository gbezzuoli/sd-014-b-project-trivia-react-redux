import React, { Component } from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);
    // const { timerOver } = props; kkl
    this.state = {
      segundos: 30,
      // timerOver,
    };
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    setInterval(() => {
      this.time = this.setState((prevState) => ({ segundos: prevState.segundos - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate(prevProps, prevState) {
    const zeraTime = 1;
    if (prevState.segundos === zeraTime) {
      clearInterval(this.time);
    }
  }

  render() {
    const { segundos } = this.state;
    return (
      <p>{segundos}</p>
    );
  }
}

export default Timer;
