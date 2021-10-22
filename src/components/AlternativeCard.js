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
    this.state = {
      showAnswer: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick({ target: { name } }) {
    this.setState((state) => ({
      showAnswer: !state.showAnswer,
    }));

    const { timeIsOverDispatch } = this.props;
    timeIsOverDispatch(true);

    if (name === 'correct') {
      const { player } = JSON.parse(localStorage.getItem('state'));
      console.log(player);
      const { counter, questions, controller } = this.props;
      const questionObject = questions[controller];

      console.log(counter);

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

      console.log(counter);

      player.assertions += 1;
      player.score += updateScore(questionObject.difficulty, counter);
      localStorage.setItem('state', JSON.stringify({ player }));
      console.log(counter);
    }
  }

  render() {
    const { showAnswer } = this.state;
    const { questions, controller, disabled } = this.props;
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
                disabled={ disabled }
                className={ showAnswer ? 'incorrect' : '' }
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
              disabled={ disabled }
              className={ showAnswer ? 'correct' : '' }
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

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
  disabled: state.questionsReducer.timeIsOver,
  counter: state.questionsReducer.counter,
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
  disabled: PropTypes.bool,
  timeIsOverDispatch: PropTypes.func.isRequired,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(AlternativeCard);
