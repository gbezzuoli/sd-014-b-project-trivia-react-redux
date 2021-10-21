import PropTypes from 'prop-types';
import React from 'react';

class WrongAnswer extends React.Component {
  render() {
    const { incorrect, key, clickAnswer } = this.props;
    return (
      <div>
        <button
          type="button"
          id="incorrect"
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
  clickAnswer: PropTypes.func.isRequired,
  incorrect: PropTypes.string.isRequired,
  key: PropTypes.number.isRequired,
};

export default WrongAnswer;
