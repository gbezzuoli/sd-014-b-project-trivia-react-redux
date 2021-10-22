import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

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
      nextButton: false,
    };

    this.requestTriviaAPI = this.requestTriviaAPI.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    this.difficultyQuestion = this.difficultyQuestion.bind(this);
    this.saveOnStorage = this.saveOnStorage.bind(this);
    this.activateNextButton = this.activateNextButton.bind(this);
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
    const { saveOnStorage } = this;
    const { count } = this.state;
    if (count === 0) {
      clearInterval(this.interval);
    }
    saveOnStorage();
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

  saveOnStorage() {
    const { player } = this.props;
    const { assertions, score } = this.state;
    localStorage.setItem('state', JSON.stringify({
      player: {
        name: player.name,
        assertions,
        score,
        gravatarEamil: player.gravatarEamil,
      },
    }));
  }

  calculateScore({ target: { value } }, difficulty) {
    const { count } = this.state;
    const difficultyQuestion = this.difficultyQuestion(difficulty);
    const number = 10;
    if (value === correctAnswer) {
      this.setState((prev) => ({
        score: prev.score + (number + (count * difficultyQuestion)),
        assertions: prev.assertions + 1,
      }));
    }
  }

  changeColor() {
    const btn = document.querySelectorAll('button');
    btn.forEach((button) => {
      if (button.value === correctAnswer) {
        button.style.border = '3px solid rgb(6, 240, 15)';
      }
      if (button.value === wrongAnswer) {
        button.style.border = '3px solid rgb(255, 0, 0)';
      }
    });
  }

  activateNextButton() {
    this.setState({
      nextButton: true,
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
    const { questions, game, count, score, nextButton } = this.state;
    const { changeColor, calculateScore, interval, activateNextButton } = this;
    if (questions.length > 0) {
      const question = questions[game];
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
                  activateNextButton();
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
            {nextButton
              ? (
                <button data-testid="btn-next" type="button">
                  Próxima
                </button>
              ) : ''}
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

const mapStateToProps = (state) => ({
  player: state.playerInfo.player,
});

Game.propTypes = {
  player: PropTypes.objectOf(
    PropTypes.any,
  ).isRequired,
};

export default connect(mapStateToProps)(Game);
