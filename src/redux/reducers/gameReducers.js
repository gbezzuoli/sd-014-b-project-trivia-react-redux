import { ADD_COUNT, GET_QUESTIONS, STOP_TIMER, REFRESH_TIMER } from '../actions';

const INITIAL_STATE = {
  count: 0,
  questions: [],
  timer: false,
  countdown: 30,
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
  case STOP_TIMER:
    return {
      ...state,
      timer: payload,
      countdown: 30,
    };
  case REFRESH_TIMER:
    return {
      ...state,
      countdown: payload,
    };
  default:
    return state;
  }
};

export default game;
