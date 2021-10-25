import { ADD_EMAIL, ADD_NAME, UPDATE_SCORE } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  score: 0,
  assertions: 0,
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_NAME:
    return {
      ...state,
      name: action.payload,
    };
  case ADD_EMAIL:
    return {
      ...state,
      gravatarEmail: action.payload,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  default:
    return state;
  }
}

export default player;
