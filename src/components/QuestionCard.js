import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class QuestionCard extends Component {
  render() {
    const { question, category } = this.props;
    return (
      <div>
        <h2 data-testid="question-category">
          {`Category: ${category}` }
        </h2>
        <h2 data-testid="question-text">
          { `Question: ${question}` }
        </h2>
      </div>
    );
  }
}

QuestionCard.propTypes = {
  question: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};
