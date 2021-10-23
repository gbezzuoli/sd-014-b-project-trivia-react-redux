import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MyTimer from '../components/MyTimer';
import QuestionCard from '../components/QuestionCard';
import fetchQuestions from '../services/FetchQuestions';
import { setScoreAction } from '../redux/actions';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: '',
      correctAnswer: '',
      wrongAnswers: [],
      alternativesArray: [],
      assertions: 0,
      score: 0,
      count: 0,
      disable: false,
      currentTime: 30,
      difficulty: '',
      category: '',
    };
    this.requestAPI = this.requestAPI.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addStyle = this.addStyle.bind(this);
    this.scoreCalculator = this.scoreCalculator.bind(this);
    this.shuffleQuestions = this.shuffleQuestions.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
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

  shuffleQuestions() {
    const { correctAnswer, wrongAnswers } = this.state;
    const alternatives = [...wrongAnswers, correctAnswer];
    const half = 0.5;
    const shuffledAlternatives = alternatives.sort(() => half - Math.random());
    this.setState({ alternativesArray: shuffledAlternatives });
  }

  async requestAPI() {
    const { token } = this.props;
    const questionData = await fetchQuestions(token);
    this.setState({
      questions: questionData.results[0],
      correctAnswer: questionData.results[0].correct_answer,
      wrongAnswers: questionData.results[0].incorrect_answers,
      difficulty: questionData.results[0].difficulty,
      category: questionData.results[0].category,
    });
    this.shuffleQuestions();
  }

  mapQuestions() {
    const { alternativesArray, correctAnswer, disable, currentTime } = this.state;
    const mappedQuestions = alternativesArray.map((alternative, index) => {
      if (alternative === correctAnswer) {
        return (
          <button
            type="button"
            disabled={ disable || currentTime === 0 }
            data-testid="correct-answer"
            className="correctButton"
            key="4"
            onClick={ this.handleClick }
          >
            { alternative }
          </button>
        );
      }
      return (
        <button
          type="button"
          disabled={ disable || currentTime === 0 }
          data-testid={ `wrong-answer-${index}` }
          className="wrongButton"
          key={ index }
          onClick={ this.handleClick }
        >
          {alternative}
        </button>
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

  handleNextQuestion() {
    // Mandar pra um contador global quantas perguntas já foram
    // Atualizar esse estado global com + 1
    // Chamar a API de novo e recomeçar
  }

  renderButton() {
    return (
      <div>
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.handleNextQuestion() }
        >
          Próxima
        </button>
      </div>
    );
  }

  render() {
    const { questions, currentTime, difficulty, disable, category } = this.state;
    return (
      <div>
        <Header />
        <h1>TRIVIA</h1>
        <br />
        {`Question difficulty: ${difficulty}`}
        <br />
        {questions
          ? <QuestionCard question={ questions.question } category={ category } />
          : <Loading /> }
        {questions ? this.mapQuestions() : <Loading />}
        <br />
        <br />
        <span><MyTimer time={ currentTime } /></span>
        <br />
        {disable ? this.renderButton() : ''}
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
