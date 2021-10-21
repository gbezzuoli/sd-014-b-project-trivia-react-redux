import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import fetchQuestions from '../services/FetchQuestions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: '',
    };
    this.requestAPI = this.requestAPI.bind(this);
    this.mapQuestions = this.mapQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.requestAPI();
  }

  handleClick() {
    console.log('oioi');
  }

  async requestAPI() {
    const { token } = this.props;
    const allQuestions = await fetchQuestions(token);
    this.setState({ questions: allQuestions.results });
  }

  mapQuestions(questions) {
    const mappedQuestions = questions.map((question, index1) => {
      const incorrectAnswers = question.incorrect_answers.map((alternative, index2) => (
        <button
          type="button"
          data-testid={ `wrong-answer-${index2}` }
          key={ index2 }
          onClick={ this.handleClick() }
        >
          {alternative}
        </button>
      ));
      const correctAnswer = (
        <button
          type="button"
          data-testid="correct-answer"
          key="4"
          onClick={ this.handleClick() }
        >
          { question.correct_answer }
        </button>
      );
      const alternatives = [...incorrectAnswers, correctAnswer];
      const metade = 0.5;
      const shuffledQuestions = alternatives.sort(() => metade - Math.random());
      return (
        <div key={ index1 }>
          <h5 data-testid="question-category">
            {`Categoria: ${question.category}`}
          </h5>
          <h3 data-testid="question-text">
            {`Pergunta: ${question.question}`}
          </h3>
          <h3 data-testid="question-text">
            { shuffledQuestions.map((e) => (e))}
          </h3>
        </div>
      );
    });
    return mappedQuestions;
  }

  render() {
    const { questions } = this.state;
    return (
      <div>
        <Header />
        <h1>TRIVIA</h1>
        {questions ? this.mapQuestions(questions) : <span>CARREGANDO</span>}
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
