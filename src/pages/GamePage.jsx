import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitScore } from '../redux/actions';
import requestQuestions from '../services/requestQuestions';
import Header from '../components/Header';

class GamePage extends Component {
  constructor() {
    super();
    this.getQuestions = this.getQuestions.bind(this);
    this.onClickAnswer = this.onClickAnswer.bind(this);
    this.setBtnAnswerBorder = this.setBtnAnswerBorder.bind(this);

    this.state = {
      result: [],
      questOne: [],
      difficulty: '',
      wrongAnswersOne: [],
      rightAnswerOne: '',
      corr: '',
      incor: '',
      count: 30,
      answers: [],
      i: 0,
      isQuestionAnswered: false,
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  componentDidUpdate() {
    const { count } = this.state;
    if (count === 0) {
      clearInterval(this.countInterval);
    }
  }

  onClickAnswer() {
    const { i } = this.state;
    const { history } = this.props;
    console.log('O índice atual é: ', i);
    const MAX_QUESTIONS = 4;

    if (i === MAX_QUESTIONS) {
      history.push('/feedback');
    } else {
      try {
        this.setState({
          i: i + 1,
        }, () => this.nextQuestion());
      } catch (error) {
        console.log(error);
        console.log('O indíce atual é: ', i);
      }
    }
  }

  setBtnAnswerBorder({ target }) {
    const { rightAnswerOne } = this.state;
    this.setState({
      incor: 'btn-answer',
      corr: 'correct-answer',
      isQuestionAnswered: true,
    });
    clearInterval(this.countInterval);
    if (target.innerText === rightAnswerOne) {
      this.calculateScore();
    }
  }

  async getQuestions() {
    const { i } = this.state;
    const result = await requestQuestions();
    this.setState({
      result,
      questOne: result[i].question,
      difficulty: result[i].difficulty,
      answers: [...result[i].incorrect_answers, result[i].correct_answer],
      wrongAnswersOne: result[i].incorrect_answers,
      rightAnswerOne: result[i].correct_answer,
    }, () => this.startCounter());
  }

  nextQuestion() {
    const { i, result } = this.state;
    try {
      this.setState({
        answers: [...result[i].incorrect_answers, result[i].correct_answer],
        wrongAnswersOne: result[i].incorrect_answers,
        rightAnswerOne: result[i].correct_answer,
        difficulty: result[i].difficulty,
        questOne: result[i].question,
        isQuestionAnswered: false,
        count: 30, // resetar o contador na próxima pergunta
        corr: '',
        incor: '',
      }, () => this.startCounter());
      console.log('O índice atual é: ', i);
    } catch (error) {
      console.log('O indíce atual é: ', i);
      console.log(error);
    }
  }

  calculateScore() {
    const { count, difficulty } = this.state;
    const { updateScore, score, assertions } = this.props;
    let numDifficulty;
    if (difficulty === 'hard') {
      numDifficulty = (2 + 1);
    } else if (difficulty === 'medium') {
      numDifficulty = 2;
    } else {
      numDifficulty = 1;
    }
    const NUMBER = 10;
    const newScore = score + NUMBER + (count * numDifficulty);
    this.saveScoreInLocalStorage(newScore, (assertions + 1));
    updateScore(newScore, (assertions + 1));
  }

  saveScoreInLocalStorage(score, assertions) {
    const stateLocalStorage = JSON.parse(localStorage.getItem('state'));
    stateLocalStorage.player.assertions = assertions;
    stateLocalStorage.player.score = score;
    localStorage.setItem('state', JSON.stringify(stateLocalStorage));
  }

  randomAnswers() {
    const { answers } = this.state;
    const arraySplice = [...answers];
    const novoArray = [];

    answers.forEach(() => {
      const max = arraySplice.length;
      const randomNumber = Math.floor(Math.random() * (max - 0) + 0);
      const item = arraySplice.splice(randomNumber, 1)[0];
      novoArray.push(item);
    });
    console.log(novoArray);
  }

  startCounter() {
    const ONE_SECOND = 1000;
    this.countInterval = setInterval(() => {
      this.setState((state) => ({
        count: state.count - 1,
      }));
    }, ONE_SECOND);
  }

  render() {
    const { questOne, wrongAnswersOne,
      rightAnswerOne, corr, incor, count, isQuestionAnswered } = this.state;
    const idWrongAns = 'wrong-answer-';
    if (questOne === []) {
      return null;
    }
    return (
      <div>
        <Header />
        <section>
          <h1 data-testid="question-category">Categoria</h1>
          <h2 data-testid="question-text">
            {questOne}
          </h2>
          <h2>{ count }</h2>
          {wrongAnswersOne.map((item, index) => (
            <div key={ index }>
              <button
                className={ incor }
                type="button"
                data-testid={ idWrongAns + index }
                onClick={ this.setBtnAnswerBorder }
                disabled={ count === 0 }
              >
                {item}
              </button>
            </div>))}
          <button
            className={ corr }
            onClick={ this.setBtnAnswerBorder }
            type="button"
            data-testid="correct-answer"
            disabled={ count === 0 }
          >
            {rightAnswerOne}
          </button>
          <br />
          <button
            type="button"
            onClick={ this.onClickAnswer }
            data-testid="btn-next"
            style={ { visibility: isQuestionAnswered ? 'visible' : 'hidden' } }
          >
            Próximo
          </button>
        </section>
      </div>
    );
  }
}

GamePage.propTypes = {
  updateScore: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  updateScore: (score, assertions) => dispatch(submitScore(score, assertions)),
});

const mapStateToProps = (state) => ({
  gravatarEmail: state.playerReducer.gravatarEmail,
  score: state.playerReducer.score,
  assertions: state.playerReducer.assertions,
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
