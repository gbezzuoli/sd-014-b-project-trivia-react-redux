import { combineReducers } from 'redux';
import login from './login';
import tokenReducer from './tokenReducer';

const rootReducer = combineReducers({ tokenReducer, login });

export default rootReducer;
