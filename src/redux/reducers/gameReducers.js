import { ADD_COUNT, GET_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  count: 0,
  questions: [],
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
  default:
    return state;
  }
};

export default game;
