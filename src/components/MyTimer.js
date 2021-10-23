import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MyTimer extends Component {
  render() {
    const { time } = this.props;
    return (
      <div>
        { `You have ${time} seconds` }
      </div>
    );
  }
}

MyTimer.propTypes = {
  time: PropTypes.number.isRequired,
};
