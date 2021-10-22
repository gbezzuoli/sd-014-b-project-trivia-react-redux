import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import QuestionCard from '../components/QuestionCard';

class Game extends React.Component {
  render() {
    const { questions, loading } = this.props;
    if (loading) return 'Loading...';
    return (
      <div className="game-page">
        <QuestionCard apiResult={ questions } index={ 0 } />
      </div>
    );
  }
}

Game.propTypes = {
  getQuestions: PropTypes.func,
  loading: PropTypes.bool,
  questions: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

const mapStateToProps = (state) => ({
  questions: state.setQuestionsReducer.questions,
  loading: state.setQuestionsReducer.loading,
});

export default connect(mapStateToProps)(Game);
