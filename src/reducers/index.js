import { combineReducers } from 'redux';
import user from './user';
import token from './token';

const rootReducers = combineReducers({
  user,
  token,
});

export default rootReducers;
