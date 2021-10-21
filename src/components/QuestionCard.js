import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class QuestionCard extends Component {
  render() {
    const { questions, controller } = this.props;
    const { category, question } = questions[controller];
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

QuestionCard.propTypes = {
  questions: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
  }),
  controller: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(QuestionCard);
