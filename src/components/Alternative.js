import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Alternative extends Component {
  render() {
    const { alternative, testid, name, handleClick } = this.props;
    return (
      <button
        className={ name }
        type="button"
        data-testid={ testid }
        name={ name }
        onClick={ handleClick }
      >
        {alternative}
      </button>
    );
  }
}

Alternative.propTypes = {
  alternative: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Alternative;
