import { SAVE_PLAYER_INFO } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

function playerInfo(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_PLAYER_INFO:
    return {
      ...state,
      player: { ...state.player, ...action.player },
    };
  default:
    return state;
  }
}

export default playerInfo;
