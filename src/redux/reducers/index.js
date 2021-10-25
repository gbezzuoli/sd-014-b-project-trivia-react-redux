import { combineReducers } from 'redux';

import player from './player';
import feedback from './feedback';

const rootReducer = combineReducers({ player, feedback });

export default rootReducer;
