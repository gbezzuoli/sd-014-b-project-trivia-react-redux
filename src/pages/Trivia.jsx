import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Trivia extends Component {
  render() {
    const { gameState: { isFetching, questions } } = this.props;
    console.log(questions);

    return (
      isFetching
        ? <h2>Carregando...</h2>
        : questions.map(({ question }, index) => <p key={ index }>{question}</p>)
    );
  }
}

function mapStateToProps(state) {
  return {
    gameState: state.game,
  };
}

export default connect(mapStateToProps)(Trivia);
