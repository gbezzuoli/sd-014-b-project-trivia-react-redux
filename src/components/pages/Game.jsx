import React, { Component } from 'react';
import { requestTriviaApi } from '../../services/Api';

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: {
        results: [
          {
            category: '',
            type: '',
            difficulty: '',
            question: '',
            correct_answer: '',
            incorrect_answers: '',
          },
        ],
      },
      index: 0,
    };
    this.setQuestionState = this.setQuestionState.bind(this);
    this.sortArray = this.sortArray.bind(this);
    this.printQuestions = this.printQuestions.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  async componentDidMount() {
    const questions = await requestTriviaApi();
    this.setQuestionState(questions);
  }

  setQuestionState(questions) { return this.setState({ questions }); }

  sortArray(array) {
    const fiftyPercent = 0.5;
    return array.sort(() => Math.random() - fiftyPercent);
  }

  printQuestions(correctAnswer, incorrectAnswers, type) {
    const { renderButton, sortArray } = this;
    if (type === 'multiple') {
      const array = [...incorrectAnswers, correctAnswer];
      const WrongAnswers = 3;
      const arrayWithDataTest = array.map((anwser, index) => {
        const dataTest = index < WrongAnswers
          ? `wrong-answer-${index}` : 'correct-answer';
        return (renderButton(dataTest, index, anwser));
      });
      return sortArray(arrayWithDataTest);
    }
    const array = [incorrectAnswers, correctAnswer];
    const arrayWithDataTest = array.map((anwser, index) => {
      if (index === 0) {
        return (renderButton(`wrong-answer-${index}`, index, anwser));
      }
      return (renderButton('correct-answer', index, anwser));
    });
    return sortArray(arrayWithDataTest);
  }

  renderButton(dataTest, index, anwser) {
    return (
      <button
        type="button"
        data-testId={ dataTest }
        key={ index }
        className={ dataTest }
      >
        {anwser}
      </button>);
  }

  render() {
    const { questions: { results }, index } = this.state;
    console.log(results);
    const {
      category,
      type,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = results[index];
    return (
      <main>
        <div>
          <h6 data-testid="question-category">{category}</h6>
          <p data-testid="question-text">{question}</p>
        </div>
        <div>
          {this.printQuestions(correctAnswer, incorrectAnswers, type)}
        </div>
      </main>
    );
  }
}
