import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const {
      props: { id, answer, handleAnswersButton,
        shouldBorderColorChange, buttonBorderColor, difficulty },
    } = this;

    const color = shouldBorderColorChange ? buttonBorderColor : '0, 0, 0';

    return (
      <button
        type="button"
        data-testid={ id }
        style={ { border: `3px solid rgb(${color})` } }
        onClick={ () => handleAnswersButton(answer, difficulty) }
        className="answers"
        disabled={ shouldBorderColorChange }
      >
        { answer }
      </button>
    );
  }
}

Button.propTypes = {
  answer: PropTypes.string,
  id: PropTypes.string,
  borderColor: PropTypes.string,
  handleAnswersButton: PropTypes.func,
  shouldBorderColorChange: PropTypes.bool,
}.isRequired;

export default Button;
