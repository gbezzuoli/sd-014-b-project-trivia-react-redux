import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GoRankingButton extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    return (
      <button
        type="button"
        data-testid="btn-ranking"
        onClick={ this.handleClick }
      >
        Ranking
      </button>
    );
  }
}

GoRankingButton.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default GoRankingButton;
