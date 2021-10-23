import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Feedbacks extends Component {
  render() {
    return (
      <section>
        <p data-testid="feedback-text">Feedbacks</p>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">
            Play Again
          </button>
        </Link>
      </section>
    );
  }
}

export default connect()(Feedbacks);
