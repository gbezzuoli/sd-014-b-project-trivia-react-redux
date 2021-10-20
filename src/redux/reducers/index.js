import { combineReducers } from 'redux';
import state from './state';
import ranking from './ranking';
import token from './token';

const rootReducer = combineReducers({
  state,
  ranking,
  token,
});

export default rootReducer;
