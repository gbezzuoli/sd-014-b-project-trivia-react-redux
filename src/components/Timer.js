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
    const { counter } = this.state;
    const { timeIsOverDispatch } = this.props;
    const END_POINT = 0;
    if (counter === END_POINT) {
      timeIsOverDispatch(true);
      clearInterval(this.timerInterval);
    }
  }

  componentWillUnmount() {
    const { timeIsOverDispatch } = this.props;
    const { counter } = this.state;
    timeIsOverDispatch(true, counter);
    clearInterval(this.timerInterval);
  }

  render() {
    const { counter } = this.state;
    return <div>{ `Timer: ${counter}` }</div>;
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
