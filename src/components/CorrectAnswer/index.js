import PropTypes from 'prop-types';
import React from 'react';

class CorrectAnswer extends React.Component {
  render() {
    const { correct, clickAnswer } = this.props;
    return (
      <div>
        <button
          type="button"
          id="correct"
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
  clickAnswer: PropTypes.func.isRequired,
  correct: PropTypes.string.isRequired,
};

export default CorrectAnswer;
