import React, { Component } from 'react';
import Header from '../components/Header';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
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
    const { questions } = this.state;
    return (
      <div>
        <Header />
        <section>
          {questions.map((question, index) => {
            const allAnswers = [question.correct_answer, ...question.incorrect_answers];
            return (
              <div key={ index }>
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
                <hr />
              </div>
            );
          })}
        </section>
      </div>
    );
  }
}

export default Game;
