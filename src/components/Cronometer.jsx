import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

  componentWillUnmount() {
    clearInterval(this.valueInterval);
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

Cronometer.propTypes = {
  setSeconds: PropTypes.func,
}.isRequired;
