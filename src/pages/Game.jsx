import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAvatar, fetchQuestions } from '../redux/actions/actions';
import GameCard from '../components/GameCard';

class Game extends Component {
  componentDidMount() {
    const { email, token, getAvatar, getQuestions } = this.props;
    getAvatar(email);
    getQuestions(token);
  }

  render() {
    const { name, avatar, questions, loading } = this.props;

    return (
      <>
        <header>
          <img data-testid="header-profile-picture" src={ avatar } alt="" />
          <span data-testid="header-player-name">{name}</span>
          <span data-testid="header-score">{`Pontos: ${0}`}</span>
        </header>
        <hr />
        <main>{!loading && <GameCard question={ questions[0] } />}</main>
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
  loading: state.game.loading,
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
  loading: PropTypes.bool.isRequired,
  getAvatar: PropTypes.func.isRequired,
  getQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
