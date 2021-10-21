import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Buttons extends Component {
  render() {
    const { path, text, dataTestid, id, disabled, onClick } = this.props;
    return (
      <Link to={ path }>
        <button
          type="button"
          data-testid={ dataTestid }
          id={ id }
          disabled={ disabled }
          onClick={ onClick }
        >
          {text}
        </button>
      </Link>
    );
  }
}

Buttons.propTypes = {
  path: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  dataTestid: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

Buttons.defaultProps = {
  onClick: '',
  disabled: false,
};
