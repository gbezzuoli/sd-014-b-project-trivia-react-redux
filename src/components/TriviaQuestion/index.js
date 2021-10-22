import PropTypes from 'prop-types';
import React from 'react';
import './style.css';

class TriviaQuestion extends React.Component {
  render() {
    const { category, question } = this.props;
    return (
      <div className="questions-div">
        <h2 data-testid="question-category">{ category }</h2>
        <h3 data-testid="question-text">{ question }</h3>
      </div>
    );
  }
}

TriviaQuestion.propTypes = {
  category: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
};

export default TriviaQuestion;
