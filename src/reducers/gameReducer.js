import { GET_ASK } from '../actions/actionTypes';

const INICIAL_STATE = {
  questions: '',
  results: [],
};

function gameReducer(state = INICIAL_STATE, action) {
  switch (action.type) {
  case GET_ASK:
    return {
      ...state, questions: action.payload, results: action.payload.results,
    };
  default:
    return state;
  }
}

export default gameReducer;
