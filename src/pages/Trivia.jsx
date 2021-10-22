import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Component/Header';
import { fetchQuestions } from '../redux/actions';

class Trivia extends Component {
  constructor() {
    super();
    this.state = {
      questionIndex: 0,
    };
  }

  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  render() {
    const { receviQuestions } = this.props;
    const { questionIndex } = this.state;
    const haveData = receviQuestions.length > 0;
    if (haveData === false) {
      return (
        <div>
          <Header />
          <span>Loading</span>
        </div>
      );
    }
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
  getQuestions: PropTypes.func.isRequired,
  receviQuestions: PropTypes.shape({
    length: PropTypes.number,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (payload) => dispatch(fetchQuestions(payload)),
});

const mapStateToProps = (state) => ({
  receviQuestions: state.trivia.questions,
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
