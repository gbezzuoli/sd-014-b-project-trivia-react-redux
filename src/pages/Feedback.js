import PropTypes from 'prop-types';
import React, { Component } from 'react';
import GoRankingButton from '../components/GoRankingButton';
import Header from '../components/Header';
import PlayAgainButton from '../components/PlayAgainButton';

class Feedback extends Component {
  render() {
    const { player: { assertions, score } } = JSON.parse(localStorage.getItem('state'));
    const { history } = this.props;
    const MIN_ASSERTIONS = 3;
    return (
      <div>
        <Header />
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <p data-testid="feedback-text">
          { assertions < MIN_ASSERTIONS ? 'Podia ser melhor...' : 'Mandou bem!' }
        </p>
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
