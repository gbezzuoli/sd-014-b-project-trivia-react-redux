import PropTypes from 'prop-types';
import React from 'react';

class CardGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      incorrect: props.question.incorrect_answers,
      correct: props.question.correct_answer,
      answers: [],
      answerObjects: [],
    };

    this.setAnswer = this.setAnswer.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
  }

  componentDidMount() {
    this.setAnswer();
  }

  async setAnswer() {
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
    this.setState({
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

  render() {
    const { question: { category, question } } = this.props;
    const { answerObjects } = this.state;
    const randomAnswers = this.shuffleArray(answerObjects);
    let count = 0;

    return (
      <div>
        <h2>{ category }</h2>
        <h3>{ question }</h3>
        { randomAnswers.map((answerButton, index) => {
          if (answerButton.correct) {
            return (
              <button
                type="button"
                data-testid="correct-answer"
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
            >
              {answerButton.answer}
            </button>
          );
        }) }
        <div />
      </div>
    );
  }
}

export default CardGame;
