import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import fetchQuestions from '../services/FetchQuestions';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: '',
      correctAnswer: '',
      // answered: false,
      assertions: 0, // acertos antes da formula
      score: 0, // acertos depois da formula
      count: -1,
      disabledState: false,
      currentTime: 35,
      difficulty: '',
    };
    this.requestAPI = this.requestAPI.bind(this);
    this.mapQuestions = this.mapQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addStyle = this.addStyle.bind(this);
  }

  componentDidMount() {
    this.requestAPI();
    this.tick();
  }

  componentDidUpdate() {
    const { currentTime } = this.state;
    if (currentTime === 0) {
      clearInterval(this.timerID);
      this.addStyle();
    }
    this.saveScore();
  }

  saveScore() {
    const { name, email } = this.props;
    const { assertions, score } = this.state;
    const playerInfo = {
      player: {
        name,
        assertions,
        score,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(playerInfo));
  }

  scoreCalculator() {
    const { difficulty, currentTime } = this.state;
    const dez = 10;
    const easy = 1;
    const medium = 2;
    const hard = 3;

    const scoreEasy = dez + (easy * currentTime);
    const scoreMedium = dez + (medium * currentTime);
    const scoreHard = dez + (hard * currentTime);
    switch (difficulty) {
    case 'easy':
      this.setState((prevState) => ({
        score: prevState.score + scoreEasy,
      }));
      break;
    case 'medium':
      this.setState((prevState) => ({
        score: prevState.score + scoreMedium,
      }));
      break;
    case 'hard':
      this.setState((prevState) => ({
        score: prevState.score + scoreHard,
      }));
      break;
    default:
      return this.state;
    }
  }

  tick() {
    const ONE_SECOND = 1000;
    this.timerID = setInterval(() => this.setState((prevState) => ({
      currentTime: prevState.currentTime - 1,
    })), ONE_SECOND);
  }

  handleClick({ target }) {
    const { correctAnswer, count } = this.state;
    const givenAnswer = target.innerHTML;
    if (givenAnswer === correctAnswer) {
      this.setState({ count: count + 1 });
      this.scoreCalculator();
    }
    this.addStyle();
    this.setState({ disabledState: true });
  }

  async requestAPI() {
    const { token } = this.props;
    const allQuestions = await fetchQuestions(token);
    this.setState({
      questions: allQuestions.results,
      correctAnswer: allQuestions.results[0].correct_answer,
      difficulty: allQuestions.results[0].difficulty,
    });
    console.log(allQuestions);
  }

  addStyle() {
    const btn = document.querySelectorAll('.wrongButton');
    btn.forEach((button) => {
      button.setAttribute('style', 'border: 3px solid rgb(255, 0, 0)');
    });
    const btnCorrect = document.querySelector('.correctButton');
    btnCorrect.setAttribute('style', 'border: 3px solid rgb(6, 240, 15)');
  }

  mapQuestions(questions) {
    const { disabledState, currentTime } = this.state;
    const mappedQuestions = questions.map((question, index1) => {
      const incorrectAnswers = question.incorrect_answers.map((alternative, index2) => (
        <button
          type="button"
          disabled={ disabledState || currentTime === 0 }
          data-testid={ `wrong-answer-${index2}` }
          className="wrongButton"
          key={ index2 }
          onClick={ this.handleClick }
        >
          {alternative}
        </button>
      ));
      const correctAnswer = (
        <button
          type="button"
          disabled={ disabledState || currentTime === 0 }
          data-testid="correct-answer"
          className="correctButton"
          key="4"
          onClick={ this.handleClick }
        >
          { question.correct_answer }
        </button>
      );
      const alternatives = [...incorrectAnswers, correctAnswer];
      const metade = 0.5;
      const shuffledQuestions = alternatives.sort(() => metade - Math.random());
      return (
        <div key={ index1 }>
          <h5 data-testid="question-category">
            {`Categoria: ${question.category}`}
          </h5>
          <h3 data-testid="question-text">
            {`Pergunta: ${question.question}`}
          </h3>
          <h3 data-testid="question-text">
            { shuffledQuestions.map((e) => (e))}
          </h3>
        </div>
      );
    });
    return mappedQuestions;
  }

  render() {
    const { questions, currentTime, difficulty, score } = this.state;
    return (
      <div>
        <Header />
        <h1>TRIVIA</h1>
        {`Dificuldade: ${difficulty}`}
        {questions ? this.mapQuestions(questions)
          : <span>CARREGANDO</span>}
        <span>{ `TIMER: ${currentTime}` }</span>
        <span>{ `Sua pontuação é ${score}`}</span>
      </div>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.gameReducers.token,
  name: state.gameReducers.name,
  score: state.gameReducers.score,
  email: state.gameReducers.email,
});

export default connect(mapStateToProps, null)(Game);
