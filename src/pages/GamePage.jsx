import React, { Component } from 'react';
// import Question from '../components/Question';
import requestQuestions from '../services/requestQuestions';

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
    this.setBtnAnswerBorder();
  }

  setBtnAnswerBorder() {
    const btn = document.querySelectorAll('.btn-answer');
    console.log(btn);
    btn.forEach((element) => {
      element.setAttribute('style', 'border: 3px solid rgb(255, 0, 0)');
      console.log(element);
    });
    const btnCorrect = document.querySelector('.correct-answer');
    btnCorrect.setAttribute('style', 'border: 3px solid rgb(6, 240, 15)');
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
        <section>
          <h1 data-testid="question-category">Categoria</h1>
          <h2 data-testid="question-text">
            {' '}
            {questionOne}
          </h2>
          {wrongAnswersOne.map((item, index) => (
            <div key={ index }>
              <button
                className="btn-answer"
                type="button"
                data-testid={ idWrongAns + index }
                onClick={ this.onClickAnswer }
              >
                {item}
              </button>
            </div>))}
          <button
            className="correct-answer"
            onClick={ this.setBtnAnswerBorder }
            type="button"
            data-testid="correct-answer"
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
