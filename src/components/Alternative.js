import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Alternative extends Component {
  render() {
    const { alternative, testid, disabled } = this.props;
    return (
      <button type="button" data-testid={ testid } disabled={ disabled }>
        { alternative }
      </button>
    );
  }
}

Alternative.propTypes = {
  alternative: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Alternative;
