import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import Trivia from '../Components/Trivia';
import '../styles/Game.css';

class Game extends Component {
  render() {
    return (
      <section>
        <Header />
        <Trivia />
      </section>
    );
  }
}

export default connect()(Game);
