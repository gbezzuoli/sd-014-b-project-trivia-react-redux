import { REQUEST_QUESTION, RECEIVE_QUESTION } from '../actions/index';

const INITIAL_STATE = {
  questions: {},
  isFetching: false,
};

function questions(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_QUESTION:
    return ({
      ...state,
      isFetching: true,
    });
  case RECEIVE_QUESTION:
    return ({
      ...state,
      questions: action.questions,
      isFetching: false,
    });
  default:
    return state;
  }
}

export default questions;
