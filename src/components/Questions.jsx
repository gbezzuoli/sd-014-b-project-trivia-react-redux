import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';

const HALF = 0.5;

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldBorderColorChange: false,
      sortedAnswers: [],
      currentQuestion: 0,
    };

    this.getAnswersAndSort = this.getAnswersAndSort.bind(this);
    this.changeBorderColor = this.changeBorderColor.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
  }

  componentDidMount() {
    const { getAnswersAndSort } = this;
    getAnswersAndSort();
  }

  getAnswersAndSort() {
    const {
      props: { questions },
      state: { currentQuestion },
    } = this;

    const answers = questions && [
      questions[currentQuestion].correct_answer,
      ...questions[currentQuestion].incorrect_answers,
    ];

    const sortedAnswers = questions && answers.sort(() => Math.random() - HALF);

    this.setState({ sortedAnswers });
  }

  changeBorderColor() {
    this.setState({ shouldBorderColorChange: true });
  }

  handleNextQuestion() {
    this.setState(({ currentQuestion }) => ({ currentQuestion: currentQuestion + 1,
      shouldBorderColorChange: false }),
    () => this.getAnswersAndSort());
  }

  render() {
    const {
      state: { shouldBorderColorChange, sortedAnswers, currentQuestion },
      props: { questions },
      changeBorderColor,
    } = this;

    return (
      <div>
        <h1
          key={ questions[currentQuestion].category }
          data-testid="question-category"
        >
          { questions[currentQuestion].category }
        </h1>
        <h2 data-testid="question-text">{ questions[currentQuestion].question }</h2>
        {sortedAnswers.map((answer) => {
          const currentQIndex = questions[currentQuestion]
            .incorrect_answers.indexOf(answer);
          if (answer === questions[currentQuestion].correct_answer) {
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
        { shouldBorderColorChange
          && (
            <button
              type="button"
              onClick={ this.handleNextQuestion }
              data-testid="btn-next"
            >
              Próxima
            </button>) }
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
