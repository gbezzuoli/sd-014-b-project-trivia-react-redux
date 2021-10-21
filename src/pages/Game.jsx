import React from 'react';
import QuestionCard from '../components/QuestionCard';

export default class Game extends React.Component {
  render() {
    return (
      <div className="question-card">
        <QuestionCard apiResult={ apiResult1 } questionText={ questionText } />
      </div>
    );
  }
}
