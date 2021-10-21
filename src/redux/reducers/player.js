import { SUBMIT_PLAYER } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUBMIT_PLAYER:
    return {
      ...state,
      name: action.player,
      gravatarEmail: action.email,
      token: action.token,
    };
  default:
    return state;
  }
};

export default player;
