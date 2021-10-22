import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Question from './Question';

class GameCard extends Component {
  render() {
    const { questions } = this.props;
    return (
      <div>
        <Question questions={ questions } />
      </div>
    );
  }
}

GameCard.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
};

const mapStateToProps = (state) => ({
  index: state.questions.index,
  questions: state.questions.questions,
});

export default connect(mapStateToProps, null)(GameCard);
