import { GET_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  questions: [],
  loading: true,
};

function questionsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_QUESTIONS:
    return {
      ...state,
      questions: action.payload,
      loading: false,
    };
  default:
    return state;
  }
}

export default questionsReducer;
