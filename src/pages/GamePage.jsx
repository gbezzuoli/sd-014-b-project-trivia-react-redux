import React, { Component } from 'react';
// import Question from '../components/Question';
import requestQuestions from '../services/requestQuestions';
import Header from '../components/Header';

class GamePage extends Component {
  constructor() {
    super();
    this.getQuestions = this.getQuestions.bind(this);
    this.onClickAnswer = this.onClickAnswer.bind(this);

    this.state = {
      result: [],
      questionOne: [],
      wrongAnswersOne: [],
      rightAnswerOne: '',
      i: 0,
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  onClickAnswer() {
    const { result } = this.state;
    let { i } = this.state;
    console.log(i);
    if (i === 0) {
      i += 1;
    }
    try {
      this.setState({
        i: i + 1,
        questionOne: result[i].question,
        wrongAnswersOne: result[i].incorrect_answers,
        rightAnswerOne: result[i].correct_answer,

      });
    } catch (error) {
      console.log(error);
    }
  }

  async getQuestions() {
    const { i } = this.state;
    const result = await requestQuestions();
    this.setState({
      result,
      questionOne: result[i].question,
      wrongAnswersOne: result[i].incorrect_answers,
      rightAnswerOne: result[i].correct_answer,
    });
  }

  render() {
    const { questionOne, wrongAnswersOne, rightAnswerOne } = this.state;
    const idWrongAns = 'wrong-answer-';

    if (questionOne === []) {
      return null;
    }
    return (
      <div>
        <Header />
        <section>
          <h1 data-testid="question-category">Categoria</h1>
          <h2 data-testid="question-text">
            {' '}
            {questionOne}
          </h2>
          {wrongAnswersOne.map((item, index) => (
            <div key={ index }>
              <button
                type="button"
                data-testid={ idWrongAns + index }
                onClick={ this.onClickAnswer }
              >
                {item}
              </button>
            </div>))}
          <button
            onClick={ this.onClickAnswer }
            type="button"
            data-testid="correct-answer"
          >
            {rightAnswerOne}
          </button>
        </section>

      </div>
    );
  }
}

export default GamePage;
