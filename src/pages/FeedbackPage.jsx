import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderFeedback from '../components/HeaderFeedback';

class FeedbackPage extends Component {
  render() {
    const { assertions } = this.props;
    const MIN_ASSERTIONS = 3;
    const condi = assertions < MIN_ASSERTIONS;
    return (
      <section>
        <HeaderFeedback />
        <h1>Feedback Page</h1>
        <section>
          <p data-testid="feedback-text">
            {condi ? 'Podia ser melhor...' : 'Mandou bem!'}
          </p>
        </section>
      </section>
    );
  }
}

FeedbackPage.propTypes = {
  assertions: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.playerReducer.assertions,
});

export default connect(mapStateToProps)(FeedbackPage);
