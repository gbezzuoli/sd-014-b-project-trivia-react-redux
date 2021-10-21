import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as userActions from '../redux/actions';

class Cronometer extends Component {
  constructor() {
    super();
    this.state = {
      minutes: 0,
      seconds: 30,
    };
  }

  componentDidMount() {
    const interval = 1000;
    this.valueInterval = setInterval(() => {
      const { seconds } = this.state;
      if (seconds > 0) {
        this.setState((sec) => ({
          seconds: sec.seconds - 1,
        }));
      }
      if (seconds === 0) {
        clearInterval(this.valueInterval);
      }
    }, interval);
  }

  componentDidUpdate() {
    this.dispatchDisable();
  }

  componentWillUnmount() {
    clearInterval(this.valueInterval);
  }

  dispatchDisable() {
    const { setSeconds } = this.props;
    const { seconds } = this.state;
    if (seconds === 0) {
      setSeconds(seconds);
    }
  }

  render() {
    const { minutes, seconds } = this.state;
    const finalSeconds = 10;
    if (minutes === 0 && seconds === 0) {
      return <h1>Tempo esgotado!</h1>;
    }
    return (
      <div>
        <h1>
          {minutes}
          :
          {seconds < finalSeconds ? `0${seconds}` : seconds}
        </h1>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setSeconds: (seconds) => dispatch(userActions.getSeconds(seconds)),
});

export default connect(null, mapDispatchToProps)(Cronometer);

CountdownTimer.propTypes = {
  setSeconds: PropTypes.func,
}.isRequired;
