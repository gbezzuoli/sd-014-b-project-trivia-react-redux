import { ACTION } from '../actions/index.js';

const INITIAL_STATE = {
  list: [],
};

function actionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTION:
      return ({
        ...state,
        list: action.payload,
      });
    default:
      return state;
  }
}

export default actionReducer;
