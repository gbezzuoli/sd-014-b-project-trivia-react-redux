import { SEND_USER_EMAIL } from '../actions/index';

const INITIAL_STATE = {
  player: {
    name: '',
    gravatarEmail: '',
    score: '',
  },
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SEND_USER_EMAIL:
    return ({
      ...state,
      player: action.payload,
    });
  default:
    return state;
  }
}

export default user;
