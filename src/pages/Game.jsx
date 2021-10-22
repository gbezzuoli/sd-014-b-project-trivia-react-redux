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
        <section className="content-questions">
          {questions && <Questions />}
        </section>
      </main>
    </>
  );
}
