import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Alternative extends Component {
  render() {
    const { alternative } = this.props;
    return (
      <button type="button">
        { alternative }
      </button>
    );
  }
}

Alternative.propTypes = {
  alternative: PropTypes.string.isRequired,
};

export default Alternative;
