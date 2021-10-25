import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/game.css';
import { connect } from 'react-redux';
import { score } from '../redux/actions/actions';

class GameCard extends Component {
  constructor() {
    super();
    this.state = {
      correctColor: '',
      wrongColor: '',
      assertions: 0,
      scorePlayer: 0,
      timer: 30,
      nextAsk: false,
      changeAsk: 0,
    };
    this.onClickColorCorrect = this.onClickColorCorrect.bind(this);
    this.onClickColorIncorrect = this.onClickColorIncorrect.bind(this);
    this.calcScore = this.calcScore.bind(this);
    this.setLocalStorage = this.setLocalStorage.bind(this);
    this.cancelTime = this.cancelTime.bind(this);
    this.showBtnNext = this.showBtnNext.bind(this);
    this.showNextAsk = this.showNextAsk.bind(this);
    this.buttonNext = this.buttonNext.bind(this);
  }

  componentDidMount() {
    this.setTimer();
  }

  async onClickColorCorrect(difficulty) {
    const { timer } = this.state;
    this.setState({
      correctColor: 'correctColor',
      wrongColor: 'wrongColor',
    });
    await this.calcScore(difficulty, timer);
    this.setLocalStorage();
    this.showBtnNext();
  }

  onClickColorIncorrect() {
    this.setState({
      correctColor: 'correctColor',
      wrongColor: 'wrongColor',
    });
    this.showBtnNext();
  }

  setTimer() {
    const second = 1000;
    const stopWatch = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
      this.cancelTime(stopWatch);
    }, second);
  }

  setLocalStorage() {
    const { assertions, scorePlayer } = this.state;
    const { email, name } = this.props;

    const object = {
      player:
      { name,
        assertions,
        score: scorePlayer,
        gravatarEmail: email },
    };

    localStorage.setItem('state', JSON.stringify(object));
  }

  cancelTime(stopWatch) {
    const { timer } = this.state;
    if (timer === 0) {
      clearTimeout(stopWatch);
      this.onClickColorCorrect();
    }
  }

  calcScore(difficulty, timer) {
    const { scorePlayer } = this.state;
    const { getScore } = this.props;
    const dez = 10;
    let total = 0;
    const HARD = 3;
    const MEDIUM = 2;
    const EASY = 1;
    console.log(timer);
    if (difficulty === 'hard') total = dez + (timer * HARD);
    if (difficulty === 'medium') total = dez + (timer * MEDIUM);
    if (difficulty === 'easy') total = dez + (timer * EASY);
    this.setState((prevState) => ({
      scorePlayer: scorePlayer + total,
      assertions: prevState.assertions + 1 }));
    getScore(scorePlayer);
  }

  showBtnNext() {
    this.setState({
      nextAsk: true,
    });
  }

  showNextAsk() {
    this.setState((state) => ({
      changeAsk: state.changeAsk + 1,
      nextAsk: false,
    }));
  }

  header(avatar, name, scorePlayer) {
    return (
      <header>
        <img data-testid="header-profile-picture" src={ avatar } alt="" />
        <span data-testid="header-player-name">{name}</span>
        <span data-testid="header-score">{`Pontos: ${scorePlayer}`}</span>
      </header>);
  }

  buttonNext() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ this.showNextAsk }
      >
        Próxima
      </button>);
  }

  render() {
    const { correctColor, wrongColor, timer, scorePlayer, nextAsk,
      changeAsk } = this.state;
    const { question, name, avatar } = this.props;
    const RANDOM = 5;
    const correct = (
      <button
        onClick={ () => this.onClickColorCorrect(question[changeAsk].difficulty) }
        disabled={ timer === 0 }
        data-testid="correct-answer"
        type="button"
        id="correct"
        className={ correctColor }
      >
        {question[changeAsk].correct_answer}
      </button>
    );
    const incorrects = question[changeAsk].incorrect_answers.map((element, index) => (
      <button
        onClick={ this.onClickColorIncorrect }
        data-testid={ `wrong-answer-${index}` }
        disabled={ timer === 0 }
        type="button"
        id="answer"
        key={ element }
        className={ wrongColor }
      >
        {element}
      </button>
    ));
    const answers = [correct, ...incorrects].sort(() => Math.random() - RANDOM);
    console.log(answers);
    const options = answers.map((answer) => <li key={ answer }>{answer}</li>);
    return (
      <div>
        {this.header(avatar, name, scorePlayer)}
        <div>
          <p data-testid="question-category">{question[changeAsk].category}</p>
          <h1 data-testid="question-text">{question[changeAsk].question}</h1>
          <ul>{options}</ul>
          <div>{`Tempo Restante: ${timer}`}</div>
        </div>
        {nextAsk && this.buttonNext()}
      </div>
    );
  }
}

GameCard.propTypes = {
  avatar: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  getScore: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  question: PropTypes.objectOf(PropTypes.any).isRequired,
};

function mapStateToProps(state) {
  return {
    name: state.user.name,
    email: state.user.email,
    avatar: state.user.avatar,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getScore: (playerScore) => dispatch(score(playerScore)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameCard);
