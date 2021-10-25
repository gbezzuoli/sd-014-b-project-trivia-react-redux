import { GET_QUESTIONS, FAILED_REQUEST } from '../actions/questionsAction';

const INITIAL_STATE = {
  questions: [],
  erro: '',
};

const questionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS:
    return {
      ...state,
      questions: action.payload,
    };
  case FAILED_REQUEST:
    return {
      ...state,
      erro: action.payload,
    };
  default:
    return state;
  }
};

export default questionsReducer;
