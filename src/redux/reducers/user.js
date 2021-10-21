import { SEND_USER_INFO } from '../actions/index';

const INITIAL_STATE = {
  player: {
    name: '',
    gravatarEmail: '',
    score: '',
  },
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SEND_USER_INFO:
    return ({
      ...state,
      player: action.payload,
    });
  default:
    return state;
  }
}

export default user;
