import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import fetchQuestions from '../services/FetchQuestions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: '',
      correctAnswer: '',
      count: -1,
      disable: false,
      currentTime: 35,
    };
    this.requestAPI = this.requestAPI.bind(this);
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
    }
    this.addStyle();
    this.setState({ disable: true, currentTime: 0 });
  }

  async requestAPI() {
    const { token } = this.props;
    const allQuestions = await fetchQuestions(token);
    this.setState({
      questions: allQuestions.results,
      correctAnswer: allQuestions.results[0].correct_answer,
    });
    this.mapQuestions(allQuestions.results);
  }

  mapQuestions(questions) {
    const { disable, timer } = this.state;
    const mappedQuestions = questions.map((question, index1) => {
      const incorrectAnswers = question.incorrect_answers.map((alternative, index2) => (
        <button
          type="button"
          disabled={ disable || timer === 0 }
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
          disabled={ disable || timer === 0 }
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
    const { questions, currentTime } = this.state;
    return (
      <div>
        <Header />
        <h1>TRIVIA</h1>
        {questions ? this.mapQuestions(questions) : <Loading />}
        { `TIMER: ${currentTime}` }
      </div>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.gameReducers.token,
});

export default connect(mapStateToProps, null)(Game);
