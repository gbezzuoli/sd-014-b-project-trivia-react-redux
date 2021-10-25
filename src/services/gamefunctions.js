import React from 'react';

export function renderButton(dataTest, index, anwser) {
  return (
    <button
      type="button"
      data-testId={ dataTest }
      key={ index }
      className={ dataTest }
    >
      {anwser}
    </button>);
}

export function sortArray(array) {
  const fiftyPercent = 0.5;
  return array.sort(() => Math.random() - fiftyPercent);
}

export function printQuestions(correctAnswer, incorrectAnswers, type) {
  if (type === 'multiple') {
    const array = [...incorrectAnswers, correctAnswer];
    const WrongAnswers = 3;
    const arrayWithDataTest = array.map((anwser, index) => {
      const dataTest = index < WrongAnswers
        ? `wrong-answer-${index}` : 'correct-answer';
      return (renderButton(dataTest, index, anwser));
    });
    return sortArray(arrayWithDataTest);
  }
  const array = [incorrectAnswers, correctAnswer];
  const arrayWithDataTest = array.map((anwser, index) => {
    if (index === 0) {
      return (renderButton(`wrong-answer-${index}`, index, anwser));
    }
    return (renderButton('correct-answer', index, anwser));
  });
  return sortArray(arrayWithDataTest);
}
