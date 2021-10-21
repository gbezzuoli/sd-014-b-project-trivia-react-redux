import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { id, label, onClick } = this.props;
    return (
      <button
        data-testid={ id }
        type="button"
        onClick={ onClick }
      >
        { label }
      </button>
    );
  }
}

Button.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
