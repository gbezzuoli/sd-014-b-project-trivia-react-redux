import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';
import './Questions.css';

const HALF = 0.5;

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldBorderColorChange: false,
      sortedAnswers: [],
      currentQuestion: 0,
      seconds: 30,
    };

    this.getAnswersAndSort = this.getAnswersAndSort.bind(this);
    this.handleAnswersButton = this.handleAnswersButton.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.timerFunction = this.timerFunction.bind(this);
  }

  componentDidMount() {
    const { getAnswersAndSort } = this;
    getAnswersAndSort();
    this.timerFunction();
  }

  componentDidUpdate() {
    const { seconds } = this.state;
    if (seconds === 0) {
      this.handleAnswersButton();
    }
  }

  getAnswersAndSort() {
    const {
      props: { questions },
      state: { currentQuestion },
    } = this;

    const answers = questions && [
      questions[currentQuestion].correct_answer,
      ...questions[currentQuestion].incorrect_answers,
    ];

    const sortedAnswers = questions && answers.sort(() => Math.random() - HALF);

    this.setState({ sortedAnswers });
  }

  handleAnswersButton(answer, difficulty) {
    clearInterval(this.valueInterval);
    const { questions } = this.props;
    const { shouldBorderColorChange, currentQuestion, seconds } = this.state;
    const difficultyScore = {
      easy: 1,
      medium: 2,
      hard: 3,
      default: 10,
    };

    const score = difficultyScore.default + (
      seconds * difficultyScore[difficulty]);

    if (answer === questions[currentQuestion].correct_answer) {
      const { player } = JSON.parse(localStorage.getItem('state'));
      player.assertions += 1;
      player.score += score;
      localStorage.setItem('state', JSON.stringify({ player: { ...player } }));
    }
    if (!shouldBorderColorChange) {
      this.setState({ shouldBorderColorChange: true });
    }
  }

  handleNextQuestion() {
    this.setState(({ currentQuestion }) => ({ currentQuestion: currentQuestion + 1,
      shouldBorderColorChange: false,
      seconds: 30 }),
    () => this.getAnswersAndSort());
    this.timerFunction();
  }

  timerFunction() {
    const interval = 1000;
    this.valueInterval = setInterval(() => {
      this.setState((sec) => ({
        seconds: sec.seconds - 1,
      }));
    }, interval);
  }

  render() {
    console.log('Question:', this.handleNextQuestion);
    const {
      state: { shouldBorderColorChange, sortedAnswers, currentQuestion, seconds },
      props: { questions },
      handleAnswersButton,
    } = this;
    const finalSeconds = 10;

    return (
      <section className="container">
        <div className="container-question">
          <div>
            <h1
              key={ questions[currentQuestion].category }
              data-testid="question-category"
            >
              { questions[currentQuestion].category }
            </h1>
          </div>
          <p data-testid="question-text">{ questions[currentQuestion].question }</p>
        </div>
        <div>
          <h1>
            {seconds < finalSeconds ? `0${seconds}` : seconds}
          </h1>
        </div>
        <div className="container-answers">
          {sortedAnswers.map((answer) => {
            const currentQIndex = questions[currentQuestion]
              .incorrect_answers.indexOf(answer);
            if (answer === questions[currentQuestion].correct_answer) {
              return (
                <Button
                  answer={ answer }
                  key={ answer }
                  id="correct-answer"
                  buttonBorderColor="6, 240, 15"
                  handleAnswersButton={ handleAnswersButton }
                  shouldBorderColorChange={ shouldBorderColorChange }
                  difficulty={ questions[currentQuestion].difficulty }
                />
              );
            }
            return (
              <Button
                answer={ answer }
                key={ answer }
                id={ `wrong-answer-${currentQIndex}` }
                buttonBorderColor="255, 0, 0"
                handleAnswersButton={ handleAnswersButton }
                shouldBorderColorChange={ shouldBorderColorChange }
                difficulty={ questions[currentQuestion].difficulty }
              />);
          })}
          { shouldBorderColorChange
          && (
            <div className="container-btn">
              <button
                type="button"
                onClick={ this.handleNextQuestion }
                data-testid="btn-next"
                className="btn-next"
              >
                Próxima
              </button>
            </div>
          )}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.question.questions.results,
});

Questions.propTypes = {
  questions: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Questions);
