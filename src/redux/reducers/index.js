import { combineReducers } from 'redux';
import login from './login';
import tokenReducer from './tokenReducer';
import questionsReducer from './questionsReducer';

const rootReducer = combineReducers({ tokenReducer, login, questionsReducer });

export default rootReducer;
