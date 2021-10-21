import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../redux/actions/index';
import Header from '../components/Header/Header';
import Questions from '../components/Questions';

export default function Game() {
  const token = useSelector((state) => state.token.code);
  const questions = useSelector((state) => state.question.questions.results);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchQuestions(token));
  }, []);

  return (
    <>
      <Header />
      <main>
        <h1>game page</h1>
        <section>
          <div>
            {questions && <Questions />}
          </div>
        </section>
      </main>
    </>
  );
}
