import PropTypes from 'prop-types';
import React, { Component } from 'react';
import GoRankingButton from '../components/GoRankingButton';
import Header from '../components/Header';
import PlayAgainButton from '../components/PlayAgainButton';

class Feedback extends Component {
  render() {
    const { history } = this.props;
    return (
      <div data-testid="feedback-text">
        <Header />
        <PlayAgainButton history={ history } />
        <GoRankingButton history={ history } />
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Feedback;
