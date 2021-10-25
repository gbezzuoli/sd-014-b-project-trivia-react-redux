import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';

const DEZ = 10;
const TRES = 3;
class Trivia extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      loading: false,
      change: false,
      timer: 30,
      disabled: false,
    };
    this.fetchTrivia = this.fetchTrivia.bind(this);
    this.content = this.content.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addBtnNextQuestion = this.addBtnNextQuestion.bind(this);
    this.onBtnNextQuestion = this.onBtnNextQuestion.bind(this);
  }

  componentDidMount() {
    this.fetchTrivia();
    const magicNumber = 1000;
    setInterval(() => this.setCronometer(), magicNumber);
    const { name, email, score, assertions } = this.props;
    localStorage.setItem('state', JSON.stringify({
      player: {
        name,
        score,
        gravatarEmail: email,
        assertions,
      } }));
  }

  onBtnNextQuestion() {
    const { name, email, score } = this.props;
    const locatStorageData = localStorage.getItem('state');
    console.log('aqui redux state', name, email, score);
    console.log('aqui Local storage', JSON.parse(locatStorageData));
    // proxima pergunta
  }

  setCronometer() {
    const { timer } = this.state;
    if (timer > 0) {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }
  }

  async fetchTrivia() {
    this.setState({ loading: true });
    const tokenLocalStorage = localStorage.getItem('token');
    const URL = `https://opentdb.com/api.php?amount=5&token=${tokenLocalStorage}`;
    const request = await fetch(URL);
    const response = await request.json();
    this.setState({
      questions: response,
      loading: false,
    });
  }

  handleClick(event) {
    const { player } = this.props;
    const { questions: { results }, timer } = this.state;
    this.setState({
      change: true,
      disabled: true,
    });
    const getItemPontos = JSON.parse(localStorage.getItem('state')).player.score;
    if (event.target.id === 'right') {
      if (results[0].difficulty === 'easy') {
        player.score = parseInt(getItemPontos, 10) + DEZ + (timer * 1);
        player.assertions += 1;
      } if (results[0].difficulty === 'medium') {
        player.score = parseInt(getItemPontos, 10) + DEZ + (timer * 2);
        player.assertions += 1;
      } if (results[0].difficulty === 'hard') {
        player.score = parseInt(getItemPontos, 10) + DEZ + (timer * TRES);
        player.assertions += 1;
      }
    }
    localStorage.setItem('state', JSON.stringify(player));
  }

  // npm run cy:open  // npm run cy
  addBtnNextQuestion() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ this.onBtnNextQuestion }
      >
        Próxima
      </button>
    );
  }

  content() {
    const { questions: { results }, change, timer, disabled } = this.state;
    const number = 0;
    // console.log(results);
    if (results !== undefined) {
      const rightQuestion = ([
        <button
          className={ change && 'green' }
          onClick={ this.handleClick }
          type="button"
          data-testid="correct-answer"
          key="right-question"
          id="right"
          disabled={ timer <= 0 || disabled }
        >
          { results[number].correct_answer }
        </button>,
      ]);
      const wrongQuestion = results[0].incorrect_answers.map((answer, index) => (
        <button
          className={ change && 'red' }
          onClick={ this.handleClick }
          type="button"
          data-testid={ `wrong-answer-${index}` }
          key={ index }
          id="wrong"
          disabled={ timer <= 0 || disabled }
        >
          { answer }
        </button>
      ));
      const allQuestions = [...rightQuestion, ...wrongQuestion];
      const pointFive = 0.5;
      return (
        <section>
          <Header />
          <p data-testid="question-category">
            { results[0].category }
          </p>
          <p data-testid="question-text">
            { results[0].question }
          </p>
          {allQuestions.sort(() => pointFive - Math.random())}
        </section>
      );
    }
  }

  render() {
    const { loading, timer, disabled } = this.state;
    const getItemPoints = JSON.parse(localStorage.getItem('state')).score;
    return (
      <section>
        {loading ? <Loading /> : this.content()}
        <p>{timer}</p>
        <p>{ getItemPoints }</p>
        { disabled ? this.addBtnNextQuestion() : null }
      </section>
    );
  }
}

Trivia.propTypes = {
  player: PropTypes.objectOf().isRequired,
};

// trazendo state do currency ao abrir página
const mapStateToProps = (state) => ({
  name: state.user.player.name,
  email: state.user.player.gravatarEmail,
  assertions: state.user.player.assertions,
  score: state.user.player.score,
  player: state.user.player,
});

export default connect(mapStateToProps)(Trivia);
