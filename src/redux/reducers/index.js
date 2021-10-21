import { combineReducers } from 'redux';
import gameReducers from './gameReducers';

const rootReducer = combineReducers({ gameReducers });

export default rootReducer;
