import { GET_ASK } from '../actions/actionTypes';

const INICIAL_STATE = {
  questions: '',
};

function gameReducer(state = INICIAL_STATE, action) {
  switch (action.type) {
  case GET_ASK:
    return {
      ...state, questions: action.payload,
    };
  default:
    return state;
  }
}

export default gameReducer;
