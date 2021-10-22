import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Component/Header';
import Timer from '../Component/Timer';

class Trivia extends Component {
  constructor() {
    super();
    this.state = {
      questionIndex: 0,
      timer: 30,
    };
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

  render() {
    const { receviQuestions } = this.props;
    const { questionIndex, timer } = this.state;

    return (
      <div>
        <Header />
        <Timer count={ timer } />
        <p data-testid="question-category">{receviQuestions[questionIndex].category}</p>
        <p data-testid="question-text">{receviQuestions[questionIndex].question}</p>
        {receviQuestions[questionIndex].incorrect_answers.map((question, index) => (
          <div key={ index }>
            <button
              data-testid={ `wrong-answer-${index}` }
              type="button"
              disabled={ timer === 0 }
            >
              {question}
            </button>
          </div>
        ))}
        <button
          data-testid="correct-answer"
          type="button"
          disabled={ timer === 0 }
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
};

const mapStateToProps = (state) => ({
  receviQuestions: state.trivia.questions,
});

export default connect(mapStateToProps)(Trivia);
