import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { timeIsOver as timeIsOverAction } from '../actions';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      counter: 5,
    };
    this.resetSeconds = this.resetSeconds.bind(this);
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.timerInterval = setInterval(() => {
      this.setState((prevState) => ({ counter: prevState.counter - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate(prevProps, prevState) {
    const END_POINT = 0;
    if (prevState.counter === END_POINT) {
      this.resetSeconds();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  resetSeconds() {
    this.setState({ counter: 0 });
  }

  render() {
    const { timeIsOver } = this.props;
    const { counter } = this.state;
    if (counter === 0) {
      timeIsOver(true);
    }
    return <div>{`Timer: ${counter}`}</div>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  timeIsOver: (payload) => dispatch(timeIsOverAction(payload)),
});

Timer.propTypes = {
  timeIsOver: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Timer);
