import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { timeIsOver as timeIsOverAction } from '../actions';
import '../styles/index.css';
import Alternative from './Alternative';

const EASY = 1;
const MEDIUM = 2;
const HARD = 3;
const TEN = 10;

class AlternativeCard extends Component {
  constructor() {
    super();
    this.state = {
      ready: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick({ target: { name } }) {
    this.setState((state) => ({
      ready: !state.ready,
    }));

    const { timeIsOverDispatch } = this.props;
    timeIsOverDispatch(true);

    if (name === 'correct') {
      const { player } = JSON.parse(localStorage.getItem('state'));
      console.log(player);
      const { counter, questions, controller } = this.props;
      const questionsObject = questions[controller];

      console.log(counter);

      const updateScore = (diff, count) => {
        console.log(count);
        console.log(diff);
        switch (diff) {
        case 'easy':
          return TEN + (count * EASY);
        case 'medium':
          return TEN + (count * MEDIUM);
        case 'hard':
          return TEN + (count * HARD);
        default:
          break;
        }
      };

      player.assertions += 1;
      player.score += updateScore(questionsObject.difficulty, counter);
      localStorage.setItem('state', JSON.stringify(player));
    }
  }

  render() {
    const { ready } = this.state;
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
                className={ ready ? 'incorrect' : '' }
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
              className={ ready ? 'correct' : '' }
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
