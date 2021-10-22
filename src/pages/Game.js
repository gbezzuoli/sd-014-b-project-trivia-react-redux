import React, { Component } from 'react';

import TriviaQuestion from '../components/TriviaQuestion';
import WrongAnswer from '../components/WrongAnswer';
import CorrectAnswer from '../components/CorrectAnswer';
import GameHeader from '../components/GameHeader';

const OBJ_TESTE = {
  response_code: 0,
  results: [
    {
      category: 'Entertainment: Japanese Anime & Manga',
      type: 'boolean',
      difficulty: 'easy',
      question: 'In the 1988 film &quot;Akira&quot;, Tetsuo ends up destroying Tokyo.',
      correct_answer: 'True',
      incorrect_answers: [
        'False',
      ],
    },
    {
      category: 'Geography',
      type: 'multiple',
      difficulty: 'medium',
      question: 'The Japanese district Akihabara is also known by what nickname?',
      correct_answer: 'Electric Town',
      incorrect_answers: [
        'Moon Walk River',
        'Otaku Central ',
        'Big Eyes',
      ],
    },
    {
      category: 'Entertainment: Video Games',
      type: 'multiple',
      difficulty: 'easy',
      question: 'Who is the leader of Team Mystic in Pok&eacute;mon Go?',
      correct_answer: 'Blanche',
      incorrect_answers: [
        'Candela',
        'Spark',
        'Willow',
      ],
    },
    {
      category: 'Science & Nature',
      type: 'multiple',
      difficulty: 'hard',
      question: 'Where is the Gluteus Maximus muscle located?',
      correct_answer: 'Butt',
      incorrect_answers: [
        'Arm',
        'Head',
        'Torso',
      ],
    },
    {
      category: 'Entertainment: Comics',
      type: 'multiple',
      difficulty: 'easy',
      question: 'What is the full first name of the babysitter in Calvin and Hobbes?',
      correct_answer: 'Rosalyn',
      incorrect_answers: [
        'Rose',
        'Ruby',
        'Rachel',
      ],
    },
  ],
};

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
    this.setState((state) => ({ index: state.index + 1, next: false }));
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

export default GameTest;
