import React from 'react';
import PropTypes from 'prop-types';

class QuestionCard extends React.Component {
  listAnswersMultiple() {
    const { apiResult } = this.props;
    const incorrectAnswers = apiResult.results.incorrect_answers;
    const incorrectAnswersList = incorrectAnswers.map((answer) => (
      {
        answer,
        value: 'False',
      }
    ));

    const correctAnswer = {
      answer: apiResult.results.correct_answer,
      value: 'True',
    };
    const answerList = [...incorrectAnswersList, correctAnswer];

    // https://flaviocopes.com/how-to-shuffle-array-javascript/
    const number = 0.5;
    answerList.sort(() => Math.random() - number);
    console.log(answerList);
    return answerList;
  }

  render() {
    const { questionText } = this.props;
    return (
      <section className="QuestionCard">
        <h3
          data-testid="question-category"
          className="question-category"
        >
          { questionCategory }
        </h3>
        <p
          data-testid="questionCategory"
          className="question-text"
        >
          { questionText }
        </p>
        {this.listAnswersMultiple().map((question, index) => (
          question.answer === question.correct_answer
            ? (
              <button
                type="button"
                key={ index }
                onClick={ this.submitAnswer }
                data-testid="correct-answer"
              >
                { question.answer }
              </button>)
            : (
              <button
                type="button"
                key={ index }
                onClick={ this.submitAnswer }
                data-testid={ `wrong-answer-${index}` }
              >
                { question.answer }
              </button>)
        ))}
      </section>
    );
  }
}

QuestionCard.propTypes = {
  apiResult: PropTypes.shape({
    results: PropTypes.shape({
      correct_answer: PropTypes.shape(PropTypes.string),
      incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    }),
  }).isRequired,
  questionText: PropTypes.string.isRequired,
};

export default QuestionCard;
