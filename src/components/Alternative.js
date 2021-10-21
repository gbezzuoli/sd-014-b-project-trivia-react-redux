import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Alternative extends Component {
  render() {
    const { alternative, testid } = this.props;
    return (
      <button type="button" data-testid={ testid }>
        { alternative }
      </button>
    );
  }
}

Alternative.propTypes = {
  alternative: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
};

export default Alternative;
