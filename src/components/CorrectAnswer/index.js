import PropTypes from 'prop-types';
import React from 'react';

import '../Answers.css';

class CorrectAnswer extends React.Component {
  render() {
    const { correct, clickAnswer, borderColor } = this.props;
    return (
      <div>
        <button
          type="button"
          id="correct"
          className={ borderColor }
          data-testid="correct-answer"
          onClick={ clickAnswer }
        >
          { correct }
        </button>
      </div>
    );
  }
}

CorrectAnswer.propTypes = {
  borderColor: PropTypes.string.isRequired,
  clickAnswer: PropTypes.func.isRequired,
  correct: PropTypes.string.isRequired,
};

export default CorrectAnswer;
