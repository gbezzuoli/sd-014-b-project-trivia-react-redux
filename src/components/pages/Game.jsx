import React, { Component } from 'react';
import { requestTriviaApi } from '../../services/Api';
import './Game.css';
import Timer from '../Timer';

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      disable: false,
      questions: {
        results: [
          {
            category: 'question-category',
            type: '',
            difficulty: '',
            question: 'question-text',
            correct_answer: '',
            incorrect_answers: [],
          },
        ],
      },
      index: 0,
    };
    this.setQuestionState = this.setQuestionState.bind(this);
    this.sortArray = this.sortArray.bind(this);
    this.printQuestions = this.printQuestions.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.changeBorderColor = this.changeBorderColor.bind(this);
  }

  async componentDidMount() {
    const timeOut = 30000;
    const questions = await requestTriviaApi();
    this.setQuestionState(questions);
    setTimeout(() => this.setState({ disable: true }), timeOut);
  }

  setQuestionState(questions) { return this.setState({ questions }); }

  sortArray(array) {
    const fiftyPercent = 0.5;
    return array.sort(() => Math.random() - fiftyPercent);
  }

  printQuestions(correctAnswer, incorrectAnswers, type, disable) {
    const { renderButton, sortArray } = this;
    if (type === 'multiple') {
      const array = [...incorrectAnswers, correctAnswer];
      const WrongAnswers = 3;

      const arrayWithDataTest = array.map((anwser, index) => {
        const dataTest = index < WrongAnswers
          ? `wrong-answer-${index}` : 'correct-answer';
        return (renderButton(dataTest, index, anwser, disable));
      });

      return sortArray(arrayWithDataTest);
    }

    const array = [incorrectAnswers, correctAnswer];
    const arrayWithDataTest = array.map((anwser, index) => {
      if (index === 0) {
        return (renderButton(`wrong-answer-${index}`, index, anwser, disable));
      }
      return (renderButton('correct-answer', index, anwser, disable));
    });
    return sortArray(arrayWithDataTest);
  }

  changeBorderColor() {
    this.setState({
      disable: true,
    });
  }

  renderButton(dataTest, index, anwser, disable) {
    const sliceNumber1 = 0;
    const sliceNumbe2 = 5;
    return (
      <button
        type="button"
        data-testid={ dataTest }
        key={ index }
        className={ dataTest.slice(sliceNumber1, sliceNumbe2) }
        disabled={ disable }
        onClick={ this.changeBorderColor }
      >
        {anwser}
      </button>);
  }

  render() {
    const { questions: { results }, index, disable } = this.state;
    const {
      category,
      type,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = results[index];
    return (
      <main>
        <Timer />
        <div id="buttonId">
          <h6 data-testid="question-category">{category}</h6>
          <p data-testid="question-text">{question}</p>
        </div>
        <div>
          {this.printQuestions(correctAnswer, incorrectAnswers, type, disable)}
        </div>
      </main>
    );
  }
}
