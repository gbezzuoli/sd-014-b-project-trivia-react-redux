import React, { Component } from 'react';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      segundos: 30,
    };
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.time = setInterval(() => {
      this.setState((prevState) => ({ segundos: prevState.segundos - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate(prevProps, prevState) {
    const { stopTimer, showResponseAfterTime } = this.props;
    const zeraTime = 1;
    if (prevState.segundos === zeraTime) {
      clearInterval(this.time);
      showResponseAfterTime();
    }
    if (stopTimer) clearInterval(this.time);
  }

  render() {
    const { segundos } = this.state;
    return (
      <p>{segundos}</p>
    );
  }
}

export default Timer;
