import { combineReducers } from 'redux';
import player from './player';
import questions from './questions';
import renderQuestions from './renderQuestions';

const rootReducer = combineReducers({
  player,
  questions,
  renderQuestions,
});

export default rootReducer;
