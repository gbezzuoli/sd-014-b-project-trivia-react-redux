import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class Feedbacks extends Component {
  render() {
    return (
      <section>
        <h2 data-testid="feedback-text">Feedbacks</h2>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Play Again</button>
        </Link>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">Ranking</button>
        </Link>
      </section>
    );
  }
}

export default connect()(Feedbacks);
