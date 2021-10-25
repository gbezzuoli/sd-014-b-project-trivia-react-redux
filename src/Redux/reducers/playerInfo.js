import { SAVE_PLAYER_INFO, SAVE_URL_GRAVATAR } from '../actions';

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
  case SAVE_URL_GRAVATAR:
    return {
      ...state,
      gravatarUrl: action.gravatarUrl,
    };
  default:
    return state;
  }
}

export default playerInfo;
