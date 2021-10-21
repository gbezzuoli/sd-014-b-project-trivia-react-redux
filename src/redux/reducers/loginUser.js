import { GET_INFO_PLAYER } from '../actions';

const INITIAL_STATE = {
  name: 'user',
  score: 0,
  gravatarEmail: '',
  gravatarURL: '',
};

function loginUser(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_INFO_PLAYER:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.gravatarEmail,
    };

  default:
    return state;
  }
}

export default loginUser;
