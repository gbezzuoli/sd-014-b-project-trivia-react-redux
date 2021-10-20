import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  render() {
    const { className, dataTestId, onClick, value, textButton, disabled } = this.props;
    return (
      <button
        type="button"
        className={ className }
        data-testid={ dataTestId }
        onClick={ onClick }
        value={ value }
        disabled={ disabled }
      >
        { textButton }
      </button>
    );
  }
}

Button.propTypes = {
  className: PropTypes.string,
  dataTestId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  textButton: PropTypes.string.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
  className: null,
  value: null,
};
