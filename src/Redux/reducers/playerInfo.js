import { SAVE_PLAYER_INFO } from '../actions';

const INITIAL_STATE = {
  player: {
    email: '',
    name: '',
  },
};

function playerInfo(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_PLAYER_INFO:
    return {
      ...state,
      player: action.player,
    };
  default:
    return state;
  }
}

export default playerInfo;
