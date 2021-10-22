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
      questOne: [],
      wrongAnswersOne: [],
      rightAnswerOne: '',
      corr: '',
      incor: '',
      count: 30,
      answers: [],
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
        questOne: result[i].question,
        wrongAnswersOne: result[i].incorrect_answers,
        rightAnswerOne: result[i].correct_answer,
      });
    } catch (error) {
      console.log(error);
    }
    this.setBtnAnswerBorder();
  }

  setBtnAnswerBorder() {
    const { i } = this.state;
    this.setState({
      incor: 'btn-answer',
      corr: 'correct-answer',
    });
    this.setState({
      i: i + 1,
    }, () => this.nextQuestion());
  }

  async getQuestions() {
    const { i } = this.state;
    const result = await requestQuestions();

    this.setState({
      result,
      questOne: result[i].question,
      answers: [...result[i].incorrect_answers, result[i].correct_answer],
      wrongAnswersOne: result[i].incorrect_answers,
      rightAnswerOne: result[i].correct_answer,
    }, () => this.startCounter());
    this.randomAnswers();
  }

  nextQuestion() {
    const { i, result } = this.state;
    this.setState({
      questOne: result[i].question,
      answers: [...result[i].incorrect_answers, result[i].correct_answer],
      wrongAnswersOne: result[i].incorrect_answers,
      rightAnswerOne: result[i].correct_answer,
    });
  }

  randomAnswers() {
    const { answers } = this.state;
    const arraySplice = [...answers];
    const novoArray = [];

    answers.forEach(() => {
      const max = arraySplice.length;
      const randomNumber = Math.floor(Math.random() * (max - 0) + 0);
      const item = arraySplice.splice(randomNumber, 1)[0];
      novoArray.push(item);
    });
    console.log(novoArray);
  }

  startCounter() {
    const ONE_SECOND = 1000;
    this.countInterval = setInterval(() => {
      this.setState((state) => ({
        count: state.count - 1,
      }));
    }, ONE_SECOND);
  }

  render() {
    const { questOne, wrongAnswersOne, rightAnswerOne, corr, incor, count } = this.state;
    const idWrongAns = 'wrong-answer-';

    if (questOne === []) {
      return null;
    }
    return (
      <div>
        <Header />
        <section>
          <h1 data-testid="question-category">Categoria</h1>
          <h2 data-testid="question-text">
            {' '}
            {questOne}
          </h2>
          <h2>{ count }</h2>
          {wrongAnswersOne.map((item, index) => (
            <div key={ index }>
              <button
                className={ incor }
                type="button"
                data-testid={ idWrongAns + index }
                onClick={ this.setBtnAnswerBorder }
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
