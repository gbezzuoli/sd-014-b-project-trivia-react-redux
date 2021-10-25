import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Component/Header';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.feedbackMessages = this.feedbackMessages.bind(this);

    this.state = {
    };
  }

  feedbackMessages() {
    const { assertions, score } = this.props;
    const NUMBER = 3;
    if (assertions <= NUMBER && assertions > 0) {
      return (
        <>
          <h1>Podia ser melhor...</h1>
          <h2 data-testid="feedback-total-score">
            Placar final:
            {' '}
            { score }
          </h2>
          <h3 data-testid="feedback-total-question">
            Você acertou:
            {' '}
            { assertions }
          </h3>
        </>
      );
    }
    if (assertions >= NUMBER) {
      return (
        <>
          <h1>Mandou bem!</h1>
          <h2 data-testid="feedback-total-score">
            Placar final:
            {' '}
            { score }
          </h2>
          <h3 data-testid="feedback-total-question">
            Você acertou:
            {' '}
            { assertions }
          </h3>
        </>
      );
    }
    if (assertions === 0) {
      return (
        <h1 data-testid="feedback-total-question">Não acertou nenhuma pergunta</h1>
      );
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.feedbackMessages()}
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.assertions,
  score: state.score,
});

export default connect(mapStateToProps)(Feedback);
