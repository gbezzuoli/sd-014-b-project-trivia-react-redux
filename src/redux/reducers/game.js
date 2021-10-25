import { GAME_QUESTIONS, SEND_RANKING, SEND_FEEDBACK } from '../actions/gameActions';

const INITIAL_STATE = {
  questions: [],
  timer: 30,
  score: 0,
  ranking: {},
  feedback: {},
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GAME_QUESTIONS:
    return {
      questions: [...state.questions, action.payload],
    };
  case SEND_FEEDBACK:
    return {
      ...state,
      feedback: [...state.feedback, { ...action.payload }],
    };
  case SEND_RANKING:
    return {
      ...state,
      ranking: [...state.ranking, { ...action.payload }],
    };
  default:
    return state;
  }
};

export default game;
