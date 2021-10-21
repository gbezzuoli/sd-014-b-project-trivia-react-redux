import React from 'react';
import { connect } from 'react-redux';

class Questions extends React.Component {
  render() {
    const { questions } = this.props;
    console.log(questions);
    return (
      <div>
        <h2 data-testid="question-category">{ questions[0].category }</h2>
        <h2 data-testid="question-text">{ questions[0].question}</h2>
        <button
          type="button"
          data-testid="correct-answer"
        >
          { questions[0].correct_answer }
        </button>
        <button
          type="button"
          data-testid="wrong-answer-${index}"
        >
          { questions[0].incorrect_answers && questions[0].incorrect_answers[0] }
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
});

export default connect(mapStateToProps)(Questions);
