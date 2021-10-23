import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../redux/actions/actions';
import Header from '../components/Header';
import GameCard from '../components/GameCard';
import Counter from '../components/Counter';

class Game extends Component {
  componentDidMount() {
    const { token, getQuestions } = this.props;
    getQuestions(token);
    localStorage.setItem('token', JSON.stringify(token));
  }

  render() {
    const { questions, isGameReady } = this.props;

    return (
      <>
        <Header />
        <hr />
        <main>
          {isGameReady && <GameCard question={ questions[0] } />}
          <Counter />
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  questions: state.game.questions,
  isGameReady: state.game.isGameReady,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(fetchQuestions(token)),
});

Game.propTypes = {
  token: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.any).isRequired,
  isGameReady: PropTypes.bool.isRequired,
  getQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
