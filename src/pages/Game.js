import React, { Component } from 'react';
import GameCard from '../components/GameCard';
import Header from '../components/Header';

class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <GameCard />
      </div>
    );
  }
}

export default Game;
