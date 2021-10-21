import React, { Component } from 'react';
import Header from '../components/Header';

class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <br />
        <span data-testid="question-category">Categoria</span>
        <span data-testid="question-text">Pergunta</span>
      </div>
    );
  }
}

export default Game;
