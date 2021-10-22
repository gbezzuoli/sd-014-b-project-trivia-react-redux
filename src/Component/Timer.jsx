import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Timer extends Component {
  render() {
    const { count } = this.props;
    return (
      <div>
        Timer:
        { count }
      </div>
    );
  }
}

Timer.propTypes = {
  count: PropTypes.number,
}.isRequired;

export default Timer;
