import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class CustomInput extends Component {
  render() {
    const { description, id, dataTestId, onChange } = this.props;
    return (
      <label htmlFor={ id }>
        {description}
        <input onChange={ onChange } data-testid={ dataTestId } name={ id } />
      </label>
    );
  }
}

CustomInput.propTypes = {
  dataTestId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
