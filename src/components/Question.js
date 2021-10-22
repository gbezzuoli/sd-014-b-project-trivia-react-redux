import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.mapQuestions = this.mapQuestions.bind(this);
  }

  mapQuestions() {
    const { questions, disable, timer } = this.props;
    const mappedQuestions = questions.map((question, index1) => {
      const incorrectAnswers = question.incorrect_answers.map((alternative, index2) => (
        <button
          type="button"
          disabled={ disable || timer === 0 }
          data-testid={ `wrong-answer-${index2}` }
          className="wrongButton"
          key={ index2 }
          onClick={ this.handleClick }
        >
          {alternative}
        </button>
      ));
      const correctAnswer = (
        <button
          type="button"
          disabled={ disable || timer === 0 }
          data-testid="correct-answer"
          className="correctButton"
          key="4"
          onClick={ this.handleClick }
        >
          { question.correct_answer }
        </button>
      );
      const alternatives = [...incorrectAnswers, correctAnswer];
      const metade = 0.5;
      const shuffledQuestions = alternatives.sort(() => metade - Math.random());
      return (
        <div key={ index1 }>
          <h5 data-testid="question-category">
            {`Categoria: ${question.category}`}
          </h5>
          <h3 data-testid="question-text">
            {`Pergunta: ${question.question}`}
          </h3>
          <h3 data-testid="question-text">
            { shuffledQuestions.map((e) => (e))}
          </h3>
        </div>
      );
    });
    return mappedQuestions;
  }

  render() {
    return (
      <div>
        {this.mapQuestions()}
      </div>
    );
  }
}

Question.propTypes = {
  disable: PropTypes.string.isRequired,
  timer: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.string).isRequired,
};
