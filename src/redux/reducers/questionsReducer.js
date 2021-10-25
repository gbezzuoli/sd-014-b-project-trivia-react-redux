import { GET_QUESTIONS_API } from '../actions';

const INITIAL_STATE = {
  questions: [],
};
const questionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS_API:
    console.log('eu parei aqui');
    return {
      ...state, questions: [...action.payload],
    };
  default:
    return state;
  }
};
export default questionsReducer;
