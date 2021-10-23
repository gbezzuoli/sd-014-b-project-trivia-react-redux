import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GoHomeButton extends Component {
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
        <button type="button" data-testid="btn-go-home" onClick={ this.handleClick }>
          Jogar novamente
        </button>
      </div>
    );
  }
}

GoHomeButton.propTypes = {
  history: PropTypes.arrayOf(Object).isRequired,
};

export default GoHomeButton;
