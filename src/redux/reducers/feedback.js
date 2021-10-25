import { SEND_FEEDBACK, SEND_RANKING } from '../actions/gameActions';

const INITIAL_STATE = {
  ranking: {},
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const feedback = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_FEEDBACK:
    return {
      ...state,
      assertions: action.payload.assertions,
      score: action.payload.scoreboard,
    };
  case SEND_RANKING:
    return {
      ...state,
      ranking: [...state.ranking, action.payload],
    };
  default:
    return state;
  }
};

export default feedback;
