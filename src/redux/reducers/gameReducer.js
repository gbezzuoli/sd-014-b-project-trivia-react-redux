import { SET_TRIVIA_VALUE } from '../actions';

const INICIAL_STATE = {
  questions: {},
};

const gameReducer = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case SET_TRIVIA_VALUE:
    return { ...state, questions: action.payload };
  default:
    return state;
  }
};

export default gameReducer;
