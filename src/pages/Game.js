import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MyTimer from '../components/MyTimer';
import QuestCard from '../components/QuestCard';
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
      count: 1,
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
    this.renderNextButton = this.renderNextButton.bind(this);
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
    const { count } = this.state;
    const questionData = await fetchQuestions(token);
    this.setState({
      questions: questionData.results[count],
      correctAnswer: questionData.results[count].correct_answer,
      wrongAnswers: questionData.results[count].incorrect_answers,
      difficulty: questionData.results[count].difficulty,
      category: questionData.results[count].category,
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

  handleNextQuestion(count) {
    const maxNumberOfQuestions = 5;
    if (count <= maxNumberOfQuestions) {
      this.setState({ count: count + 1 });
      // função que reatualiza a página
    } else {
      // levar pra feedback
      console.log('feedback');
    }
  }

  renderNextButton() {
    const { count } = this.state;
    return (
      <div>
        <button
          type="submit"
          data-testid="btn-next"
          onClick={ this.handleNextQuestion(count) }
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
        {questions
          ? <QuestCard quest={ questions.question } cat={ category } dif={ difficulty } />
          : <Loading /> }
        {questions ? this.mapQuestions() : <Loading />}
        <span><MyTimer time={ currentTime } /></span>
        {disable ? this.renderNextButton() : ''}
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
