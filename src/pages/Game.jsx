import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAvatar } from '../redux/slices/userSlice';
import { fetchQuestions } from '../redux/slices/gameSlice';

export default function Game() {
  const dispatch = useDispatch();
  const { name, email, avatar, token } = useSelector((store) => store.user);
  const { questions, loading } = useSelector((store) => store.game);

  useEffect(() => {
    dispatch(fetchAvatar(email));
    dispatch(fetchQuestions(token));
  }, [dispatch, email, token]);

  return (
    <>
      <header>
        <img data-testid="header-profile-picture" src={ avatar } alt="" />
        <span data-testid="header-player-name">{name}</span>
        <span data-testid="header-score">{`Pontos: ${0}`}</span>
      </header>
      <main>
        <h1>Game Page</h1>
        {!loading && JSON.stringify(questions[1].category)}
      </main>
    </>
  );
}
