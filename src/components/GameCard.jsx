import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import parse from 'html-react-parser'; // soluciona caracteres estranhos na resposta da API
import { Redirect } from 'react-router';
import { getId } from '../services/triviaAPI';
// import FeedbackText from './FeedbackText';
import Loading from './Loading';

const LAST_QUESTION = 5;

class GameCard extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      loading: true,
    };

    this.getQuestionsFromApi = this.getQuestionsFromApi.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
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

    // const { questions } = this.state;
    // const { dispatchQuestions } = this.props;
    // dispatchQuestions(questions);
  }

  renderAnswers() {
    const { questions } = this.state;
    const { index } = this.props;
    const correctAnswer = questions[index].correct_answer;
    const incorrectAnswer = questions[index].incorrect_answers;
    if (index < LAST_QUESTION) {
      return (
        <div>
          <button type="button" data-testid="correct-answer">
            {parse(correctAnswer)}
          </button>
          {
            incorrectAnswer.map((answer, key) => (
              <button type="button" key={ key } data-testid={ `wrong-answer-${key}` }>
                {parse(answer)}
              </button>
            ))
          }
        </div>
      );
    }
  }

  renderQuestion() {
    const { index } = this.props;
    const { questions } = this.state;
    console.log(index);
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
