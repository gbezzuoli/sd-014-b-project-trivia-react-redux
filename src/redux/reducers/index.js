import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import userReducer from './userReducer';
import questionsReducer from './questionsReducer';

const rootReducer = combineReducers(
  {
    tokenReducer,
    userReducer,
    questionsReducer,
  },
);

export default rootReducer;
