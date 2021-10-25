import { combineReducers } from 'redux';
import user from './userReducer';
import game from './gameReducers';

const rootReducers = combineReducers({ user, game });

export default rootReducers;
