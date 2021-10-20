import { combineReducers } from 'redux';
import actionReducer from './action';

const rootReducer = combineReducers({ actionReducer });

export default rootReducer;
