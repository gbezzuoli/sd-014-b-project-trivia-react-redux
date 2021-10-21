import { REQUEST_QUESTIONS, RECEIVE_QUESTIONS } from '../actions/index';
const INITIAL_STATE = {
  isFetching: false,
  questions: [],
};

function question(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return {
      ...state,
      isFetching: true,
    };
  case RECEIVE_QUESTIONS:
    return {
      ...state,
      isFetching: false,
      questions: action.questions,
    };
  default:
    return state;
  }
}

export default question;
