import PropTypes from 'prop-types';
import React from 'react';

import '../Answers.css';

class CorrectAnswer extends React.Component {
  render() {
    const { correct, clickAnswer, borderColor, disabled, difficulty } = this.props;
    return (
      <div>
        <button
          type="button"
          id="correct"
          className={ borderColor }
          value={ difficulty }
          data-testid="correct-answer"
          disabled={ disabled }
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
  difficulty: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default CorrectAnswer;
