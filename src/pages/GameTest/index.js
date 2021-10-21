import React, { Component } from 'react';
import OBJ_TESTE from './objTeste';

import TriviaQuestion from '../../components/TriviaQuestion';
import WrongAnswer from '../../components/WrongAnswer';
import CorrectAnswer from '../../components/CorrectAnswer';

class GameTest extends Component {
  constructor() {
    super();

    this.state = {
      questions: OBJ_TESTE.results,
      index: 0,
      next: false,
    };

    this.renderQuestionsRandomAnswers = this.renderQuestionsRandomAnswers.bind(this);
    this.answerClickHandler = this.answerClickHandler.bind(this);
    this.nextButtonClick = this.nextButtonClick.bind(this);
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
    this.setState({ index: this.state.index +1 });
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
    const { questions, index, next } = this.state;
    return (
      <div>
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

export default GameTest;

// Cemitério de código:

// renderQuestions() {}

// if (questions.type === 'boolean') {
//   return (
//     <div>
//       <CorrectAnswer correct={ questions[index].correct_answer } />
//       <WrongAnswer wrong={ questions[index].incorrect_answers[0] } />
//     </div>
//   );
// }
// return (
//   <div>
//     <CorrectAnswer correct={ questions[index].correct_answer } />
//     { questions[index].incorrect_answers.map((wrong, i) => <WrongAnswer incorrect={ wrong } key={ i } />) }
//   </div>
// );
