import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { timeIsOver as timeIsOverAction } from '../actions';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      counter: 30,
    };
  }

  componentDidMount() {
    const ONE_SECOND = 1000;

    this.timerInterval = setInterval(() => {
      this.setState((prevState) => ({ counter: prevState.counter - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate() {
    const { timeIsOverDispatch, timeIsOver } = this.props;
    const { counter } = this.state;
    const END_POINT = 0;
    if (counter === END_POINT || timeIsOver) {
      timeIsOverDispatch(true, counter);
      clearInterval(this.timerInterval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  render() {
    const { timeIsOver } = this.props;
    const { counter } = this.state;
    return <div>{timeIsOver ? <div>Timer: 0</div> : `Timer: ${counter}`}</div>;
  }
}

const mapStateToProps = (state) => ({
  timeIsOver: state.questionsReducer.timeIsOver,
});

const mapDispatchToProps = (dispatch) => ({
  timeIsOverDispatch: (timeOver,
    counter) => dispatch(timeIsOverAction(timeOver, counter)),
});

Timer.propTypes = {
  timeIsOverDispatch: PropTypes.func.isRequired,
  timeIsOver: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
