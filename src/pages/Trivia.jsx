import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Component/Header';
import Timer from '../Component/Timer';
import { updateScore } from '../redux/actions';

class Trivia extends Component {
  constructor() {
    super();
    this.state = {
      questionIndex: 0,
      timer: 30,
    };
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.getQuestionScore = this.getQuestionScore.bind(this);
  }

  componentDidMount() {
    const { userName, userEmail } = this.props;
    const localStorageState = {
      player: {
        name: userName,
        gravatarEmail: userEmail,
        assertions: 0,
        score: 0,
      },
    };
    localStorage.setItem('state', JSON.stringify(localStorageState));
    this.startTimer();
  }

  getQuestionScore() {
    const { timer, questionIndex } = this.state;
    const { receviQuestions } = this.props;
    const currentQuestion = receviQuestions[questionIndex];
    const { difficulty } = currentQuestion;
    const baseScore = 10;
    const difficultyMultiplier = {
      easy: 1,
      medium: 2,
      hard: 3,
    };

    return baseScore + timer * difficultyMultiplier[difficulty];
  }

  startTimer() {
    const ONE_SECOND = 1000;
    const { timer } = this.state;
    if ((timer - 1) >= 0) {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
      setTimeout(this.startTimer, ONE_SECOND);
    }
  }

  // >>>> consultado o pr do grupo 9
  handleAnswerClick({ target: { value } }) {
    const getAllButtons = document.querySelectorAll('button');
    const { dispatchUpdateScore } = this.props;

    getAllButtons.forEach((btn) => {
      if (btn.value === 'wrong-ans') {
        btn.style.border = '3px solid rgb(255, 0, 0)';
      }
      if (btn.value === 'correct-ans') {
        btn.style.border = '3px solid rgb(6, 240, 15)';
      }
    });
    // <<<< consultado o pr do grupo 9

    if (value === 'correct-ans') {
      const prevLocalStorageState = JSON.parse(localStorage.getItem('state'));
      const newScore = prevLocalStorageState.player.score + this.getQuestionScore();
      const newState = {
        player: { ...prevLocalStorageState.player, score: newScore },
      };
      localStorage.setItem('state', JSON.stringify(newState));
      dispatchUpdateScore(newScore);
    }
  }

  render() {
    const { receviQuestions } = this.props;
    const { questionIndex, timer } = this.state;
    return (
      <div>
        <Header />
        <Timer count={ timer } />
        <p data-testid="question-category">{receviQuestions[questionIndex].category}</p>
        <p data-testid="question-text">{receviQuestions[questionIndex].question}</p>
        {receviQuestions[questionIndex].incorrect_answers.map((question, index) => (
          <div key={ index }>
            <button
              data-testid={ `wrong-answer-${index}` }
              onClick={ (event) => this.handleAnswerClick(event) }
              type="button"
              disabled={ timer === 0 }
              value="wrong-ans"
            >
              {question}
            </button>
          </div>
        ))}
        <button
          data-testid="correct-answer"
          onClick={ (event) => this.handleAnswerClick(event) }
          type="button"
          disabled={ timer === 0 }
          value="correct-ans"
        >
          { receviQuestions[questionIndex].correct_answer }
        </button>
      </div>
    );
  }
}

Trivia.propTypes = {
  dispatchUpdateScore: PropTypes.func.isRequired,
  receviQuestions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    difficulty: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  userEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  receviQuestions: state.trivia.questions,
  userName: state.player.name,
  userEmail: state.player.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchUpdateScore: (score) => dispatch(updateScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
