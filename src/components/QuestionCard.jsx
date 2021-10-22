import React from 'react';
import PropTypes from 'prop-types';

class QuestionCard extends React.Component {
  constructor() {
    super();
    this.state = {
      questionIndex: 0,
      answerListState: [],
      correctAnswerClass: 'answer',
      wrongAnswerClass: 'answer',
    };

    this.nextQuestion = this.nextQuestion.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    const { questionIndex } = this.state;
    this.listAnswersMultiple(questionIndex);
  }

  onClick() {
    // console.log(target);
    // console.log(parseInt(target.name, 0));
    const { answerListState } = this.state;
    answerListState.forEach((answer) => {
      if (answer.value === true) {
        this.setState({ correctAnswerClass: 'answer correct-answer' });
      } else {
        this.setState({ wrongAnswerClass: 'answer wrong-answer' });
      }
      // if (index === parseInt(target.name, 10) && answer.value === true) {
      //   target.className = 'answer correct-answer';
      // }
    });
  }

  listAnswersMultiple() {
    const { apiResult } = this.props;
    const { questionIndex } = this.state;
    const incorrectAnswers = apiResult[questionIndex].incorrect_answers;
    const incorrectAnswersList = incorrectAnswers.map((answer) => (
      {
        answer,
        value: false,
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
    this.setState({ answerListState: answerList });
    return answerList;
  }

  nextQuestion() {
    const { questionIndex } = this.state;
    this.setState({
      questionIndex: questionIndex + 1,
      wrongAnswerClass: 'answer',
      correctAnswerClass: 'answer',
    }, () => this.listAnswersMultiple());
  }

  render() {
    const { apiResult } = this.props;
    const { questionIndex, answerListState, correctAnswerClass, wrongAnswerClass } = this.state;
    return (
      <section className="question-card">
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
        {answerListState.map((question, index) => (
          question.value === true
            ? (
              <button
                type="button"
                key={ index }
                onClick={ this.onClick }
                data-testid="correct-answer"
                className={ correctAnswerClass }
                name={ index }
              >
                { question.answer }
              </button>)
            : (
              <button
                type="button"
                key={ index }
                onClick={ this.onClick }
                data-testid={ `wrong-answer-${index}` }
                className={ wrongAnswerClass }
                name={ index }
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
