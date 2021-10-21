import React from 'react';
import QuestionCard from '../components/QuestionCard';

export default class Game extends React.Component {
  // questionCategory
  // questionType
  // questionDifficulty
  // questionText
  // questionCorrectAnswer
  // qustionIncorrectAnswers

  render() {
    const answerList = ['A pistol', 'The H.E.V suit', 'Your fists'];
    const questionText = 'Pergunta teste';
    return (
      <div className="question-card">
        <h3
          data-testid="question-category"
          className="question-category"
        >
          {/* { questionCategory } */}
        </h3>
        <p
          data-testid="questionCategory"
          className="question-text"
        >
          {/* { questionText } */}
        </p>
        <QuestionCard answerList={ answerList } questionText={ questionText } />
      </div>
    );
  }
}
