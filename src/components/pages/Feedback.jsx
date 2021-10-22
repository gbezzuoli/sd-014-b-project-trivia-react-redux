import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      goodResult: 'Mandou bem!',
      badResult: 'Podia ser melhor...',
      questionsAssert: 3,
    };
  }

  render() {
    const { goodResult, badResult, questionsAssert } = this.state;
    const { score } = this.props;
    return (
      <section>
        <Header />
        <h3 data-testid="feedback-text">
          { questionsAssert >= score ? goodResult : badResult }
        </h3>
      </section>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  score: state.userReducer.score,
});

export default connect(
  mapStateToProps,
)(Feedback);
