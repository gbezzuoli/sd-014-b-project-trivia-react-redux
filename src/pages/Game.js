import React, { Component } from 'react';
import { Switch } from 'react-router';
import Header from '../components/Header';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      game: 0,
    };

    this.requestTriviaAPI = this.requestTriviaAPI.bind(this);
  }

  componentDidMount() {
    const { requestTriviaAPI } = this;
    requestTriviaAPI();
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
                    data-testid={
                      question.correct_answer === answer
                      ? 'correct-answer' : `wrong-answer-${answerIndex}`
                    }
                  >
                    {answer}
                  </button>))}
          </div>
        </div>
      );
    }
    return(
      <p>Loading...</p>
    )
  }
}

export default Game;
