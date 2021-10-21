import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import requestTrivia from '../services/trivia';
import { addResultsToState } from '../Redux/actions';
import getQuestions from '../services/getQuestions';
import Button from './Button';

class Trivia extends Component {
  constructor() {
    super();

    this.getTriviaGame = this.getTriviaGame.bind(this);
    this.dispatchQuestionsToState = this.dispatchQuestionsToState.bind(this);
    this.createAnswerButtons = this.createAnswerButtons.bind(this);

    this.state = {
      results: [],
      actualQuestion: 0,
    };
  }

  componentDidMount() {
    this.getTriviaGame();
  }

  async getTriviaGame() {
    const { token } = this.props;
    const response = await requestTrivia(token);
    this.setState({
      results: [...response.results],
    }, () => this.dispatchQuestionsToState());
  }

  dispatchQuestionsToState() {
    const { dispatchResultsToState } = this.props;
    const { results } = this.state;
    dispatchResultsToState(results);
  }

  createAnswerButtons() {
    const { results, actualQuestion } = this.state;
    const questionsList = getQuestions(results[actualQuestion]).sort(() => Math.random() - 0.5);

    const buttonsList = questionsList
      .map((question, index) => (question !== results[actualQuestion]
        ? (
          <Button
            key={ index }
            textButton={ question }
            className="wrong-answer"
            dataTestId={ `wrong-answer-${index}` }
          />)
        : (
          <Button
            key={ index }
            textButton={ question }
            className="correct-answer"
            dataTestId="correct-answer"
          />)));
    return buttonsList;
  }

  render() {
    const { results } = this.state;
    return (
      <div>
        <span data-testid="question-category">Categoria</span>
        <p data-testid="question-text">Texto da pergunta</p>
        { results.length > 0 && this.createAnswerButtons() }
      </div>
    );
  }
}

Trivia.propTypes = {
  dispatchResultsToState: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.player.token,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchResultsToState: (results) => dispatch(addResultsToState(results)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
