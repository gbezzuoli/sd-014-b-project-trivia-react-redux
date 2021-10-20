// src/app/store.js

import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {},
});

if (window.Cypress) {
  window.store = store;
}

export default store;
