import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class GameCard extends Component {
  render() {
    const { question } = this.props;
    const RANDOM = 5;
    const correct = (
      <button data-testid="correct-answer" type="button">
        {question.correct_answer}
      </button>
    );
    const incorrects = question.incorrect_answers.map((element, index) => (
      <button data-testid={ `wrong-answer-${index}` } type="button" key={ element }>
        {element}
      </button>
    ));
    // fazer o sort com essa callback não é a melhor coisa do mundo
    const answers = [correct, ...incorrects].sort(() => Math.random() - RANDOM);
    const options = answers.map((answer) => <li key={ answer }>{answer}</li>);

    return (
      <div>
        <p data-testid="question-category">{question.category}</p>
        <h1 data-testid="question-text">{question.question}</h1>
        <ul>{options}</ul>
      </div>
    );
  }
}

GameCard.propTypes = {
  question: PropTypes.objectOf(PropTypes.any).isRequired,
};
