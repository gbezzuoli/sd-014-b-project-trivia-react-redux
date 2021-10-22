import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class GameCard extends Component {
  constructor() {
    super();
    this.state = {
      nextAsk: false,
      changeAsk: 0,
    };
    this.showBtnNext = this.showBtnNext.bind(this);
    this.showNextAsk = this.showNextAsk.bind(this);
  }

  showBtnNext() {
    this.setState({
      nextAsk: true,
    });
  }

  showNextAsk() {
    this.setState((state) => ({
      changeAsk: state.changeAsk + 1,
      nextAsk: false,
    }));
  }

  render() {
    const { nextAsk, changeAsk } = this.state;
    const { question } = this.props;
    const RANDOM = 5;
    const correct = (
      <button data-testid="correct-answer" type="button" onClick={ this.showBtnNext }>
        {question[changeAsk].correct_answer}
      </button>
    );
    const incorrects = question[changeAsk].incorrect_answers.map((element, index) => (
      <button
        data-testid={ `wrong-answer-${index}` }
        type="button"
        key={ element }
        onClick={ this.showBtnNext }
      >
        {element}
      </button>
    ));
    const answers = [correct, ...incorrects].sort(() => Math.random() - RANDOM);
    const options = answers.map((answer) => <li key={ answer }>{answer}</li>);
    const buttonNext = (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ this.showNextAsk }
      >
        Próxima
      </button>);

    return (
      <div>
        <p data-testid="question-category">{question[changeAsk].category}</p>
        <h1 data-testid="question-text">{question[changeAsk].question}</h1>
        <ul>{options}</ul>
        {nextAsk
           && buttonNext}
      </div>
    );
  }
}

GameCard.propTypes = {
  question: PropTypes.objectOf(PropTypes.any).isRequired,
};
