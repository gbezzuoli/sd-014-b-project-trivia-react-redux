import React, { Component } from 'react';
import {requestTriviaApi} from '../../services/Api';

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
          }
        ]
      },
      index: 0,
    };
  }

  setQuestionState = (questions) => this.setState({questions});

  async componentDidMount () {
    const questions = await requestTriviaApi();
    this.setQuestionState(questions);
  }

  render() {
    const {questions: {results}, index} = this.state;
    console.log(results);
      const {category, type, difficulty, question, correct_answer, incorrect_answers} = results[index];
    return (
      <main>
        <div>
          <h6 data-testid="question-category">{category}</h6>
          <p data-testid="question-text">{question}</p>
        </div>
        <div>

        </div>
      </main>
    );
  }
}
