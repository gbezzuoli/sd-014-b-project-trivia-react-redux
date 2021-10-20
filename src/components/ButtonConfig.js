import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ButtonConfig extends Component {
  render() {
    const { redirectConfig } = this.props;
    return (
      <button
        data-testid="btn-settings"
        type="button"
        onClick={ redirectConfig }
      >
        Configurações
      </button>
    );
  }
}

ButtonConfig.propTypes = {
  redirectConfig: PropTypes.func.isRequired,
};

export default ButtonConfig;
