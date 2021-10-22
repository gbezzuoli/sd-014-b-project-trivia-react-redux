import { ADD_COUNT, GET_QUESTIONS, RESET_TIMER } from '../actions';

const INITIAL_STATE = {
  count: 0,
  questions: [],
  timer: 30,
};

const game = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ADD_COUNT:
    return {
      ...state,
      count: payload,
    };
  case GET_QUESTIONS:
    return {
      ...state,
      questions: payload,
    };
  case RESET_TIMER:
    return {
      ...state,
      timer: payload,
    };
  default:
    return state;
  }
};

export default game;
