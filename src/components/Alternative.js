import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Alternative extends Component {
  render() {
    const { alternative, testid, name, handleClick, disabled, className } = this.props;
    return (
      <button
        className={ className }
        type="button"
        data-testid={ testid }
        name={ name }
        onClick={ handleClick }
        disabled={ disabled }
      >
        {alternative}
      </button>
    );
  }
}

Alternative.propTypes = {
  alternative: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

export default Alternative;
