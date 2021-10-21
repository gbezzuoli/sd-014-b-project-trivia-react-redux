import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Alternative from './Alternative';

class AlternativeCard extends Component {
  constructor() {
    super();

    this.state = {
      index: 0,
    };
  }

  increaseIndex() {
    const { index } = this.state;

    this.setState({
      index: index + 1,
    });
  }

  render() {
    const NUMBER = 0.5;
    const { questions, controller, disabled } = this.props;
    const array = questions[controller];
    let accum = 0;
    let answers = [array.correct_answer, ...array.incorrect_answers];
    answers = answers.sort(() => Math.random() - NUMBER); /* https://flaviocopes.com/how-to-shuffle-array-javascript/ */

    return (
      <section>
        {answers
          .map((answer, index) => {
            if (array.incorrect_answers.includes(answer)) {
              accum += 1;
              return (<Alternative
                disabled={ disabled }
                key={ index }
                testid={ `wrong-answer-${accum}` }
                alternative={ answer }
              />);
            }
            return (<Alternative
              disabled={ disabled }
              key={ index }
              testid="correct-answer"
              alternative={ answer }
            />);
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
