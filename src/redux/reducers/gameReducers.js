import { ADD_COUNT, GET_QUESTIONS, STOP_TIMER,
  REFRESH_TIMER, SHOW_NEXT } from '../actions';

const INITIAL_STATE = {
  count: 0,
  questions: [],
  timer: false,
  countdown: 30,
  next: false,
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
  case SHOW_NEXT:
    return {
      ...state,
      next: payload,
    };
  default:
    return state;
  }
};

export default game;
