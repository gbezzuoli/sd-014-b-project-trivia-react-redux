import { LOGIN } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: '',
    gravatarEmail: '',
  },
  isFetchingProfile: false,
};

function stateReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      player: {
        ...state.player,
        gravatarEmail: action.payload.email,
        name: action.payload.name,
      },
    };
  default:
    return state;
  }
}

export default stateReducer;
