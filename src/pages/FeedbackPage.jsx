import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class FeedbackPage extends Component {
  render() {
    const { assertions, score } = this.props;
    const MIN_ASSERTIONS = 3;
    const condi = assertions < MIN_ASSERTIONS;
    return (
      <section>
        <Header />
        <h1>Feedback Page</h1>
        <section>
          <p data-testid="feedback-total-score">{score}</p>
          <p data-testid="feedback-total-question">{assertions}</p>
          <p data-testid="feedback-text">
            {condi ? 'Podia ser melhor...' : 'Mandou bem!'}
          </p>
        </section>
      </section>
    );
  }
}

FeedbackPage.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.playerReducer.assertions,
  score: state.playerReducer.score,
});

export default connect(mapStateToProps)(FeedbackPage);
