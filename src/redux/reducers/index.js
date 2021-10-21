import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';

const rootReducers = combineReducers({ tokenReducer });

export default rootReducers;
