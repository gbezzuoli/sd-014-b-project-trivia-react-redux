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
    const { score, assertions } = this.props;
    return (
      <section>
        <div>
          <Header />
          <h3 data-testid="feedback-text">
            { questionsAssert >= score ? goodResult : badResult }
          </h3>
        </div>
        <section>
          <h1 data-testid="feedback-total-score">
            { score }
            🏆
          </h1>
          <h2 data-testid="feedback-total-question">
            { assertions === 0 ? 'Não acertou nenhuma pergunta!'
              : `Acertou ${assertions} perguntas`}
          </h2>
        </section>
      </section>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  score: state.userReducer.score,
  assertions: state.userReducer.assertions,
});

export default connect(
  mapStateToProps,
)(Feedback);
