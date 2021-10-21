import React, { Component } from 'react';
import Header from '../components/Header';

const correctAnswer = 'correct-answer';
const wrongAnswer = 'wrong-answer';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      game: 0,
    };

    this.requestTriviaAPI = this.requestTriviaAPI.bind(this);
    this.changeColor = this.changeColor.bind(this);
  }

  componentDidMount() {
    const { requestTriviaAPI } = this;
    requestTriviaAPI();
  }

  changeColor() {
    const btn = document.querySelectorAll('button');
    console.log(btn);
    btn.forEach((button) => {
      if (button.value === correctAnswer) {
        button.style.border = '3px solid rgb(6, 240, 15)';
      }
      if (button.value === wrongAnswer) {
        button.style.border = '3px solid rgb(255, 0, 0)';
      }
    });
  }

  async requestTriviaAPI() {
    const TOKEN = localStorage.getItem('token');
    const URL = `https://opentdb.com/api.php?amount=5&token=${TOKEN}`;
    const request = await fetch(URL);
    const data = await request.json();
    this.setState({ questions: data.results });
  }

  render() {
    const { questions, game } = this.state;
    const { changeColor } = this;
    if (questions.length > 0) {
      const question = questions[game];
      const allAnswers = [question.correct_answer, ...question.incorrect_answers];
      return (
        <div>
          <Header />
          <div key={ game }>
            <p data-testid="question-category">{question.category}</p>
            <p data-testid="question-text">{question.question}</p>
            {allAnswers.sort().map((answer, answerIndex) => (
              <button
                type="button"
                key={ answerIndex }
                style={ {} }
                onClick={ () => changeColor() }
                value={ question.correct_answer === answer
                  ? correctAnswer : 'wrong-answer' }
                data-testid={
                  question.correct_answer === answer
                    ? correctAnswer : `wrong-answer-${answerIndex}`
                }
              >
                {answer}
              </button>))}
          </div>
        </div>
      );
    }
    return (
      <p>Loading...</p>
    );
  }
}

export default Game;
