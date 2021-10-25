import { GAME_QUESTIONS, ADD_SCORE, RESET_BOARD } from '../actions/gameActions';

const INITIAL_STATE = {
  questions: [],
  score: 0,
  assertions: 0,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GAME_QUESTIONS:
    return {
      questions: [...state.questions, action.payload],
    };
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + action.payload.points,
      assertions: state.assertions + 1,
    };
  case RESET_BOARD:
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  default:
    return state;
  }
};

export default game;
