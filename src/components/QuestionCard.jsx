import React from 'react';
import PropTypes from 'prop-types';

class QuestionCard extends React.Component {
  constructor() {
    super();
    this.state = {
      apiResultObj: {},
    };
  }

  componentDidMount() {
    this.iterateApiResult();
  }

  iterateApiResult() {
    const { apiResult, index } = this.props;
    console.log(apiResult);
    this.setState({ apiResultObj: apiResult[index] }, () => {
    });
  }

  listAnswersMultiple() {
    const { apiResultObj } = this.state;
    const incorrectAnswers = apiResultObj.incorrect_answers || [];
    const incorrectAnswersList = incorrectAnswers.map((answer) => (
      {
        answer,
        value: 'False',
      }
    ));

    const correctAnswer = {
      answer: apiResultObj.correct_answer,
      value: 'True',
    };
    const answerList = [...incorrectAnswersList, correctAnswer];

    // https://flaviocopes.com/how-to-shuffle-array-javascript/
    const number = 0.5;
    answerList.sort(() => Math.random() - number);
    return answerList;
  }

  render() {
    const { apiResultObj } = this.state;
    return (
      <section className="QuestionCard">
        <h3
          data-testid="question-category"
          className="question-category"
        >
          { apiResultObj.category }
        </h3>
        <p
          data-testid="question-text"
          className="question-text"
        >
          { apiResultObj.question }
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
    correct_answer: PropTypes.shape(PropTypes.string),
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default QuestionCard;
