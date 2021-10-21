import { configureStore } from '@reduxjs/toolkit';
import user from '../slices/userSlice';
import game from '../slices/gameSlice';

const store = configureStore({
  reducer: {
    user,
    game,
  },
});

if (window.Cypress) {
  window.store = store;
}

export default store;
