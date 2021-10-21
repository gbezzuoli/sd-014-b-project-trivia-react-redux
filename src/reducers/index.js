import { combineReducers } from 'redux';
import user from './user';
import questions from './questions';

const rootReducers = combineReducers({
  user,
  questions,
});

export default rootReducers;
