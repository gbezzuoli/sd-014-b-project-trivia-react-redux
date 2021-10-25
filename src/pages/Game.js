import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import fetchQuestions from '../services/FetchQuestions';
import { setScoreAction } from '../redux/actions';

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
      disable: false,
      currentTime: 30,
      difficulty: '',
    };
    this.requestAPI = this.requestAPI.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addStyle = this.addStyle.bind(this);
    this.scoreCalculator = this.scoreCalculator.bind(this);
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

  setScoreState(score) {
    const { setScoreInRedux } = this.props;
    this.setState({
      score,
    });
    setScoreInRedux(score);
  }

  scoreCalculator() {
    const { difficulty, currentTime, score } = this.state;
    const dez = 10;
    const easy = 1;
    const medium = 2;
    const hard = 3;

    const scoreEasy = dez + (easy * currentTime);
    const scoreMedium = dez + (medium * currentTime);
    const scoreHard = dez + (hard * currentTime);

    let scoreFinal = score;
    switch (difficulty) {
    case 'easy':
      scoreFinal += scoreEasy;
      this.setState({ score: scoreFinal });
      return scoreFinal;
    case 'medium':
      scoreFinal += scoreMedium;
      this.setState({ score: scoreFinal });
      return scoreFinal;
    case 'hard':
      scoreFinal += scoreHard;
      this.setState({ score: scoreFinal });
      return scoreFinal;
    default:
      return this.state;
    }
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
      this.setScoreState(this.scoreCalculator());
    }
    this.setState({ disable: true, currentTime: 0 });
    this.addStyle();
  }

  async requestAPI() {
    const { token } = this.props;
    const allQuestions = await fetchQuestions(token);
    this.setState({
      questions: allQuestions.results,
      correctAnswer: allQuestions.results[0].correct_answer,
      difficulty: allQuestions.results[0].difficulty,
    });
  }

  mapQuestions(questions) {
    const { disable, currentTime } = this.state;
    const mappedQuestions = questions.map((question, index1) => {
      const incorrectAnswers = question.incorrect_answers.map((alternative, index2) => (
        <button
          type="button"
          disabled={ disable || currentTime === 0 }
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
          disabled={ disable || currentTime === 0 }
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
            {`Category: ${question.category}`}
          </h5>
          <h3 data-testid="question-text">
            {`Question: ${question.question}`}
          </h3>
          <h3 data-testid="question-text">
            { shuffledQuestions.map((e) => (e))}
          </h3>
        </div>
      );
    });
    return mappedQuestions;
  }

  addStyle() {
    const btn = document.querySelectorAll('.wrongButton');
    btn.forEach((button) => {
      button.setAttribute('style', 'border: 3px solid rgb(255, 0, 0)');
    });
    const btnCorrect = document.querySelector('.correctButton');
    btnCorrect.setAttribute('style', 'border: 3px solid rgb(6, 240, 15)');
  }

  render() {
    const { questions, currentTime, difficulty } = this.state;
    return (
      <div>
        <Header />
        <h1>TRIVIA</h1>
        {`Dificuldade: ${difficulty}`}
        {questions ? this.mapQuestions(questions)
          : <Loading />}
        <span>{ `TIMER: ${currentTime}` }</span>
        <br />
      </div>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  setScoreInRedux: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.gameReducers.token,
  name: state.gameReducers.name,
  score: state.gameReducers.score,
  email: state.gameReducers.email,
});

const mapDispatchToProps = (dispatch) => ({
  setScoreInRedux: (score) => dispatch(setScoreAction(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
