import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAvatar } from '../redux/slices/userSlice';

export default function Game() {
  const dispatch = useDispatch();
  const { name, email, avatar } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(fetchAvatar(email));
  }, [dispatch, email]);

  return (
    <>
      <header>
        <img data-testid="header-profile-picture" src={ avatar } alt="" />
        <span data-testid="header-player-name">{name}</span>
        <span data-testid="header-score">{`Pontos: ${0}`}</span>
      </header>
      <main>Game Page</main>
    </>
  );
}
