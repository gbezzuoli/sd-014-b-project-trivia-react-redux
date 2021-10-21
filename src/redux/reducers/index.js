import { combineReducers } from 'redux';
import state from './state';
import ranking from './ranking';
import token from './token';
import question from './question';

const rootReducer = combineReducers({
  state,
  ranking,
  token,
  question,
});

export default rootReducer;
