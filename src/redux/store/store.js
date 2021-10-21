import { configureStore } from '@reduxjs/toolkit';
import user from '../slices/userSlice';

const store = configureStore({
  reducer: {
    user,
  },
});

if (window.Cypress) {
  window.store = store;
}

export default store;
