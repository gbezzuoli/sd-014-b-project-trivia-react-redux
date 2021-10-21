import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Buttons extends Component {
  render() {
    const { path, text } = this.props;
    return (
      <Link to={ path }>
        <button type="button">
          {text}
        </button>
      </Link>
    );
  }
}

Buttons.propTypes = {
  path: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
