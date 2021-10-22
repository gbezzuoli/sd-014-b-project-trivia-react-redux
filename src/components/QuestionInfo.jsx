import PropTypes from 'prop-types';
import React from 'react';

class QuestionInfo extends React.Component {
  render() {
    const { apiResult, questionIndex } = this.props;
    return (
      <div className="question-info">
        <h3
          data-testid="question-category"
          className="question-category"
        >
          { apiResult[questionIndex].category }
        </h3>
        <p
          data-testid="question-text"
          className="question-text"
        >
          { apiResult[questionIndex].question }
        </p>
      </div>
    );
  }
}

QuestionInfo.propTypes = {
  apiResult: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
  questionIndex: PropTypes.number.isRequired,
};

export default QuestionInfo;
