import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      idx: 0,
    };

    this.renderCardQuestion = this.renderCardQuestion.bind(this);
  }

  renderCardQuestion() {
    const { idx } = this.state;
    const { trivia } = this.props;
    console.log(trivia);
    if (trivia !== []) {
      const correctAnswer = ([
        <button type="button" data-testid="correct-answer" key="">
          { trivia[idx].correct_answer }
        </button>]);
      const incorrctAnswers = trivia[idx].incorrect_answers.map((answer, index) => (
        <button type="button" data-testid={ `wrong-answer-${index}` } key={ index }>
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
    const { request } = this.props;
    return (
      <div>
        <Header />
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
