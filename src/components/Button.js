import React, { Component } from 'react';

import PropTypes from 'prop-types';

export class Button extends Component {
  render() {
    const { onClick, disabled, dataTestid } = this.props;
    const { text } = this.props;
    return (
      <button
        type="button"
        onClick={ onClick }
        disabled={ disabled }
        data-testid={ dataTestid }
      >
        {text}
      </button>
    );
  }
}

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.func,
}.isRequired;

export default Button;
