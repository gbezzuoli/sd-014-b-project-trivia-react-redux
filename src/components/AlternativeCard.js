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
    const { questions, controller } = this.props;
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
                key={ index }
                testid={ `wrong-answer-${accum}` }
                alternative={ answer }
              />);
            }
            return (<Alternative
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
});

AlternativeCard.propTypes = {
  questions: PropTypes.shape({
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(
      PropTypes.string,
    ),
  }),
  controller: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(AlternativeCard);
