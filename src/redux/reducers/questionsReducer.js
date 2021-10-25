import { GET_QUESTIONS_API, LOADING_GAME } from '../actions';

const INITIAL_STATE = {
  questions: [],
  loading: true,
};
const questionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS_API:
    return {
      ...state, questions: [...action.payload],
    };
  case LOADING_GAME:
    return {
      ...state, loading: false,
    };
  default:
    return state;
  }
};
export default questionsReducer;
