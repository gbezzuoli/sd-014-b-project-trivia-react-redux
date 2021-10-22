import { REQUEST_QUESTIONS, GET_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  isFetching: false,
  questions: [],
};

export default function game(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return { ...state, isFetching: true };
  case GET_QUESTIONS:
    return { ...state, isFetching: false, questions: [...action.payload] };
  default:
    return state;
  }
}
