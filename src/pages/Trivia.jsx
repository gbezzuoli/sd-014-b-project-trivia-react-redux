import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import QuestionsTrivia from '../components/QuestionsTrivia';

class Trivia extends Component {

  render() {
    const { questions } = this.props;
    console.log(questions);
    return (
      <QuestionsTrivia questions={ questions } />
    );
  }
}

Trivia.propTypes = {
  questions: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questionsReducer,
});

export default connect(mapStateToProps, null)(Trivia);
