import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class QuestionCard extends Component {
  render() {
    const { question, category } = this.props;
    const textFix = (string) => {
      // Fonte: https://github.com/WebDevSimplified/React-Flashcard-App/blob/master/src/App.js
      const textArea = document.createElement('textarea');
      textArea.innerHTML = string;
      return textArea.value;
    };
    return (
      <div>
        <h2 data-testid="question-category">
          {`Category: ${textFix(category)}` }
        </h2>
        <h2 data-testid="question-text">
          { `Question: ${textFix(question)}` }
        </h2>
      </div>
    );
  }
}

QuestionCard.propTypes = {
  question: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};
