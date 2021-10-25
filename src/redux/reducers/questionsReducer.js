import { GET_QUESTIONS_API } from '../actions';
const INITIAL_STATE = {
  questions: [],
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS_API:
    return {
      ...state, questions: [...action.payload],
    };
  default:
    return state;
  }
};