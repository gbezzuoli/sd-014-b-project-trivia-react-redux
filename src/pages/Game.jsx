// Referência para implementação da Contagem Regressiva: Zhiyue Yi
// src: https://dev.to/zhiyueyi/how-to-create-a-simple-react-countdown-timer-4mc3

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAvatar, fetchQuestions } from '../redux/actions/actions';
import GameCard from '../components/GameCard';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 30,
    };
    this.setCounter = this.setCounter.bind(this);
  }

  componentDidMount() {
    const { email, token, getAvatar, getQuestions } = this.props;
    getAvatar(email);
    getQuestions(token);
    localStorage.setItem('token', JSON.stringify(token));
  }

  componentDidUpdate() {
    const { counter } = this.state;
    const ONE_SECOND = 1000;
    return (
      counter > 0 && setTimeout(() => this.setCounter(counter - 1), ONE_SECOND)
    );
  }

  setCounter(value) {
    this.setState({ counter: value });
  }

  render() {
    const { name, avatar, questions, isGameReady, playerScore } = this.props;
    const { counter } = this.state;
    return (
      <>
        <header>
          <img data-testid="header-profile-picture" src={ avatar } alt="" />
          <span data-testid="header-player-name">{name}</span>
          <span data-testid="header-score">{`Pontos: ${playerScore}`}</span>
        </header>
        <hr />
        <main>
          {!isGameReady && <GameCard question={ questions[0] } />}
          <div>{`Tempo Restante: ${counter}`}</div>
          <button type="button" onClick={ this.setPlayer }>Entrar</button>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
  avatar: state.user.avatar,
  token: state.user.token,
  questions: state.game.questions,
  isGameReady: state.game.isGameReady,
  playerScore: state.user.score,
});

const mapDispatchToProps = (dispatch) => ({
  getAvatar: (email) => dispatch(fetchAvatar(email)),
  getQuestions: (token) => dispatch(fetchQuestions(token)),
});

Game.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.any).isRequired,
  isGameReady: PropTypes.bool.isRequired,
  getAvatar: PropTypes.func.isRequired,
  getQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
