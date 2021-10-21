import React, { Component } from 'react';
import { connect } from 'react-redux';

class QuestionCard extends Component {
  render() {
    const { questions } = this.props;
    const { category, question } = questions[2];
    console.log(questions);
    return (
      <section>
        <div data-testid="question-category">
          { category }
        </div>
        <div data-testid="question-text">
          { question }
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
});

export default connect(mapStateToProps)(QuestionCard);
