import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import Answers from './Answers';

class GameCard extends Component {
  render() {
    const { index } = this.props;
    const { questions } = this.props;
    return (
      <div>
        <Question questions={ questions } />
        <Answers index={ index } />
      </div>
    );
  }
}

GameCard.propTypes = {
  index: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
};

const mapStateToProps = (state) => ({
  index: state.renderQuestions.num,
});

export default connect(mapStateToProps)(GameCard);
