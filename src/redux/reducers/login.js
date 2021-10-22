import { LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      gravatarEmail: action.gravatarEmail,
      name: action.name,
    };
  default:
    return state;
  }
};

export default login;
