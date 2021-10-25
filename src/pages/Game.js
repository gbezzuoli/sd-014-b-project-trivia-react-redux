import React, { Component } from 'react';
import Header from '../components/Header';
import QuestionsTrivia from '../components/QuestionsTrivia';

export default class Game extends Component {
  render() {
    return (
      <div>
        <QuestionsTrivia />
        <Header />
        Pagina Game
      </div>
    );
  }
}
