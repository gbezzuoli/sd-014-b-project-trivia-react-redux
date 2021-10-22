import { combineReducers } from 'redux';
import saveInfoReducer from './saveInfoReducer';
import setQuestionsReducer from './setQuestionsReducer';

const rootReducer = combineReducers(
  {
    saveInfoReducer,
    setQuestionsReducer,
  },
);

export default rootReducer;
