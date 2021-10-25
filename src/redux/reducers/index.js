import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import userReducer from './userReducer';
import srcReducer from './srcGeneratorReducer';

const rootReducer = combineReducers(
  {
    tokenReducer,
    userReducer,
    srcReducer,
  },
);

export default rootReducer;
