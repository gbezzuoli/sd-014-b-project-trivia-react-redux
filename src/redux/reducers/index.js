import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import loginUser from './loginUser';

const rootReducer = combineReducers({ tokenReducer, loginUser });

export default rootReducer;
