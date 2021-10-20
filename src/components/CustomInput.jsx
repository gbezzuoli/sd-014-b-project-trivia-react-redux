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
  description: PropTypes.string,
  id: PropTypes.string,
};
