import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Question from './Question';
import Answers from './Answers';

class QuestionCard extends Component {
  render() {
    const { questions } = this.props;
    return (
      <div>
        <Question questions={ questions } />
        <Answers />
      </div>
    );
  }
}

QuestionCard.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
};

export default QuestionCard;
