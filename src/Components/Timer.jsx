import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Timer extends Component {
  constructor() {
    super();

    this.state = {
      timer: 30,
    };
  }

  componentDidMount() {
    this.updateTimer();
  }

  updateTimer() {
    const numberSeconds = 1000;
    const interval = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
      this.clearTimer(interval);
    }, numberSeconds);
  }

  clearTimer(interval) {
    const { timer } = this.state;
    const { answerClick } = this.props;
    if (timer === 0) {
      clearInterval(interval);
      return answerClick();
    }
  }

  render() {
    const { timer } = this.state;
    return (
      <div className="container-timer">
        <p className="timer">
          Tempo:
          { timer }
        </p>
      </div>
    );
  }
}

Timer.propTypes = {
  answerClick: PropTypes.func.isRequired,
};
