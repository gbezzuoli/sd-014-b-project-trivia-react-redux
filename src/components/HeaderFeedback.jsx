import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HeaderFeedback extends Component {
  render() {
    const { getDataPlayer } = this.props;
    const { gravatarEmail, name, score } = getDataPlayer;
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${gravatarEmail}` }
          alt="Avatar do perfil"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  getDataPlayer: state.playerReducer,
});

HeaderFeedback.propTypes = {
  getDataPlayer: PropTypes.objectOf(PropTypes.shape({
    name: PropTypes.string,
    score: PropTypes.string,
    gravatarEmail: PropTypes.string,
  })).isRequired,
};

export default connect(mapStateToProps)(HeaderFeedback);
