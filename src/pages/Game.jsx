import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../redux/actions/index';
import Questions from '../components/Questions';

const token = 'a416a12e33d0b12945c7fbb982966df3f13e553915f6eae7241d05a6eb42a432';// Moked Token.

export default function Game() {
  // const token = useSelector((state) => state.token.token); // Token de verdade vira da qui
  const questions = useSelector((state) => state.question.questions.results);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchQuestions(token));
  }, []);

  return (
    <main>
      <h1>game page</h1>
      <section>
        <div>
          {questions && <Questions />}
        </div>
      </section>
    </main>
  );
}

export default Game;
