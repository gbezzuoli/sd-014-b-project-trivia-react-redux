import PropTypes from 'prop-types';
import React, { Component } from 'react';

class QuestionCard extends Component {
  render() {
    const { questions } = this.props;
    return (
      <div>
        <p>inserir questoes do game</p>
        <p>{questions[0].category}</p>
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
