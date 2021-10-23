import { GAME_QUESTIONS, GAME_COUNTER } from '../actions/actions';

const initialState = {
  counter: 30,
  questions: [],
  isGameReady: false,
};

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
  case GAME_QUESTIONS:
    return {
      ...state,
      questions: action.payload,
      isGameReady: true,
    };
  case GAME_COUNTER:
    return {
      ...state,
      counter: action.payload,
    };
  default:
    return state;
  }
}
