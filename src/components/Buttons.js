import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../App.css';

export default class Buttons extends React.Component {
  render() {
    const { handleClick, validadeButton } = this.props;
    return (
      <div className="login-buttons">
        <button
          disabled={ !validadeButton } // retorna false caso ambos os campos estejam preenchidos
          type="button"
          data-testid="btn-play"
          onClick={ handleClick }
        >
          <Link to="/game">Jogar </Link>
        </button>
        <button
          type="button"
          data-testid="btn-settings"
        >
          <Link to="/settings" className="config-link">Configurações</Link>
        </button>
      </div>
    );
  }
}

Buttons.propTypes = {
  validadeButton: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};
