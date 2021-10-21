import { REQUEST_QUESTIONS, GET_QUESTIONS } from '../actions';

const initialState = {
  questions: [],
  loading: null,
};

function game(state = initialState, action) {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return {
      ...state,
      loading: true,
    };
  case GET_QUESTIONS:
    return {
      ...state,
      loading: false,
      questions: action.payload,
    };
  default:
    return state;
  }
}

export default game;
