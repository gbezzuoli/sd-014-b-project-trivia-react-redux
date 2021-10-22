import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/game.css';
import { connect } from 'react-redux';
import { score } from '../redux/actions/actions';

class GameCard extends Component {
  constructor() {
    super();
    this.state = {
      correctColor: '',
      wrongColor: '',
    };
    this.onClickColorCorrect = this.onClickColorCorrect.bind(this);
    this.onClickColorIncorrect = this.onClickColorIncorrect.bind(this);
  }

  onClickColorCorrect(difficulty) {
    const { getScore } = this.props;
    this.setState({
      correctColor: 'correctColor',
      wrongColor: 'wrongColor',
    });
    const dez = 10;
    let total = 0;
    const HARD = 3;
    const MEDIUM = 2;
    const timer = 1;

    if (difficulty === 'hard') {
      total += dez + (timer * HARD);
    }

    if (difficulty === 'medium') {
      total += dez + (timer * MEDIUM);
    }

    if (difficulty === 'easy') {
      total += dez + timer;
    }
    getScore(total);
  }

  onClickColorIncorrect() {
    this.setState({
      correctColor: 'correctColor',
      wrongColor: 'wrongColor',
    });
    console.log('ERRADO');
  }

  render() {
    const { correctColor, wrongColor } = this.state;
    const { question } = this.props;
    const RANDOM = 5;
    const correct = (
      <button
        onClick={ () => this.onClickColorCorrect(question.difficulty) }
        data-testid="correct-answer"
        type="button"
        id="correct"
        className={ correctColor }
      >
        {question.correct_answer}
      </button>
    );
    const incorrects = question.incorrect_answers.map((element, index) => (
      <button
        onClick={ this.onClickColorIncorrect }
        data-testid={ `wrong-answer-${index}` }
        type="button"
        id="answer"
        key={ element }
        className={ wrongColor }
      >
        {element}
      </button>
    ));
    // fazer o sort com essa callback não é a melhor coisa do mundo
    const answers = [correct, ...incorrects].sort(() => Math.random() - RANDOM);
    console.log(answers);
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

function mapDispatchToProps(dispatch) {
  return {
    getScore: (playerScore) => dispatch(score(playerScore)),
  };
}

export default connect(null, mapDispatchToProps)(GameCard);
