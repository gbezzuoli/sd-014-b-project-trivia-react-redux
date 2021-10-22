import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Component/Header';

class Trivia extends Component {
  constructor() {
    super();
    this.handleColorClick = this.handleColorClick.bind(this);

    this.state = {
      questionIndex: 0,
    };
  }

  // consultado o pr do grupo 9
  handleColorClick() {
    const getAllButtons = document.querySelectorAll('button');
    getAllButtons.forEach((btn) => {
      if (btn.value === 'wrong-ans') {
        btn.style.border = '3px solid rgb(255, 0, 0)';
      }
      if (btn.value === 'correct-ans') {
        btn.style.border = '3px solid rgb(6, 240, 15)';
      }
    });
  }

  render() {
    const { receviQuestions } = this.props;
    const { questionIndex } = this.state;
    return (
      <div>
        <Header />
        <p data-testid="question-category">{receviQuestions[questionIndex].category}</p>
        <p data-testid="question-text">{receviQuestions[questionIndex].question}</p>
        {receviQuestions[questionIndex].incorrect_answers.map((question, index) => (
          <div key={ index }>
            <button
              data-testid={ `wrong-answer-${index}` }
              onClick={ this.handleColorClick }
              type="button"
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
          value="correct-ans"
        >
          { receviQuestions[questionIndex].correct_answer }
        </button>
      </div>
    );
  }
}

Trivia.propTypes = {
  receviQuestions: PropTypes.shape({
    length: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  receviQuestions: state.trivia.questions,
});

export default connect(mapStateToProps)(Trivia);
