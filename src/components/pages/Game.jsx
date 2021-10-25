import React, { Component } from 'react';
import { requestTriviaApi } from '../../services/Api';
import { printQuestions } from '../../services/gamefunctions';

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
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
  }

  async componentDidMount() {
    const questions = await requestTriviaApi();
    this.setQuestionState(questions);
  }

  setQuestionState(questions) { return this.setState({ questions }); }

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
          {printQuestions(correctAnswer, incorrectAnswers, type)}
        </div>
      </main>
    );
  }
}
