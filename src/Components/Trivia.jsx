import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import requestTrivia from '../services/trivia';
import { addResultsToState, addScore } from '../Redux/actions';
import getQuestions from '../services/getQuestions';
import Button from './Button';
import Timer from './Timer';

class Trivia extends Component {
  constructor() {
    super();

    this.getTriviaGame = this.getTriviaGame.bind(this);
    this.sumScore = this.sumScore.bind(this);
    this.createAnswerButtons = this.createAnswerButtons.bind(this);
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.handleCorrectAnswer = this.handleCorrectAnswer.bind(this);
    this.goToNextQuestion = this.goToNextQuestion.bind(this);
    this.sendScoreToLocalStorage = this.sendScoreToLocalStorage.bind(this);

    this.state = {
      results: [],
      actualQuestion: 0,
      endQuestion: false,
      clickCorrectAnswer: false,
      assertions: 0,
      endGame: false,
    };
  }

  componentDidMount() {
    this.getTriviaGame();
  }

  async getTriviaGame() {
    const { token, dispatchResultsToState } = this.props;
    const response = await requestTrivia(token);
    this.setState({ results: [...response.results] });
    dispatchResultsToState([...response.results]);
  }

  goToNextQuestion() {
    const { actualQuestion, results } = this.state;
    if (actualQuestion < results.length - 1) {
      this.setState((prevSt) => ({
        actualQuestion: prevSt.actualQuestion + 1,
        endQuestion: false,
        clickCorrectAnswer: false,
      }));
    } else { this.setState({ endGame: true }); }
  }

  handleAnswerClick() {
    this.setState({ endQuestion: true });
  }

  handleCorrectAnswer() {
    this.setState({ clickCorrectAnswer: true, endQuestion: true });
  }

  sendScoreToLocalStorage(score) {
    const { props: { name, gravatarEmail }, state: { assertions } } = this;
    const playerScore = {
      name,
      assertions: assertions + 1,
      score,
      gravatarEmail,
    };

    localStorage.setItem('state', JSON.stringify({ player: playerScore }));

    this.setState((prevSt) => ({ assertions: prevSt.assertions + 1 }));
  }

  sumScore(timer) {
    const { results, score, dispatchScore } = this.props;
    const { actualQuestion } = this.state;
    const { difficulty } = results[actualQuestion];
    let scoreSum = score;
    const TEN = 10;
    const HARD_NUM = 3;

    if (difficulty === 'hard') {
      scoreSum += TEN + (timer * HARD_NUM);
    }

    if (difficulty === 'medium') {
      scoreSum += TEN + (timer * 2);
    }

    if (difficulty === 'easy') {
      scoreSum += TEN + timer;
    }

    this.sendScoreToLocalStorage(scoreSum);
    dispatchScore(scoreSum);
  }

  createAnswerButtons() {
    const { results, actualQuestion, endQuestion } = this.state;
    const questionsList = getQuestions(results[actualQuestion]);

    return questionsList.map((question, index) => (
      question !== results[actualQuestion].correct_answer
        ? (
          <Button
            key={ index }
            textButton={ question }
            className="wrong-answer"
            dataTestId={ `wrong-answer-${index}` }
            onClick={ this.handleAnswerClick }
            disabled={ endQuestion }
          />)
        : (
          <Button
            key={ index }
            textButton={ question }
            className="correct-answer"
            dataTestId="correct-answer"
            onClick={ this.handleCorrectAnswer }
            disabled={ endQuestion }
          />)));
  }

  render() {
    const { results, actualQuestion, clickCorrectAnswer,
      endQuestion, endGame } = this.state;
    return (
      <section className="game-board">
        { endGame && <Redirect to="/feedbacks" /> }
        { results.length < 1
          ? <div className="loading">Carregando...</div>
          : (
            <>
              <Timer
                answerClick={ this.handleAnswerClick }
                clickCorrectAnswer={ clickCorrectAnswer }
                sumScore={ this.sumScore }
                endQuestion={ endQuestion }
              />
              <span data-testid="question-category">
                { results[actualQuestion].category }
              </span>
              <p data-testid="question-text">
                { results[actualQuestion].question }
              </p>
              { this.createAnswerButtons() }
              { endQuestion && (
                <Button
                  dataTestId="btn-next"
                  className="btn-next"
                  textButton={ actualQuestion > results.length - 2 ? 'Results'
                    : 'Next Question' }
                  onClick={ this.goToNextQuestion }
                />) }
            </>) }
      </section>
    );
  }
}

Trivia.propTypes = {
  dispatchResultsToState: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(PropTypes.shape({
    difficulty: PropTypes.string.isRequired,
  })).isRequired,
  dispatchScore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.player.token,
  score: state.player.score,
  results: state.game.results,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchResultsToState: (results) => dispatch(addResultsToState(results)),
  dispatchScore: (score) => dispatch(addScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
