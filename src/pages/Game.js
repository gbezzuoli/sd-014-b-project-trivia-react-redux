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
      questions: [],
      correctAnswer: '',
      wrongAnswers: [],
      alternativesArray: [],
      assertions: 0,
      score: 0,
      disable: false,
      currentTime: 30,
      difficulty: [],
      category: [],
      contador: 0,
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
    const { difficulty, currentTime, score, contador } = this.state;
    const dez = 10;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    const scoreEasy = dez + (easy * currentTime);
    const scoreMedium = dez + (medium * currentTime);
    const scoreHard = dez + (hard * currentTime);
    let scoreFinal = score;
    switch (difficulty[contador]) {
    case 'easy':
      scoreFinal += scoreEasy;
      this.setState((state) => ({ score: state.score + scoreFinal }));
      return scoreFinal;
    case 'medium':
      scoreFinal += scoreMedium;
      this.setState((state) => ({ score: state.score + scoreFinal }));
      return scoreFinal;
    case 'hard':
      scoreFinal += scoreHard;
      this.setState((state) => ({ score: state.score + scoreFinal }));
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
    const { correctAnswer, assertions, contador } = this.state;
    const givenAnswer = target.innerHTML;
    if (givenAnswer === correctAnswer[contador]) {
      this.setState({ assertions: assertions + 1 });
      this.setScoreState(this.scoreCalculator());
    }
    this.setState({ disable: true, currentTime: 0 });
    this.addStyle();
  }

  shuffleQuestions() {
    const { correctAnswer, wrongAnswers, contador } = this.state;
    const alternatives = [...wrongAnswers[contador], correctAnswer[contador]];
    const half = 0.5;
    const shuffledAlternatives = alternatives.sort(() => half - Math.random());
    this.setState({ alternativesArray: shuffledAlternatives });
  }

  async requestAPI() {
    const { token } = this.props;
    const questionData = await fetchQuestions(token);
    console.log(questionData);
    this.setState({
      questions: questionData.results.map((result) => (result.question)),
      correctAnswer: questionData.results.map((result) => (result.correct_answer)),
      wrongAnswers: questionData.results.map((result) => (result.incorrect_answers)),
      difficulty: questionData.results.map((result) => (result.difficulty)),
      category: questionData.results.map((result) => (result.category)),
    });
    this.shuffleQuestions();
  }

  mapQuestions() {
    const {
      alternativesArray, correctAnswer, disable, currentTime, contador } = this.state;
    const mappedQuestions = alternativesArray.map((alternative, index) => {
      if (alternative === correctAnswer[contador]) {
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
    const btn = document.querySelectorAll('.wrongButton'); // mudar depois
    btn.forEach((button) => {
      button.setAttribute('style', 'border: 3px solid rgb(255, 0, 0)');
    });
    const btnCorrect = document.querySelector('.correctButton');
    btnCorrect.setAttribute('style', 'border: 3px solid rgb(6, 240, 15)');
  }

  handleNextQuestion() {
    const { contador, questions } = this.state;
    this.setState({
      currentTime: 30,
    });
    if (contador <= questions.length) {
      this.setState((prev) => ({ contador: prev.contador + 1 }));
      // funcao para atualizar a pergunta
    } else {
      // levar pra feedback
      console.log('feedback');
    }
  }

  renderNextButton() {
    return (
      <div>
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.handleNextQuestion }
        >
          Próxima
        </button>
      </div>
    );
  }

  render() {
    const {
      questions, currentTime, difficulty, disable, category, contador } = this.state;
    return (
      <div>
        <Header />
        {questions ? <QuestCard
          quest={ questions[contador] }
          cat={ category[contador] }
          dif={ difficulty[contador] }
        />
          : <Loading /> }
        {questions ? this.mapQuestions() : <Loading />}
        <span><MyTimer time={ currentTime } /></span>
        {(!disable || !currentTime === 0) ? this.renderNextButton() : ''}
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
