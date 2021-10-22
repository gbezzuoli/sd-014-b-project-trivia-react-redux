import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Buttons extends Component {
  render() {
    const { text, dataTestid, id, disabled, onClick } = this.props;
    return (
      <button
        type="button"
        data-testid={ dataTestid }
        id={ id }
        disabled={ disabled }
        onClick={ onClick }
      >
        {text}
      </button>
    );
  }
}

Buttons.propTypes = {
  text: PropTypes.string.isRequired,
  dataTestid: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

Buttons.defaultProps = {
  onClick: '',
  disabled: false,
};
