import { SUBMIT_SCORE, SUBMIT_USER, RESET_USER_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUBMIT_USER:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.hashGravatar,
    };
  case SUBMIT_SCORE:
    return {
      ...state,
      score: action.score,
      assertions: action.assertions,
    };
  case RESET_USER_SCORE:
    return {
      ...INITIAL_STATE,
    };
  default:
    return state;
  }
};

export default playerReducer;
