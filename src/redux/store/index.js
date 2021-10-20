/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension'; 
import thunk from 'redux-thunk';

// applyMiddleware(thunk)
const store = createStore(rootReducer,
  composeWithDevTools(applyMiddleware(thunk)));


  if (window.Cypress) {
    window.store = store;
  }

export default store;
