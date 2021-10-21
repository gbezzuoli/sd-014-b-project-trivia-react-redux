import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';

const magicNumber = 0.5;

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldBorderColorChange: false,
    };

    this.changeBorderColor = this.changeBorderColor.bind(this);
  }

  changeBorderColor() {
    this.setState({ shouldBorderColorChange: true });
  }

  render() {
    const {
      state: { shouldBorderColorChange },
      props: { questions },
      changeBorderColor,
    } = this;

    const currentQuest = 0;
    const answers = questions && [
      questions[0].correct_answer,
      ...questions[0].incorrect_answers,
    ];
    const sortedAnswers = questions && answers.sort(() => Math.random() - magicNumber);

    return (
      <div>
        <h1
          key={ questions[currentQuest].category }
          data-testid="question-category"
        >
          { questions[currentQuest].category }
        </h1>
        <h2 data-testid="question-text">{ questions[currentQuest].question }</h2>
        {sortedAnswers.map((answer) => {
          const currentQIndex = questions[0].incorrect_answers.indexOf(answer);
          if (answer === questions[0].correct_answer) {
            return (
              <Button
                answer={ answer }
                key={ answer }
                id="correct-answer"
                buttonBorderColor="6, 240, 15"
                changeBorderColor={ changeBorderColor }
                shouldBorderColorChange={ shouldBorderColorChange }
              />
            );
          }
          return (
            <Button
              answer={ answer }
              key={ answer }
              id={ `wrong-answer-${currentQIndex}` }
              buttonBorderColor="255, 0, 0"
              changeBorderColor={ changeBorderColor }
              shouldBorderColorChange={ shouldBorderColorChange }
            />);
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.question.questions.results,
});

Questions.propTypes = {
  questions: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Questions);
