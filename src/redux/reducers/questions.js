import { SAVE_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  questions: [],
  index: 0,
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_QUESTIONS:
    return {
      ...state,
      questions: action.questions,
      index: action.index,
    };
  default:
    return state;
  }
};

export default questions;
