import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      idx: 0,
      toggle: false,
      segundo: 30,
    };

    this.renderCardQuestion = this.renderCardQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    setInterval(() => {
      this.time = this.setState((prevState) => ({ segundo: prevState.segundo - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate(prevProps, prevState) {
    const zeraTime = 0;
    if (prevState.segundo === zeraTime) {
      clearInterval(this.time);
    }
  }

  handleClick() {
    this.setState({ toggle: true });
  }

  renderCardQuestion() {
    const { idx, toggle } = this.state;
    const { trivia } = this.props;
    if (trivia !== []) {
      const correctAnswer = ([
        <button
          onClick={ this.handleClick }
          className={ toggle && 'correct' }
          type="button"
          data-testid="correct-answer"
          key=""
        >
          { trivia[idx].correct_answer }
        </button>]);
      const incorrctAnswers = trivia[idx].incorrect_answers.map((answer, index) => (
        <button
          onClick={ this.handleClick }
          className={ toggle && 'incorrect' }
          type="button"
          data-testid={ `wrong-answer-${index}` }
          key={ index }
        >
          { answer }
        </button>
      ));

      const arrayQuestions = [...correctAnswer, ...incorrctAnswers];
      const HALF = 0.5;
      return (
        <>
          <p data-testid="question-category">{ trivia[idx].category }</p>
          <h3 data-testid="question-text">{ trivia[idx].question }</h3>
          {arrayQuestions.sort(() => Math.round(Math.random()) - HALF)}
        </>
      );
    }
  }

  render() {
    // const { segundo } = this.state;
    const { request } = this.props;
    return (
      <div>
        game
        {/* <p>{ segundo }</p> */}
        { console.log(request)}
        {request && this.renderCardQuestion()}
      </div>
    );
  }
}

Game.propTypes = {
  request: PropTypes.bool.isRequired,
  trivia: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  trivia: state.login.triviaQuest.results,
  request: state.login.request,
});

export default connect(mapStateToProps)(Game);
