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
    };
    this.onClickColorCorrect = this.onClickColorCorrect.bind(this);
    this.onClickColorIncorrect = this.onClickColorIncorrect.bind(this);
    this.calcScore = this.calcScore.bind(this);
    this.setLocalStorage = this.setLocalStorage.bind(this);
  }

  componentDidMount() {
    localStorage.removeItem('state');
    this.setTimer();
  }

  async onClickColorCorrect(difficulty, timer) {
    const { scorePlayer } = this.state;
    const { getScore } = this.props;
    this.setState({
      correctColor: 'correctColor',
      wrongColor: 'wrongColor',
    });
    await this.calcScore(difficulty, timer);
    this.setLocalStorage();
    getScore(scorePlayer);
  }

  onClickColorIncorrect() {
    this.setState({
      correctColor: 'correctColor',
      wrongColor: 'wrongColor',
    });
  }

  setTimer() {
    const { timer } = this.state;
    const second = 1000;

    if (timer > 0) {
      setInterval(() => {
        this.setState((prevState) => ({ timer: prevState.timer - 1 }));
      }, second);
    }
  }

  setLocalStorage() {
    const { assertions, scorePlayer } = this.state;
    const { email, name } = this.props;

    const player = {
      name,
      assertions,
      score: scorePlayer,
      gravatarEmail: email,
    };

    localStorage.setItem('state', JSON.stringify(player));
  }

  calcScore(difficulty, timer) {
    const { scorePlayer } = this.state;
    const dez = 10;
    let total = 0;
    const HARD = 3;
    const MEDIUM = 2;
    console.log(timer);
    if (difficulty === 'hard') {
      total += dez + (timer * HARD);
    }

    if (difficulty === 'medium') {
      total += dez + (timer * MEDIUM);
    }

    if (difficulty === 'easy') {
      total += dez + timer;
    }
    this.setState((prevState) => ({
      scorePlayer: scorePlayer + total,
      assertions: prevState.assertions + 1 }));
  }

  render() {
    const { correctColor, wrongColor, timer } = this.state;
    const { question } = this.props;
    const RANDOM = 5;
    const correct = (
      <button
        onClick={ () => this.onClickColorCorrect(question.difficulty, timer) }
        data-testid="correct-answer"
        type="button"
        id="correct"
        className={ correctColor }
      >
        {question.correct_answer}
      </button>
    );
    const incorrects = question.incorrect_answers.map((element, index) => (
      <button
        onClick={ this.onClickColorIncorrect }
        data-testid={ `wrong-answer-${index}` }
        type="button"
        id="answer"
        key={ element }
        className={ wrongColor }
      >
        {element}
      </button>
    ));
    // fazer o sort com essa callback não é a melhor coisa do mundo
    const answers = [correct, ...incorrects].sort(() => Math.random() - RANDOM);
    console.log(answers);
    const options = answers.map((answer) => <li key={ answer }>{answer}</li>);

    return (
      <div>
        <p data-testid="question-category">{question.category}</p>
        <h1 data-testid="question-text">{question.question}</h1>
        <ul>{options}</ul>
        <div>{`Tempo Restante: ${timer}`}</div>
      </div>
    );
  }
}

GameCard.propTypes = {
  question: PropTypes.objectOf(PropTypes.any).isRequired,
};
function mapStateToProps(state) {
  return {
    name: state.user.name,
    email: state.user.email,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getScore: (playerScore) => dispatch(score(playerScore)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameCard);
