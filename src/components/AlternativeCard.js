import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/index.css';
import Alternative from './Alternative';

class AlternativeCard extends Component {
  constructor() {
    super();
    this.state = {
      ready: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((state) => ({
      ready: !state.ready,
    }));
  }

  render() {
    const { ready } = this.state;
    const NUMBER = 0.5;
    const { questions, controller, disabled } = this.props;
    const array = questions[controller];
    let accum = 0;
    let answers = [array.correct_answer, ...array.incorrect_answers];
    answers = answers.sort(
      () => Math.random() - NUMBER,
    ); /* https://flaviocopes.com/how-to-shuffle-array-javascript/ */

    return (
      <section>
        {answers.map((answer, index) => {
          if (array.incorrect_answers.includes(answer)) {
            accum += 1;
            return (
              <Alternative
                disabled={ disabled }
                name={ ready ? 'incorrect' : '' }
                key={ index }
                testid={ `wrong-answer-${accum - 1}` }
                alternative={ answer }
                handleClick={ this.handleClick }
              />
            );
          }
          return (
            <Alternative
              disabled={ disabled }
              name={ ready ? 'correct' : '' }
              key={ index }
              testid="correct-answer"
              alternative={ answer }
              handleClick={ this.handleClick }
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
}.isRequired;

export default connect(mapStateToProps)(AlternativeCard);
