import PropTypes from 'prop-types';
import React from 'react';
import '../css/buttonCss.css';

class CardGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      incorrect: [],
      correct: '',
      answers: [],
      answerObjects: [],
    };

    this.setAnswer = this.setAnswer.bind(this);
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    // this.handleWrongClick = this.handleWrongClick.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
  }

  componentDidMount() {
    this.setAnswer();
  }

  async setAnswer() {
    const { question } = this.props;
    await this.setState({
      incorrect: question.incorrect_answers,
      correct: question.correct_answer,
    });

    const { incorrect, correct } = this.state;
    await this.setState({
      answers: [correct, ...incorrect],
    });

    const { answers } = this.state;

    const answersObjects = answers.map((answer, index) => {
      if (index === 0) {
        return {
          answer,
          correct: true,
        };
      }
      return {
        answer,
        correct: false,
      };
    });
    await this.setState({
      answerObjects: [...answersObjects],
    });
  }

  shuffleArray(array) {
    const arr = array;
    for (let index = arr.length - 1; index > 0; index -= 1) {
      const nextIndex = Math.floor(Math.random() * (index + 1));
      const temp = arr[index];
      arr[index] = arr[nextIndex];
      arr[nextIndex] = temp;
    }
    return arr;
  }

  handleAnswerClick() {
    const brothers = document.querySelectorAll('button');
    // getAttribute feito com base no stackoverflow
    brothers.forEach((brother) => {
      if (brother.getAttribute('data-testid') === 'correct-answer') {
        brother.classList.add('right-answer');
      } else if (brother.getAttribute('data-testid').includes('wrong-answer')) {
        brother.classList.add('wrong-answer');
      }
    });
  }

  render() {
    const { question: { category, question }, next } = this.props;
    const { answerObjects } = this.state;
    const randomAnswers = this.shuffleArray(answerObjects);
    let count = 0;

    return (
      <div>
        <h2 data-testid="question-category">{ category }</h2>
        <h3 data-testid="question-text">{ question }</h3>
        { randomAnswers.map((answerButton, index) => {
          if (answerButton.correct) {
            return (
              <button
                type="button"
                data-testid="correct-answer"
                onClick={ this.handleAnswerClick }
              >
                { answerButton.answer }
              </button>);
          }
          count += 1;
          return (
            <button
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${count - 1}` }
              onClick={ this.handleAnswerClick }
            >
              {answerButton.answer}
            </button>
          );
        }) }
        <input
          type="button"
          value="Proxima"
          onClick={ () => { this.setAnswer(); next(); } }
        />
        <div />
      </div>
    );
  }
}

CardGame.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.any),
  }).isRequired,
  next: PropTypes.func.isRequired,
};

export default CardGame;
