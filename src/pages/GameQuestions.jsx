import React from 'react';
import PropTypes from 'prop-types';

class GameQuestions extends React.Component {
  render() {
    const { questions, idQuestions } = this.props;
    const correctAnswer = 5;
    return (
      <button
        type="button"
        data-testid={ idQuestions === correctAnswer ? 'correct-answer'
          : `wrong-answer-${idQuestions}` }
      >
        { questions }
      </button>
    );
  }
}

GameQuestions.propTypes = {
  questions: PropTypes.string.isRequired,
  idQuestions: PropTypes.number.isRequired,
};

export default GameQuestions;
