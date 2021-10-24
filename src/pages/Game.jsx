import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Timer from '../components/Timer';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      idx: 0,
      toggle: false,
      disabled: false,
    };

    this.renderCardQuestion = this.renderCardQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.showResponseAfterTime = this.showResponseAfterTime.bind(this);
  }

  handleClick() {
    this.setState({
      toggle: true,
      stopTimer: true,
    });
  }

  showResponseAfterTime() {
    this.setState({
      toggle: true,
      stopTimer: true,
      disabled: true,
    });
  }

  renderCardQuestion() {
    const { idx, toggle, disabled } = this.state;
    const { trivia } = this.props;
    if (trivia !== []) {
      const correctAnswer = ([
        <button
          onClick={ this.handleClick }
          className={ toggle && 'correct' }
          type="button"
          data-testid="correct-answer"
          key=""
          disabled={ disabled }
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
          disabled={ disabled }
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
    const { stopTimer } = this.state;
    const { request } = this.props;
    return (
      <div>
        <Header />
        <Timer
          stopTimer={ stopTimer }
          showResponseAfterTime={ this.showResponseAfterTime }
        />
        game
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
