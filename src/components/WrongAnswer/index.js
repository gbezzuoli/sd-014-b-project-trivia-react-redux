import PropTypes from 'prop-types';
import React from 'react';

import '../Answers.css';

class WrongAnswer extends React.Component {
  render() {
    const { incorrect, key, clickAnswer, borderColor } = this.props;
    return (
      <div>
        <button
          type="button"
          id="incorrect"
          className={ borderColor }
          data-testid={ `wrong-answer-${key}` }
          onClick={ clickAnswer }
        >
          { incorrect }
        </button>
      </div>
    );
  }
}

WrongAnswer.propTypes = {
  borderColor: PropTypes.string.isRequired,
  clickAnswer: PropTypes.func.isRequired,
  incorrect: PropTypes.string.isRequired,
  key: PropTypes.number.isRequired,
};

export default WrongAnswer;
