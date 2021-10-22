import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoHomeButton from '../components/GoHomeButton';
import PlayAgainButton from '../components/PlayAgainButton';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <PlayAgainButton history={ history } />
        <GoHomeButton history={ history } />
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.arrayOf(Object).isRequired,
};

export default Ranking;
