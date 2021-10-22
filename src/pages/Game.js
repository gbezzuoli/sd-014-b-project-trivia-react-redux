import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { savePlayerAction } from '../Redux/actions';

const correctAnswer = 'correct-answer';
const wrongAnswer = 'wrong-answer';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      game: 0,
      count: 30,
      score: 0,
      assertions: 0,
    };

    this.requestTriviaAPI = this.requestTriviaAPI.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    this.difficultyQuestion = this.difficultyQuestion.bind(this);
  }

  componentDidMount() {
    const { requestTriviaAPI } = this;
    requestTriviaAPI();
    const second = 1000;
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        count: prevState.count - 1,
      }));
    }, second);
  }

  componentDidUpdate() {
    const { count } = this.state;
    if (count === 0) {
      clearInterval(this.interval);
    }
  }

  difficultyQuestion(difficulty) {
    const easy = 1;
    const medium = 2;
    const hard = 3;
    if (difficulty === 'easy') {
      return easy;
    } if (difficulty === 'medium') {
      return medium;
    } if (difficulty === 'hard') {
      return hard;
    }
  }

  calculateScore({ target: { value } }, difficulty) {
    const { saveScore, player } = this.props;
    const { count, score, assertions } = this.state;
    const difficultyQuestion = this.difficultyQuestion(difficulty);
    const number = 10;
    if (value === correctAnswer) {
      this.setState((prev) => ({
        score: prev.score + (number + (count * difficultyQuestion)),
        assertions: prev.assertions + 1,
      }));
    }
    const saveScoreCall = () => saveScore({ score, assertions });
    saveScoreCall();
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  changeColor() {
    const btn = document.querySelectorAll('button');
    console.log(btn);
    btn.forEach((button) => {
      if (button.value === correctAnswer) {
        button.style.border = '3px solid rgb(6, 240, 15)';
      }
      if (button.value === wrongAnswer) {
        button.style.border = '3px solid rgb(255, 0, 0)';
      }
    });
  }

  async requestTriviaAPI() {
    const TOKEN = localStorage.getItem('token');
    const URL = `https://opentdb.com/api.php?amount=5&token=${TOKEN}`;
    const request = await fetch(URL);
    const data = await request.json();
    this.setState({ questions: data.results });
  }

  render() {
    const { questions, game, count, score } = this.state;
    const { changeColor, calculateScore, interval } = this;
    if (questions.length > 0) {
      const question = questions[game];
      console.log(question);
      const allAnswers = [question.correct_answer, ...question.incorrect_answers];
      return (
        <div>
          <Header score={ score } />
          <div key={ game }>
            <p data-testid="question-category">{question.category}</p>
            <p data-testid="question-text">{question.question}</p>
            {allAnswers.sort().map((answer, answerIndex) => (
              <button
                disabled={ count === 0 }
                type="button"
                key={ answerIndex }
                style={ {} }
                onClick={ (event) => {
                  clearInterval(interval);
                  changeColor();
                  calculateScore(event, question.difficulty);
                } }
                value={ question.correct_answer === answer
                  ? correctAnswer : 'wrong-answer' }
                data-testid={
                  question.correct_answer === answer
                    ? correctAnswer : `wrong-answer-${answerIndex}`
                }
              >
                {answer}
              </button>))}
            <p>{ count }</p>
          </div>
        </div>
      );
    }
    return (
      <p>Loading...</p>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  saveScore: (player) => dispatch(savePlayerAction(player)),
});

const mapStateToProps = (state) => ({
  player: state.playerInfo.player,
});

Game.propTypes = {
  player: PropTypes.objectOf(
    PropTypes.any,
  ).isRequired,
  saveScore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
