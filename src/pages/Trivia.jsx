import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Component/Header';
import Timer from '../Component/Timer';
import { addScore } from '../redux/actions';

class Trivia extends Component {
  constructor() {
    super();
    this.state = {
      questionIndex: 0,
      timer: 30,
      score: 0,
    };
    this.handleColorClick = this.handleColorClick.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  startTimer() {
    const ONE_SECOND = 1000;
    const { timer } = this.state;
    if ((timer - 1) >= 0) {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
      setTimeout(this.startTimer, ONE_SECOND);
    }
  }

  // consultado o pr do grupo 9
  handleColorClick() {
    const { sendScore } = this.props;
    const { score } = this.state;
    const getAllButtons = document.querySelectorAll('button');
    getAllButtons.forEach((btn) => {
      if (btn.value === 'wrong-ans') {
        btn.style.border = '3px solid rgb(255, 0, 0)';
      }
      if (btn.value === 'correct-ans') {
        btn.style.border = '3px solid rgb(6, 240, 15)';
      }
    });
    sendScore(score);
  }

  render() {
    const { receviQuestions } = this.props;
    const { questionIndex, timer, score } = this.state;
    return (
      <div>
        <Header score={ score } />
        <Timer count={ timer } />
        <p data-testid="question-category">{receviQuestions[questionIndex].category}</p>
        <p data-testid="question-text">{receviQuestions[questionIndex].question}</p>
        {receviQuestions[questionIndex].incorrect_answers.map((question, index) => (
          <div key={ index }>
            <button
              data-testid={ `wrong-answer-${index}` }
              onClick={ this.handleColorClick }
              type="button"
              disabled={ timer === 0 }
              value="wrong-ans"
            >
              {question}
            </button>
          </div>
        ))}
        <button
          data-testid="correct-answer"
          onClick={ this.handleColorClick }
          type="button"
          disabled={ timer === 0 }
          value="correct-ans"
        >
          { receviQuestions[questionIndex].correct_answer }
        </button>
      </div>
    );
  }
}

Trivia.propTypes = {
  receviQuestions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    length: PropTypes.number,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  sendScore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  receviQuestions: state.trivia.questions,
});

const mapDispatchToProps = (dispatch) => ({
  sendScore: (score) => dispatch(addScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
