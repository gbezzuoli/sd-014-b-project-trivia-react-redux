import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import requestTrivia from '../services/trivia';
import { addResultsToState } from '../Redux/actions';
import getQuestions from '../services/getQuestions';
import Button from './Button';
import Timer from './Timer';

class Trivia extends Component {
  constructor() {
    super();

    this.getTriviaGame = this.getTriviaGame.bind(this);
    this.createAnswerButtons = this.createAnswerButtons.bind(this);
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.goToNextQuestion = this.goToNextQuestion.bind(this);

    this.state = {
      results: [],
      actualQuestion: 0,
      endQuestion: false,
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
    this.setState((prevSt) => ({
      actualQuestion: prevSt.actualQuestion + 1,
      endQuestion: false,
    }));
  }

  handleAnswerClick() {
    this.setState({ endQuestion: true });
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
            onClick={ this.handleAnswerClick }
            disabled={ endQuestion }
          />)));
  }

  render() {
    const { results, actualQuestion, endQuestion } = this.state;
    return (
      <section className="game-board">
        { results.length < 1
          ? <div className="loading">Carregando...</div>
          : (
            <>
              <Timer answerClick={ this.handleAnswerClick } />
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
                  textButton="Próxima Pergunta"
                  onClick={ this.goToNextQuestion }
                />) }
            </>) }
      </section>
    );
  }
}

Trivia.propTypes = {
  dispatchResultsToState: PropTypes.func.isRequired,
  token: PropTypes.string,
};

Trivia.defaultProps = {
  token: '',
};

const mapStateToProps = (state) => ({
  token: state.player.token,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchResultsToState: (results) => dispatch(addResultsToState(results)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
