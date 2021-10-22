import { ADD_RESULTS_TO_STATE } from '../actions';

const INITIAL_STATE = {
  results: [],
  endQuestion: false,
  clickCorrectAnswer: false,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_RESULTS_TO_STATE:
    return { ...state, results: action.payload };
  default:
    return state;
  }
};

export default gameReducer;
