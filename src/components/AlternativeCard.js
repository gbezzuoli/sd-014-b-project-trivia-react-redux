import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { timeIsOver as timeIsOverAction } from '../actions';
import '../styles/index.css';
import Alternative from './Alternative';

const EASY = 1;
const MEDIUM = 2;
const HARD = 3;
const BASE_SCORE = 10;

class AlternativeCard extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick({ target: { name } }) {
    const { timeIsOverDispatch } = this.props;
    await timeIsOverDispatch(true);

    if (name === 'correct') {
      const { player } = JSON.parse(localStorage.getItem('state'));
      const { counter, questions, controller } = this.props;
      const questionObject = questions[controller];

      const updateScore = (questionDifficulty, timeLeft) => {
        switch (questionDifficulty) {
        case 'easy':
          return BASE_SCORE + (timeLeft * EASY);
        case 'medium':
          return BASE_SCORE + (timeLeft * MEDIUM);
        case 'hard':
          return BASE_SCORE + (timeLeft * HARD);
        default:
          break;
        }
      };

      player.assertions += 1;
      player.score += updateScore(questionObject.difficulty, counter);
      localStorage.setItem('state', JSON.stringify({ player }));
    }
  }

  render() {
    const { questions, controller, timeIsOver } = this.props;
    const array = questions[controller];
    let accum = 0;
    const answers = [array.correct_answer, ...array.incorrect_answers];

    return (
      <section>
        {answers.sort().map((answer, index) => {
          if (array.incorrect_answers.includes(answer)) {
            accum += 1;
            return (
              <Alternative
                disabled={ timeIsOver }
                className={ timeIsOver ? 'incorrect' : '' }
                name="incorrect"
                key={ index }
                testid={ `wrong-answer-${accum - 1}` }
                alternative={ answer }
                handleClick={ (event) => this.handleClick(event) }
              />
            );
          }
          return (
            <Alternative
              disabled={ timeIsOver }
              className={ timeIsOver ? 'correct' : '' }
              name="correct"
              key={ index }
              testid="correct-answer"
              alternative={ answer }
              handleClick={ (event) => this.handleClick(event) }
            />
          );
        })}
      </section>
    );
  }
}

const mapStateToProps = ({ questionsReducer: { questions,
  counter, timeIsOver } }) => ({
  questions,
  counter,
  timeIsOver,
});

const mapDispatchToProps = (dispatch) => ({
  timeIsOverDispatch: (timeOver,
    counter) => dispatch(timeIsOverAction(timeOver, counter)),
});

AlternativeCard.propTypes = {
  questions: PropTypes.shape({
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(
      PropTypes.string,
    ),
  }),
  controller: PropTypes.number,
  timeIsOverDispatch: PropTypes.func.isRequired,
  timeIsOver: PropTypes.bool.isRequired,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(AlternativeCard);
