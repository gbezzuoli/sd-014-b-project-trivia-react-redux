import { GAME_QUESTIONS } from '../actions/actions';

const initialState = {
  questions: [],
  loading: true,
};

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
  case GAME_QUESTIONS:
    return {
      ...state,
      questions: action.payload.results,
      loading: false,
    };
  default:
    return state;
  }
}
