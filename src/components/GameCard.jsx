import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import parse from 'html-react-parser'; // soluciona caracteres estranhos na resposta da API
import { Redirect } from 'react-router';
import { getId } from '../services/triviaAPI';
// import FeedbackText from './FeedbackText';
import Loading from './Loading';
import './game.css';

const LAST_QUESTION = 5;

class GameCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
    };

    this.getQuestionsFromApi = this.getQuestionsFromApi.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
    this.checkedQuestions = this.checkedQuestions.bind(this);
  }

  componentDidMount() {
    this.getQuestionsFromApi();
  }

  async getQuestionsFromApi() {
    const token = localStorage.getItem('token');
    const response = await getId(token);
    const json = await response.json();

    this.setState({
      questions: json.results,
      loading: false,
    });
  }

  checkedQuestions() {
    const btns = document.querySelectorAll('button');
    btns.forEach((btn) => {
      if (btn.dataset.testid !== 'correct-answer') {
        return btn.classList.add('wrong');
      }
      return btn.classList.add('correct');
    });
  }

  renderAnswers() {
    const { questions } = this.state;
    const { index } = this.props;
    const correctAnswer = questions[index].correct_answer;
    const incorrectAnswer = questions[index].incorrect_answers;
    const btnCorrect = (
      <button
        type="button"
        data-testid="correct-answer"
        onClick={ this.checkedQuestions }
      >
        {parse(correctAnswer)}
      </button>
    );
    const btnIncorret = (
      incorrectAnswer.map((answer, key) => (
        <button
          type="button"
          key={ key }
          data-testid={ `wrong-answer-${key}` }
          onClick={ this.checkedQuestions }
        >
          {parse(answer)}
        </button>
      ))
    );
    const totalQuestions = [...btnIncorret, btnCorrect];
    if (index < LAST_QUESTION) {
      return (
        <div>
          {
            totalQuestions.sort().map((element, key) => (
              <p key={ key }>{ element }</p>
            ))
          }
        </div>
      );
    }
  }

  renderQuestion() {
    const { index } = this.props;
    const { questions } = this.state;
    if (index < LAST_QUESTION) {
      return (
        <div>
          <h1 data-testid="question-text">
            {`Question: ${parse(questions[index].question)}`}
          </h1>
          <h2 data-testid="question-category">
            {`Category:${parse(questions[index].category)}`}
          </h2>
        </div>
      );
    }
    return (<Redirect to="/feedback" />);
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return <Loading />;
    }
    return (
      <div>
        {this.renderQuestion()}
        {this.renderAnswers()}
      </div>
    );
  }
}

GameCard.propTypes = {
  index: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  index: state.questions.index,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps, null)(GameCard);
