import { combineReducers } from 'redux';
import user from './user';
import token from './token';
import questions from './questions';

const rootReducers = combineReducers({
  user,
  token,
  questions,
});

export default rootReducers;
