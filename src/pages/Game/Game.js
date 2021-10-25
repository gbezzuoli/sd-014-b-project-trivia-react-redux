import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI } from '../../actions';
import Cronometer from './Cronometer';

class Game extends Component {
  constructor() {
    super();
    this.requestQuestions = this.requestQuestions.bind(this);
    this.skipQuestion = this.skipQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.generateButton = this.generateButton.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.state = {
      tag: 0,
      skip: false,
      gameOver: false,
    };
  }

  componentDidMount() {
    this.requestQuestions();
  }

  async requestQuestions() {
    const { saveQuestions } = this.props;
    await saveQuestions();
  }

  skipQuestion() {
    const { tag } = this.state;
    this.setState({
      tag: tag + 1,
      skip: false,
    });
  }

  startTimer() {
    const interval = 1000;
    this.valueInterval = setInterval(() => {
      const { seconds } = this.state;
      if (seconds > 0) {
        this.setState((prevState) => ({
          seconds: prevState.seconds - 1,
        }));
      }
      if (seconds === 0) {
        clearInterval(this.valueInterval);
      }
    }, interval);
  }

  handleClick() {
    this.setState({
      skip: true,
    });
  }

  changeColor(e, rightAnswer) {
    const { skip } = this.state;
    if (e === rightAnswer && skip === true) {
      return 'correct-answer';
    } if (e !== rightAnswer && skip === true) {
      return 'wrong-answer';
    }
    return '';
  }

  generateButton() {
    return (
      <button
        type="button"
        onClick={ this.skipQuestion }
        data-testid="btn-next"
      >
        Próxima Pergunta!
      </button>);
  }

  stopGame() {
    this.setState({
      gameOver: true,
    });
  }

  render() {
    const { tag, skip, gameOver } = this.state;
    const {
      loading,
      questions,
    } = this.props;
    const randomInt = 0.5;
    if (loading === false) {
      return (
        <div>
          <Cronometer gameOver={ this.stopGame } />
          <h3 data-testid="question-category">{ questions[tag].category }</h3>
          <h3 data-testid="question-text">{ questions[tag].question }</h3>
          { [questions[tag].correct_answer, ...questions[tag].incorrect_answers]
            .sort(() => Math.random() - randomInt)
            .map((e, index) => (
              <button
                type="button"
                key={ index }
                className={ this.changeColor(e, questions[tag].correct_answer) }
                data-testid={ e === questions[tag].correct_answer
                  ? 'correct-answer'
                  : `wrong-answer-${index}` }
                onClick={ () => this.handleClick() }
                disabled={ gameOver }
              >
                { e }
              </button>)) }
          {skip && this.generateButton()}
        </div>
      );
    }
    return <div> Loading... </div>;
  }
}

const mapStateToProps = (state) => ({
  loading: state.game.loading,
  questions: state.game.questions.results,
});

const mapDispatchToProps = (dispatch) => ({
  saveQuestions: () => dispatch(fetchAPI()),
});

Game.propTypes = {
  fetchAPI: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
