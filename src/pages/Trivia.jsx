import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Component/Header';

class Trivia extends Component {
  constructor() {
    super();
    this.state = {
      questionIndex: 0,
    };
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
              type="button"
            >
              {question}
            </button>
          </div>
        ))}
        <button
          data-testid="correct-answer"
          type="button"
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
