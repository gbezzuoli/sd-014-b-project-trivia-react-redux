import { configureStore } from '@reduxjs/toolkit';
import login from '../slices/loginSlice';

const store = configureStore({
  reducer: {
    login,
  },
});

if (window.Cypress) {
  window.store = store;
}

export default store;
