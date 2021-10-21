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
      counter: 5,
      i: 0,
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  componentDidUpdate() {
    const { counter } = this.state;
    if (counter === 0) {
      clearInterval(this.countInterval);
    }
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
    console.log(result);

    this.setState({
      result,
      questionOne: result[i].question,
      wrongAnswersOne: result[i].incorrect_answers,
      rightAnswerOne: result[i].correct_answer,
    }, () => this.startCounter());
  }

  startCounter() {
    const ONE_SECOND = 1000;
    this.countInterval = setInterval(() => {
      this.setState((state) => ({
        counter: state.counter - 1,
      }));
    }, ONE_SECOND);
  }

  render() {
    const {
      questionOne,
      wrongAnswersOne,
      rightAnswerOne,
      counter,
    } = this.state;
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
          <h2>{ counter }</h2>
          {wrongAnswersOne.map((item, index) => (
            <div key={ index }>
              <button
                type="button"
                data-testid={ idWrongAns + index }
                onClick={ this.onClickAnswer }
                disabled={ counter === 0 }
              >
                {item}
              </button>
            </div>))}
          <button
            onClick={ this.onClickAnswer }
            type="button"
            data-testid="correct-answer"
            disabled={ counter === 0 }
          >
            {rightAnswerOne}
          </button>
        </section>

      </div>
    );
  }
}

export default GamePage;
