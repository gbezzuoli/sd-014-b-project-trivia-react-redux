import PropTypes from 'prop-types';
import React from 'react';

import '../Answers.css';

class WrongAnswer extends React.Component {
  render() {
    const { incorrect, key, clickAnswer, borderColor, disabled } = this.props;
    return (
      <div>
        <button
          type="button"
          id="incorrect"
          className={ borderColor }
          data-testid={ `wrong-answer-${key}` }
          disabled={ disabled }
          onClick={ clickAnswer }
        >
          { incorrect }
        </button>
      </div>
    );
  }
}

WrongAnswer.propTypes = {
  disabled: PropTypes.bool.isRequired,
  borderColor: PropTypes.string.isRequired,
  clickAnswer: PropTypes.func.isRequired,
  incorrect: PropTypes.string.isRequired,
  key: PropTypes.number.isRequired,
};

export default WrongAnswer;
