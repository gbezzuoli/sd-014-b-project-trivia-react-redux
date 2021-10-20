import { createStore } from 'redux';
import rootReducer from '../reducers';

export const store = createStore(rootReducer);

if (window.Cypress) {
  window.store = store;
}

export default store;
