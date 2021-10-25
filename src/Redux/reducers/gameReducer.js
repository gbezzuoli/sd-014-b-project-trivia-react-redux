import { ADD_RESULTS_TO_STATE, SAVE_RANKING } from '../actions';

const INITIAL_STATE = {
  results: [],
  ranking: [],
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_RESULTS_TO_STATE:
    return { ...state, results: action.payload };
  case SAVE_RANKING:
    return { ...state, ranking: [...state.ranking, action.payload] };
  default:
    return state;
  }
};

export default gameReducer;
