import React, { Component } from 'react';

class Feedback extends Component {
  render() {
    return (
      <header>
        <img href="" alt="profilePicture" data-testid="header-profile-picture" />
        <h2 data-testid="header-player-name">Player name</h2>
        <p data-test-id="header-score">Placar</p>
      </header>
    );
  }
}

export default Feedback;
