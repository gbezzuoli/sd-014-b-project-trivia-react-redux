import { combineReducers } from 'redux';

import player from './player';
import game from './game';
import feedback from './feedback';

const rootReducer = combineReducers({ player, game, feedback });

export default rootReducer;
