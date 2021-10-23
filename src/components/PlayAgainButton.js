import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PlayAgainButton extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClick }
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

PlayAgainButton.propTypes = {
  history: PropTypes.arrayOf(Object).isRequired,
};

export default PlayAgainButton;
