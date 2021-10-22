import React from 'react';
import PropTypes from 'prop-types';

class QuestionCard extends React.Component {
  constructor() {
    super();
    this.state = {
      questionIndex: 0,
    };

    this.nextQuestion = this.nextQuestion.bind(this);
  }

  listAnswersMultiple(questionIndex) {
    const { apiResult } = this.props;
    const incorrectAnswers = apiResult[questionIndex].incorrect_answers;
    const incorrectAnswersList = incorrectAnswers.map((answer) => (
      {
        answer,
        value: 'False',
      }
    ));

    const correctAnswer = {
      answer: apiResult[questionIndex].correct_answer,
      value: true,
    };
    const answerList = [...incorrectAnswersList, correctAnswer];

    // https://flaviocopes.com/how-to-shuffle-array-javascript/
    const number = 0.5;
    answerList.sort(() => Math.random() - number);
    return answerList;
  }

  nextQuestion() {
    const { questionIndex } = this.state;
    this.setState({ questionIndex: questionIndex + 1 });
  }

  render() {
    const { apiResult } = this.props;
    const { questionIndex } = this.state;
    return (
      <section className="QuestionCard">
        <h3
          data-testid="question-category"
          className="question-category"
        >
          { apiResult[questionIndex].category }
        </h3>
        <p
          data-testid="question-text"
          className="question-text"
        >
          { apiResult[questionIndex].question }
        </p>
        {this.listAnswersMultiple(questionIndex).map((question, index) => (
          question.value === true
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
        <button type="button" onClick={ this.nextQuestion }>
          Próximo
        </button>
      </section>
    );
  }
}

QuestionCard.propTypes = {
  apiResult: PropTypes.shape({
    correct_answer: PropTypes.shape(PropTypes.string),
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
};

export default QuestionCard;
