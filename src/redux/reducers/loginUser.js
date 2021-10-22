import { GET_INFO_PLAYER } from '../actions';

const INITIAL_STATE = {
  name: '',
  score: 0,
  gravatarEmail: '',
};

function loginUser(state = INITIAL_STATE, { type }) {
  switch (type) {
  case GET_INFO_PLAYER:
    return {
      ...state,
      name: action.name,
      email: action.gravatarEmail,
    };

  default:
    return state;
  }
}

export default loginUser;
