import React, { Component } from 'react';

import TriviaQuestion from '../components/TriviaQuestion';
import WrongAnswer from '../components/WrongAnswer';
import CorrectAnswer from '../components/CorrectAnswer';
import GameHeader from '../components/GameHeader';
import { fecthTrivia } from '../redux/actions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      timer: 30,
      index: 0,
      next: false,
      loading: true,
    };

    this.renderQuestionsRandomAnswers = this.renderQuestionsRandomAnswers.bind(this);
    this.answerClickHandler = this.answerClickHandler.bind(this);
    this.nextButtonClick = this.nextButtonClick.bind(this);
    this.fetchQuestionsState = this.fetchQuestionsState.bind(this);
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.fetchQuestionsState();
    this.timer();
  }

  async fetchQuestionsState() {
    const dataQuestions = await fecthTrivia();
    const { results } = dataQuestions;
    console.log(results);
    this.setState({
      questions: results,
      loading: false,
    });
  }

  answerClickHandler(event) {
    const { id } = event.target;
    if (id === 'incorrect') {
      console.log('Resposta errada!');
      this.setState({ next: true });
    } else if (id === 'correct') {
      console.log('Certa resposta!');
      this.setState({ next: true });
    }
  }

  nextButtonClick() {
    this.setState((state) => ({ index: state.index + 1, next: false, timer: 30 }));
  }

  timer() {
    const time = 1000;
    setInterval(() => {
      const { timer } = this.state;
      if (timer === 0) {
        clearInterval();
        this.setState({ next: true });
      } else {
        this.setState((prevState) => ({
          timer: prevState.timer - 1,
        }));
      }
    }, time);
  }

  renderQuestionsRandomAnswers() {
    const { questions, index } = this.state;
    const MAGIC_NUMBER = 0.5;
    const incorrectAnswers = questions[index].incorrect_answers
      .map((wrong, i) => (
        <WrongAnswer
          incorrect={ wrong }
          key={ i }
          clickAnswer={ this.answerClickHandler }
        />));
    const correctAnswers = (
      <CorrectAnswer
        correct={ questions[index].correct_answer }
        clickAnswer={ this.answerClickHandler }
      />);
    const allAnswers = [...incorrectAnswers, correctAnswers]
      .sort(() => Math.random() - MAGIC_NUMBER);
    return (
      <div>
        { allAnswers.map((answer) => answer) }
      </div>
    );
  }

  render() {
    const { loading, questions, index, next, timer } = this.state;
    if (loading) return <h1>Loading</h1>;
    return (
      <div>
        <h1>{timer}</h1>
        <GameHeader />
        <TriviaQuestion
          category={ questions[index].category }
          question={ questions[index].question }
        />
        { this.renderQuestionsRandomAnswers() }
        <br />
        <button
          type="button"
          disabled={ next === false }
          onClick={ () => this.nextButtonClick() }
        >
          Próxima
        </button>
      </div>
    );
  }
}

export default Game;
