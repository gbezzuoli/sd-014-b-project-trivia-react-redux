import React from 'react';

class CardGame extends React.Component {
  render() {
    const { index, onClick, questions } = this.props;
    return (
      <div>
        <h2 data-testid="question-category">
          { questions[index].category}
        </h2>
        <h3 data-testid="question-text">
          { questions[index].question }
        </h3>
        <button
          type="button"
          data-testid="correct-answer"
          onClick={ onClick }
        >
          {questions[index].correct_answer }
        </button>
        {
          questions[index].incorrect_answers
            .map((question) => (
              <button
                key={ index }
                type="button"
                data-testid={ `wrong-answer-${index}` }
                onClick={ onClick }
              >
                { question }
              </button>))
        }
      </div>
    );
  }
}

export default CardGame;
