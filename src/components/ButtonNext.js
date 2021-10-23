import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ButtonNext extends Component {
  render() {
    const { handleClick } = this.props;
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ handleClick }
      >
        Proxima
      </button>
    );
  }
}

ButtonNext.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default ButtonNext;
