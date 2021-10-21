import React from 'react';
import PropTypes from 'prop-types';

class QuestionCard extends React.Component {
  render() {
    const { questionText, answerList } = this.props;
    return (
      <section className="QuestionCard">
        <h3 className="question">{questionText}</h3>
        {answerList.map((question, index) => (
          <button type="button" key={ index }>
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
