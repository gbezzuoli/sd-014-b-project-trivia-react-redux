// https://flaviocopes.com/how-to-shuffle-array-javascript/
import React from 'react';
import PropTypes from 'prop-types';

class QuestionCard extends React.Component {
  constructor() {
    super();
    this.state = {
      answerList:
    }
  }
  
  listAnswersMultiple = () => {
    const incorrectAnswers = apiResult.incorrect_answers;
    const correctAnswer = apiResult.correct_answer;
    const answerList = [... correctAnswer, incorrectAnswers]
  }

  render() {
    const { questionText, answerList } = this.props;
    return (
      <section className="QuestionCard">
        <h3 className="question">{questionText}</h3>
        {answerList.map((question, index) => (
          <button type="button" key={ index } onClick={ this.submitAnswer }>
            { question }
          </button>
        ))}
      </section>
    );
  }
}

QuestionCard.propTypes = {
  questionText: PropTypes.string.isRequired,
  answerList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default QuestionCard;
