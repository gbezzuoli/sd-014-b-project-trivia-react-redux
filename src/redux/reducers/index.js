import { combineReducers } from 'redux';
import playerReducer from './player';
import game from './game';

const rootReducer = combineReducers({ playerReducer, game });

export default rootReducer;
