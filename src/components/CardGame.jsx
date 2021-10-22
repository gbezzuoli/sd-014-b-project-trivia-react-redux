import PropTypes from 'prop-types';
import React from 'react';
import '../css/buttonCss.css';

class CardGame extends React.Component {
  constructor(props) {
    super(props);

    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.parseAnswerInObject = this.parseAnswerInObject.bind(this);
  }

  parseAnswerInObject() {
    const { question } = this.props;
    const answers = [question.correct_answer, ...question.incorrect_answers];
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
    const randomAnswers = this.shuffleArray(answersObjects);
    return randomAnswers;
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
        // this.setState({ hidden: false });
      } else if (brother.getAttribute('data-testid').includes('wrong-answer')) {
        brother.classList.add('wrong-answer');
        // this.setState({ hidden: false });
      }
    });
    // this.setState({ hidden: false });
  }

  render() {
    const { question: { category, question }, next, timer } = this.props;
    const randomAnswers = this.parseAnswerInObject();
    let count = 0;
    // const timer = Number(document.querySelector('#timer'));
    return (
      <div>
        <h2 data-testid="question-category">{ category }</h2>
        <h3 data-testid="question-text">{ question }</h3>
        {randomAnswers.map((answerButton, index) => {
          if (answerButton.correct) {
            return (
              <button
                type="button"
                data-testid="correct-answer"
                onClick={ this.handleAnswerClick }
                disabled={ timer === 0 }
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
          // style={ { display: hidden ? 'none' : 'inline-block' } }
          type="button"
          value="Proxima"
          onClick={ () => { next(); } }
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
