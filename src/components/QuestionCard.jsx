import React from 'react';
import PropTypes from 'prop-types';
import QuestionInfo from './QuestionInfo';

class QuestionCard extends React.Component {
  constructor() {
    super();
    this.state = {
      questionIndex: 0,
      answerListState: [],
      correctAnswerC: 'answer', // State referente a Classe das respostas
      wrongAnswerC: 'answer', // State referente a Classe das respostas
      showbutton: false,
    };

    this.nextQuestion = this.nextQuestion.bind(this);
    this.setColorAndScore = this.setColorAndScore.bind(this);
  }

  componentDidMount() {
    const { questionIndex } = this.state;
    this.listAnswersMultiple(questionIndex);
  }

  setColorAndScore() {
    this.setState({ showbutton: true });
    const { answerListState } = this.state;
    answerListState.forEach((answer) => {
      if (answer.value === true) {
        this.setState({ correctAnswerC: 'answer correct-answer' });
      } else {
        this.setState({ wrongAnswerC: 'answer wrong-answer' });
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
      wrongAnswerC: 'answer',
      correctAnswerC: 'answer',
      showbutton: false,

    }, () => this.listAnswersMultiple());
  }

  render() {
    const { apiResult } = this.props;
    const {
      questionIndex,
      answerListState,
      correctAnswerC,
      wrongAnswerC,
      showbutton,
    } = this.state;
    return (
      <section className="question-card">
        <QuestionInfo apiResult={ apiResult } questionIndex={ questionIndex } />
        {answerListState.map((question, index) => (
          question.value === true
            ? (
              <button
                type="button"
                key={ index }
                onClick={ this.setColorAndScore }
                data-testid="correct-answer"
                className={ correctAnswerC }
                name={ index }
              >
                { question.answer }
              </button>)
            : (
              <button
                type="button"
                key={ index }
                onClick={ this.setColorAndScore }
                data-testid={ `wrong-answer-${index}` }
                className={ wrongAnswerC }
                name={ index }
              >
                { question.answer }
              </button>)
        ))}
        <button
          type="button"
          onClick={ this.nextQuestion }
          className="button-next"
          style={ { visibility: showbutton ? 'visible' : 'hidden' } }
          data-testid="btn-next"
        >
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
