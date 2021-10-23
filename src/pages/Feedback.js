import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlayAgainButton from '../components/PlayAgainButton';

class Feedback extends Component {
  render() {
    const { history } = this.props;
    return (
      <PlayAgainButton history={ history } />
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Feedback;
