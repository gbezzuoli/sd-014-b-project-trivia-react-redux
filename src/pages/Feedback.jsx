import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
    const scoreElement = (
      <>
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
    if (assertions < NUMBER && assertions > 0) {
      return (
        <>
          <h1 data-testid="feedback-text">Podia ser melhor...</h1>
          { scoreElement }
        </>
      );
    }
    if (assertions >= NUMBER) {
      return (
        <>
          <h1 data-testid="feedback-text">Mandou bem!</h1>
          { scoreElement }
        </>
      );
    }
    if (assertions === 0) {
      return (
        <>
          <h1 data-testid="feedback-total-question">Não acertou nenhuma pergunta</h1>
          { scoreElement }
        </>
      );
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.feedbackMessages()}
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            {' '}
            Jogar Novamente
            {' '}
          </button>
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
