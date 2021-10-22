import { RENDER_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  num: 0,
};

const renderQuestions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RENDER_QUESTIONS:
    return {
      num: action.num + 1,
    };
  default:
    return state;
  }
};

export default renderQuestions;
