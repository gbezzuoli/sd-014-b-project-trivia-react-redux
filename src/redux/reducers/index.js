import { combineReducers } from 'redux';
import playerReducer from './player';
import gameReducer from './game';

const rootReducer = combineReducers({ player, game });

export default rootReducer;
