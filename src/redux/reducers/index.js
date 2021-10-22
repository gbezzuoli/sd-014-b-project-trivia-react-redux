import { combineReducers } from 'redux';
import playerReducer from './player';
import questionsReducer from './questions';

const rootReducer = combineReducers({ playerReducer, questionsReducer });

export default rootReducer;
