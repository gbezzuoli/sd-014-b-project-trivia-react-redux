import React, { Component } from 'react';
import { connect } from 'react-redux';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      trivia: [],
      fetchTrue: false,
      idx: 0,
    };

    this.requestTriviaGameAPI = this.requestTriviaGameAPI.bind(this);
    this.renderCardQuestion = this.renderCardQuestion.bind(this);
  }

  componentDidMount() {
    this.requestTriviaGameAPI();
  }

  async requestTriviaGameAPI() {
    const token = '343d7b7db31c32d502a054432ddc098fe25c482245e34352fd643b5baff21889';
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const jsonResponse = await response.json();
    this.setState({
      trivia: jsonResponse.results,
      fetchTrue: true,
    });
  }

  renderCardQuestion() {
    const { trivia, idx } = this.state;

    const correctAnswer = ([
      <button type="button" data-testid="correct-answer" key="">
        { trivia[idx].correct_answer }
      </button>]);
    const incorrctAnswers = trivia[idx].incorrect_answers.map((answer, index) => (
      <button type="button" data-testid={ `wrong-answer-${index}` } key={ index }>
        { answer }
      </button>
    ));

    const arrayQuestions = [...correctAnswer, ...incorrctAnswers];

    return (
      <>
        <p data-testid="question-category">{ trivia[idx].category }</p>
        <h3 data-testid="question-text">{ trivia[idx].question }</h3>
        {arrayQuestions.sort(() => Math.round(Math.random()) - 0.5)}
      </>
    );
  }

  render() {
    const { fetchTrue } = this.state;
    return (
      <div>

        {fetchTrue && this.renderCardQuestion()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.login.token,
});

export default connect(mapStateToProps)(Game);
