import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FaCog } from 'react-icons/fa';
import '../pages/LoginPage.css';

class ButtonConfig extends Component {
  render() {
    const { redirectConfig } = this.props;
    return (
      <button
        className="btn-settings"
        data-testid="btn-settings"
        type="button"
        onClick={ redirectConfig }
      >
        <FaCog />
      </button>
    );
  }
}

ButtonConfig.propTypes = {
  redirectConfig: PropTypes.func.isRequired,
};

export default ButtonConfig;
