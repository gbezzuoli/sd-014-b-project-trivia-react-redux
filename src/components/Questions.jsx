import React from 'react';
import { useSelector } from 'react-redux';
import Button from './Button';

const magicNumber = 0.5;

const Questions = () => {
  const questions = useSelector((state) => state.question.questions.results);
  const currentQuest = 0;
  const answers = questions && [
    questions[0].correct_answer,
    ...questions[0].incorrect_answers,
  ];
  const sortedAnswers = questions && answers.sort(() => Math.random() - magicNumber);
  return (
    <div>
      <h1
        key={ questions[currentQuest].category }
        data-testid="question-category"
      >
        { questions[currentQuest].category }
      </h1>
      <h2 data-testid="question-text">{ questions[currentQuest].question }</h2>
      {sortedAnswers.map((answer) => {
        const currentQIndex = questions[0].incorrect_answers.indexOf(answer);
        if (answer === questions[0].correct_answer) {
          return (<Button answer={ answer } key={ answer } id="correct-answer" />);
        }
        return (
          <Button
            answer={ answer }
            key={ answer }
            id={ `wrong-answer-${currentQIndex}` }
          />);
      })}
    </div>
  );
};

export default Questions;
