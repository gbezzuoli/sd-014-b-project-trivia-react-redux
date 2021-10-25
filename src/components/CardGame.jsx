import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import '../css/buttonCss.css';
import { showNext } from '../redux/actions';

class CardGame extends React.Component {
  constructor(props) {
    super(props);

    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.parseAnswerInObject = this.parseAnswerInObject.bind(this);
    this.generateAnswersButtons = this.generateAnswersButtons.bind(this);
  }

  // shouldComponentUpdate(nextProps) {
  //   const { question, timer } = this.props;
  //   return question.question !== nextProps.question.question;
  // }

  parseAnswerInObject() {
    const { question } = this.props;
    const answers = [question.correct_answer, ...question.incorrect_answers];
    const answersObjects = answers.map((answer, index) => {
      if (index === 0) {
        return {
          answer,
          correct: true,
        };
      }
      return {
        answer,
        correct: false,
      };
    });
    const randomAnswers = this.shuffleArray(answersObjects);
    return randomAnswers;
  }

  shuffleArray(array) {
    const arr = array;
    for (let index = arr.length - 1; index > 0; index -= 1) {
      const nextIndex = Math.floor(Math.random() * (index + 1));
      const temp = arr[index];
      arr[index] = arr[nextIndex];
      arr[nextIndex] = temp;
    }
    return arr;
  }

  handleAnswerClick() {
    const { toogleNextButton } = this.props;
    const brothers = document.querySelectorAll('button');
    // getAttribute feito com base no stackoverflow
    brothers.forEach((brother) => {
      if (brother === brothers[brothers.length - 1]) {
        brother.className = '';
      } else if (brother.getAttribute('data-testid') === 'correct-answer') {
        brother.classList.add('right-answer');
      } else if (brother.getAttribute('data-testid').includes('wrong-answer')) {
        brother.classList.add('wrong-answer');
      }
    });
    toogleNextButton(true);
  }

  generateAnswersButtons() {
    const { timer } = this.props;
    const randomAnswers = this.parseAnswerInObject();

    let count = 0;
    return (randomAnswers.map((answerButton, index) => {
      if (answerButton.correct) {
        return (
          <button
            type="button"
            data-testid="correct-answer"
            onClick={ this.handleAnswerClick }
            disabled={ timer }
          >
            { answerButton.answer }
          </button>);
      }
      count += 1;
      return (
        <button
          key={ index }
          type="button"
          data-testid={ `wrong-answer-${count - 1}` }
          onClick={ this.handleAnswerClick }
        >
          {answerButton.answer}
        </button>
      );
    }));
  }

  render() {
    const { question: { category, question }, next, showNextBtn } = this.props;
    // const randomAnswers = this.parseAnswerInObject();
    // const timer = Number(document.querySelector('#timer'));
    return (
      <div>
        <h2 data-testid="question-category">{ category }</h2>
        <h3 data-testid="question-text">{ question }</h3>
        {this.generateAnswersButtons()}
        <button
          style={ { display: showNextBtn ? 'inline-block' : 'none' } }
          type="button"
          // value="Proxima"
          onClick={ () => { next(); } }
        >
          Proxima
        </button>
        <div />
      </div>
    );
  }
}

const mapStateToProps = ({ game }) => ({
  timer: game.timer,
  showNextBtn: game.next,
});

const mapDispatchToProps = (dispatch) => ({
  toogleNextButton: (boolean) => dispatch(showNext(boolean)),
});

CardGame.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
  next: PropTypes.func.isRequired,
  timer: PropTypes.bool.isRequired,
  toogleNextButton: PropTypes.func.isRequired,
  showNextBtn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardGame);
