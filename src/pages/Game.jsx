import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Timer from '../components/Timer';
import { addScoreAction } from '../redux/actions/actions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      idx: 0,
      toggle: false,
      disabled: false,
      time: 0,
    };

    this.renderCardQuestion = this.renderCardQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.showResponseAfterTime = this.showResponseAfterTime.bind(this);
    this.addTime = this.addTime.bind(this);
    this.calculatorPoints = this.calculatorPoints.bind(this);
    this.handleLocalStorage = this.handleLocalStorage.bind(this);
  }

  addTime(time) {
    this.setState({
      time: time,
    });
  }

  handleClick({ target }) {
    this.setState({
      toggle: true,
      stopTimer: true,
    });
    this.calculatorPoints(target);
  }

  calculatorPoints(target) {
    const { time, idx } = this.state;
    const { trivia, addPoints, email } = this.props;
    const result = () => {
      switch (trivia[idx].difficulty) {
      case 'hard':
        return 10 + (time * 3);
      case 'medium':
        return 10 + (time * 2);
      case 'easy':
        return 10 + (time * 1);
      default:
        break;
      }
    };
    const player = JSON.parse(localStorage.getItem('player'));
    if (target.className === 'correct') {
      addPoints(result());
      this.handleLocalStorage(result(), target);
    } else {
      addPoints(0);
    }
  }

  handleLocalStorage(result, target) {
    const { name, email, score } = this.props;
    if (!localStorage.getItem('state')) {
      const player = {
        name,
        assertions: 0,
        score,
        gravatarEmail: email,
      };
      const state = {
        player,
      };
      localStorage.setItem('state', JSON.stringify(state));
    }
    if (target.className === 'correct') {
      const player = JSON.parse(localStorage.getItem('player'));
      const newPlayer = {
        name: player.name,
        assertions: player.assertions + 1,
        score: result,
        gravatarEmail: email,
      };
      const state = {
        player: newPlayer,
      };
      localStorage.setItem('state', JSON.stringify(state));
    }
  }

  showResponseAfterTime() {
    this.setState({
      toggle: true,
      stopTimer: true,
      disabled: true,
    });
  }

  renderCardQuestion() {
    const { idx, toggle, disabled } = this.state;
    const { trivia } = this.props;
    if (trivia !== []) {
      const correctAnswer = ([
        <button
          onClick={ this.handleClick }
          className={ toggle && 'correct' }
          type="button"
          data-testid="correct-answer"
          key=""
          disabled={ disabled }
        >
          { trivia[idx].correct_answer }
        </button>]);
      const incorrctAnswers = trivia[idx].incorrect_answers.map((answer, index) => (
        <button
          onClick={ this.handleClick }
          className={ toggle && 'incorrect' }
          type="button"
          data-testid={ `wrong-answer-${index}` }
          key={ index }
          disabled={ disabled }
        >
          { answer }
        </button>
      ));

      const arrayQuestions = [...correctAnswer, ...incorrctAnswers];
      const HALF = 0.5;
      return (
        <>
          <p data-testid="question-category">{ trivia[idx].category }</p>
          <h3 data-testid="question-text">{ trivia[idx].question }</h3>
          {arrayQuestions.sort(() => Math.round(Math.random()) - HALF)}
        </>
      );
    }
  }

  render() {
    const { stopTimer } = this.state;
    const { request } = this.props;
    return (
      <div>
        <Header />
        <Timer
          addTime={ this.addTime }
          stopTimer={ stopTimer }
          showResponseAfterTime={ this.showResponseAfterTime }
        />
        game
        { console.log(request)}
        {request && this.renderCardQuestion()}
      </div>
    );
  }
}

Game.propTypes = {
  request: PropTypes.bool.isRequired,
  trivia: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  trivia: state.login.triviaQuest.results,
  request: state.login.request,
  name: state.login.name,
  email: state.login.email,
  score: state.game.score,
});

const mapDispatchToProps = (dispatch) => ({
  addPoints: (score) => dispatch(addScoreAction(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
