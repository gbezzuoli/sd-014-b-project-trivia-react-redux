import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import fetchQuestions from '../services/FetchQuestions';

class Game extends Component {
  render() {
    const { token } = this.props;
    const questions = fetchQuestions(token);
    return (
      <div>
        <Header />
        <br />
        <span data-testid="question-category">Categorias</span>
        <span data-testid="question-text">Pergunta</span>
        {questions}
      </div>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.gameReducers.token,
});

export default connect(mapStateToProps, null)(Game);
