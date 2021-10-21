import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ answer, id }) => (
  <button
    type="button"
    data-testid={ id }
  >
    { answer }
  </button>

);

Button.propTypes = {
  answer: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Button;
