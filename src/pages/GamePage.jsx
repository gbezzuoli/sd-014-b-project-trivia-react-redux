import React, { Component } from 'react';
// import Question from '../components/Question';
import requestQuestions from '../services/requestQuestions';
import Header from '../components/Header';

class GamePage extends Component {
  constructor() {
    super();
    this.getQuestions = this.getQuestions.bind(this);
    this.onClickAnswer = this.onClickAnswer.bind(this);
    this.setBtnAnswerBorder = this.setBtnAnswerBorder.bind(this);

    this.state = {
      result: [],
      questionOne: [],
      wrongAnswersOne: [],
      rightAnswerOne: '',
      corr: '',
      incor: '',
      count: 5,
      i: 0,
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  componentDidUpdate() {
    const { count } = this.state;
    if (count === 0) {
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
    this.setBtnAnswerBorder();
  }

  setBtnAnswerBorder() {
    this.setState({
      incor: 'btn-answer',
      corr: 'correct-answer',
    });
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
        count: state.counter - 1,
      }));
    }, ONE_SECOND);
  }

  render() {
    const { questionOne, wrongAnswersOne, rightAnswerOne, corr, incor, count } = this.state;
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
                className={ incor }
                type="button"
                data-testid={ idWrongAns + index }
                onClick={ this.onClickAnswer }
                disabled={ count === 0 }
              >
                {item}
              </button>
            </div>))}
          <button
            className={ corr }
            onClick={ this.setBtnAnswerBorder }
            type="button"
            data-testid="correct-answer"
            disabled={ count === 0 }
          >
            {rightAnswerOne}
          </button>
          <br />
          <button
            type="button"
            onClick={ this.onClickAnswer }
          >
            Próximo
          </button>
        </section>

      </div>
    );
  }
}

export default GamePage;
