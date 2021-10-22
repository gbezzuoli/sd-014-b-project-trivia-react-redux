import { GET_QUESTIONS } from '../actions';

const INITIAL_STATE = [];

function questionsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_QUESTIONS:
    return [...action.payload];
  default:
    return state;
  }
}

export default questionsReducer;
