import { SUBMIT_SCORE, SUBMIT_USER } from '../actions';

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
  default:
    return state;
  }
};

export default playerReducer;
