import PropTypes from 'prop-types';
import React, { Component } from 'react';
import GoHomeButton from '../components/GoHomeButton';
import PlayAgainButton from '../components/PlayAgainButton';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <h3 data-testid="ranking-title">Ranking</h3>
        <PlayAgainButton history={ history } />
        <GoHomeButton history={ history } />
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
