import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import TriviaQuestion from '../components/TriviaQuestion';
import WrongAnswer from '../components/WrongAnswer';
import CorrectAnswer from '../components/CorrectAnswer';
import GameHeader from '../components/GameHeader';
import { fecthTrivia } from '../redux/actions';
import { sendPlayerFeedback } from '../redux/actions/gameActions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      assertions: 0,
      timer: 30,
      score: 0,
      index: 0,
      next: false,
      loading: true,
      redirect: false,
    };

    this.renderQuestionsRandomAnswers = this.renderQuestionsRandomAnswers.bind(this);
    this.answerClickHandler = this.answerClickHandler.bind(this);
    this.nextButtonClick = this.nextButtonClick.bind(this);
    this.fetchQuestionsState = this.fetchQuestionsState.bind(this);
    this.timer = this.timer.bind(this);
    this.addScore = this.addScore.bind(this);
    this.redirectAndSendFeedback = this.redirectAndSendFeedback.bind(this);
  }

  componentDidMount() {
    this.fetchQuestionsState();
    this.timer();
  }

  async fetchQuestionsState() {
    const dataQuestions = await fecthTrivia();
    const { results } = dataQuestions;
    this.setState({
      questions: results,
      loading: false,
    });
  }

  answerClickHandler({ target }) {
    const { id, value } = target;
    const { playerName, playerEmail } = this.props;
    const { assertions, score } = this.state;
    clearInterval(this.test);
    this.setState({ next: true });
    if (id === 'incorrect') {
      console.log('Resposta errada!');
    } else if (id === 'correct') {
      console.log('Certa resposta!');
      this.addScore(value);
    }
    localStorage.setItem('player', JSON.stringify(
      {
        name: playerName,
        assertions,
        score,
        gravatarEmail: playerEmail,
      },
    ));
  }

  addScore(difficulty) {
    const { timer, score, assertions } = this.state;
    const TEN = 10;
    const THREE = 3;
    let points;
    switch (difficulty) {
    case 'easy':
      points = TEN + (timer * 1);
      break;
    case 'medium':
      points = TEN + (timer * 2);
      break;
    case 'hard':
      points = TEN + (timer * THREE);
      break;
    default:
      console.log('Ocorreu um erro');
      break;
    }
    this.setState({ assertions: assertions + 1, score: score + points });
  }

  redirectAndSendFeedback() {
    const { sendFeedback } = this.props;
    const feedbackInfo = JSON.parse(localStorage.getItem('player'));
    const { name, assertions, score, gravatarEmail } = feedbackInfo;
    const rankingScore = {
      name,
      score,
      gravatarEmail,
    };
    if (!JSON.parse(localStorage.getItem('ranking'))) {
      localStorage.setItem('ranking', JSON.stringify([]));
    }
    const rankingStorage = JSON.parse(localStorage.getItem('ranking'));
    localStorage.setItem('ranking', JSON.stringify([...rankingStorage, rankingScore]));
    sendFeedback({ assertions, score });
    this.setState({ redirect: true });
  }

  finishButtonRender() {
    return (
      <button
        type="button"
        onClick={ () => this.redirectAndSendFeedback() }
      >
        Finalizar
      </button>
    );
  }

  nextButtonRender() {
    const { next } = this.state;
    return (
      <button
        type="button"
        data-testid="btn-next"
        disabled={ next === false }
        onClick={ () => this.nextButtonClick() }
      >
        Próxima
      </button>
    );
  }

  nextButtonClick() {
    this.setState((state) => ({ index: state.index + 1, next: false, timer: 30 }));
    this.timer();
  }

  timer() {
    const time = 1000;
    this.test = setInterval(() => {
      const { timer } = this.state;
      if (timer === 0) {
        clearInterval();
        this.setState({ next: true });
      } else {
        this.setState((prevState) => ({
          timer: prevState.timer - 1,
        }));
      }
    }, time);
  }

  renderQuestionsRandomAnswers() {
    const { questions, index, next, timer } = this.state;
    const MAGIC_NUMBER = 0.5;
    const incorrectAnswers = questions[index].incorrect_answers
      .map((wrong, i) => (
        <WrongAnswer
          incorrect={ wrong }
          key={ i }
          disabled={ !!next }
          borderColor={ !next ? 'answer' : 'incorrectAnswer' }
          clickAnswer={ this.answerClickHandler }
        />));
    const correctAnswers = (
      <CorrectAnswer
        correct={ questions[index].correct_answer }
        difficulty={ questions[index].difficulty }
        timer={ timer }
        disabled={ !!next }
        borderColor={ !next ? 'answer' : 'correctAnswer' }
        clickAnswer={ this.answerClickHandler }
      />);
    const allAnswers = [...incorrectAnswers, correctAnswers]
      .sort(() => Math.random() - MAGIC_NUMBER);
    return (
      <div>
        { allAnswers.map((answer) => answer) }
      </div>
    );
  }

  render() {
    const { loading, questions, index, next, timer, score, redirect } = this.state;
    const FOUR = 4;
    if (loading) return <h1>Loading</h1>;
    if (redirect) return <Redirect to="/feedback" />;
    return (
      <div>
        <h1>{timer}</h1>
        <GameHeader score={ score } />
        <TriviaQuestion
          category={ questions[index].category }
          question={ questions[index].question }
        />
        { this.renderQuestionsRandomAnswers() }
        <br />
        { index === FOUR
          ? (next && this.finishButtonRender()) : (next && this.nextButtonRender()) }
      </div>
    );
  }
}

Game.propTypes = {
  playerEmail: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  sendFeedback: PropTypes.func.isRequired,
  // sendRanking: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  playerName: state.player.name,
  playerEmail: state.player.email,
});

const mapDispatchToProps = (dispatch) => ({
  sendFeedback: (...state) => dispatch(sendPlayerFeedback(...state)),
  // sendRanking: (...state) => dispatch(sendPlayerRanking(...state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
