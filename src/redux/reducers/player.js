import { PLAYER_INFO } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case PLAYER_INFO:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email };
  default: return state;
  }
}

export default player;
