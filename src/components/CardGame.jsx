import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import '../css/buttonCss.css';
import { increaseScore as increaseScoreAction,
  resetTimer, showNext } from '../redux/actions';

const THREE = 3;
const QUESTION_WEIGHT = [1, 2, THREE];
const QUESTION_BASE_POINT = 10;
class CardGame extends React.Component {
  constructor(props) {
    super(props);

    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    // this.shuffleArray = this.shuffleArray.bind(this);
    this.parseAnswerInObject = this.parseAnswerInObject.bind(this);
    this.generateAnswersButtons = this.generateAnswersButtons.bind(this);
    this.defineQuestionDifficulty = this.defineQuestionDifficulty.bind(this);
  }

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
    // const randomAnswers = this.shuffleArray(answersObjects);
    return answersObjects;
  }

  // shuffleArray(array) {
  //   const arr = array;
  //   for (let index = arr.length - 1; index > 0; index -= 1) {
  //     const nextIndex = Math.floor(Math.random() * (index + 1));
  //     const temp = arr[index];
  //     arr[index] = arr[nextIndex];
  //     arr[nextIndex] = temp;
  //   }
  //   return arr;
  // }

  handleAnswerClick() {
    const { toogleNextButton, increaseScore,
      countdown, playerScore, playerAssertions, player } = this.props;
    const brothers = document.querySelectorAll('button');
    // getAttribute feito com base no stackoverflow
    brothers.forEach((brother) => {
      if (brother === brothers[brothers.length - 1]) {
        brother.className = '';
      } else if (brother.getAttribute('data-testid') === 'correct-answer') {
        brother.classList.add('right-answer');
        const score = Number(playerScore
        + (QUESTION_BASE_POINT
          + (Number(countdown) * Number(this.defineQuestionDifficulty()))));
        increaseScore({
          score,
          assertions: playerAssertions + 1,
        });
        localStorage.setItem('state', JSON.stringify(player));
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

  defineQuestionDifficulty() {
    const { question: { difficulty } } = this.props;
    if (difficulty === 'easy') {
      return QUESTION_WEIGHT[0];
    } if (difficulty === 'medium') {
      return QUESTION_WEIGHT[1];
    } if (difficulty === 'hard') {
      return QUESTION_WEIGHT[2];
    }
  }

  render() {
    const { question: { category, question }, next, showNextBtn } = this.props;
    return (
      <div>
        <h2 data-testid="question-category">{ category }</h2>
        <h3 data-testid="question-text">{ question }</h3>
        {this.generateAnswersButtons()}
        <button
          style={ { display: showNextBtn ? 'inline-block' : 'none' } }
          type="button"
          data-testid="btn-next"
          onClick={ () => { next(); } }
        >
          Proxima
        </button>
        <div />
      </div>
    );
  }
}

const mapStateToProps = ({ game, game: { player } }) => ({
  timer: game.timer,
  showNextBtn: game.next,
  playerScore: player.score,
  playerAssertions: player.assertions,
  countdown: game.countdown,
  player,
});

const mapDispatchToProps = (dispatch) => ({
  toogleNextButton: (boolean) => dispatch(showNext(boolean)),
  stopTimer: (boolean) => dispatch(resetTimer(boolean)),
  increaseScore: (number) => dispatch(increaseScoreAction(number)),
});

CardGame.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.any),
    difficulty: PropTypes.string,
  }).isRequired,
  next: PropTypes.func.isRequired,
  timer: PropTypes.bool.isRequired,
  toogleNextButton: PropTypes.func.isRequired,
  showNextBtn: PropTypes.bool.isRequired,
  increaseScore: PropTypes.func.isRequired,
  countdown: PropTypes.number.isRequired,
  playerScore: PropTypes.number.isRequired,
  playerAssertions: PropTypes.number.isRequired,
  player: PropTypes.objectOf(PropTypes.any).isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(CardGame);
