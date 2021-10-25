import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class QuestCard extends Component {
  render() {
    const { quest, cat, dif } = this.props;
    const textFix = (string) => {
      // Fonte: https://github.com/WebDevSimplified/React-Flashcard-App/blob/master/src/App.js
      const textArea = document.createElement('textarea');
      textArea.innerHTML = string;
      return textArea.value;
    };
    return (
      <div>
        <h3>
          {`Question difficulty: ${dif}`}
        </h3>
        <h3 data-testid="question-category">
          {`Category: ${textFix(cat)}` }
        </h3>
        <h3 data-testid="question-text">
          { `Question: ${textFix(quest)}` }
        </h3>
      </div>
    );
  }
}

QuestCard.propTypes = {
  quest: PropTypes.string.isRequired,
  cat: PropTypes.string.isRequired,
  dif: PropTypes.string.isRequired,
};
