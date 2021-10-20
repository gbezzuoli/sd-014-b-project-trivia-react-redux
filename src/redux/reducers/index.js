import { combineReducers } from 'redux';
import saveInfoReducer from './saveInfoReducer';

const rootReducer = combineReducers(
  {
    saveInfoReducer,
  },
);

export default rootReducer;
