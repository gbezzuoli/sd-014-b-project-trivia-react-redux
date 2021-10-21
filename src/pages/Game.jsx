import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../redux/actions/index';

const magicNumber = 0.5;

export default function Game() {
  const token = 'a974eb445f5b1d8dfeea2b7b9b28fe18eb82c72ffb8342021030c4d0ce7f3065';// Moked Token.
  // const token = useSelector((state) => state.token.token); // Token de verdade vira da qui
  const questions = useSelector((state) => state.question.questions.results);
  const currentQuest = 0;
  const shuffledIndexs = (indexs = [0, 1, 2]) => indexs.sort(() => Math.random() - magicNumber);
  const indexes = shuffledIndexs();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchQuestions(token));
    console.log(shuffledIndexs());
  }, []);

  return (
    <main>
      <h1>game page</h1>
      <section>
        <div>
          {questions
            &&
              <div>
                <h1
                  key={ questions[currentQuest].category }
                  data-testid="question-category"
                >
                  { questions[currentQuest].category }
                </h1>
                <h2 data-testid="question-text">{ questions[currentQuest].question }</h2>
                <button
                  key="correct-answer"
                  type="button"
                  data-testid="correct-answer"
                >
                  { questions[currentQuest].correct_answer }
                </button>
                <button
                  key="wrong-answer-0"
                  type="button"
                  data-testid="wrong-answer-0"
                >
                  { questions[currentQuest].incorrect_answers[indexes[0]] }
                </button>
                <button
                  key="wrong-answer-1"
                  type="button"
                  data-testid="wrong-answer-1"
                >
                  { questions[currentQuest].incorrect_answers[indexes[1]] }
                </button>
                <button
                  key="wrong-answer-2"
                  type="button"
                  data-testid="wrong-answer-2"
                >
                  { questions[currentQuest].incorrect_answers[indexes[2]] }
                </button>
              </div>}
        </div>
      </section>
    </main>
  );
}
