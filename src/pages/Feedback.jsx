import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  render() {
    const three = 3;
    const { avatar, name } = this.props;
    const { assertions, score } = JSON.parse(
      localStorage.getItem('state'),
    ).player;
    return (
      <div>
        <header>
          <img data-testid="header-profile-picture" src={ avatar } alt="" />
          <span data-testid="header-player-name">{name}</span>
          Pontos:
          <span data-testid="header-score">{score}</span>
        </header>
        {assertions <= three ? (
          <p data-testid="feedback-text">Podia ser melhor...</p>
        ) : (
          <p data-testid="feedback-text">Mandou Bem!</p>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
  avatar: state.user.avatar,
  isGameReady: state.game.isGameReady,
  playerScore: state.user.score,
});
Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};
export default connect(mapStateToProps)(Feedback);
