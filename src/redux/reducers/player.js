import { SUBMIT_PLAYER } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUBMIT_PLAYER:
    return {
      ...state,
    };
  default:
    return state;
  }
};

export default player;
