import { SET_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  questions: [],
};

const setQuestionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_QUESTIONS:
    return {
      questions: action.payload,
    };
  default:
    return state;
  }
};

export default setQuestionsReducer;
