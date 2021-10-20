import { ADD_PLAYER_EMAIL_AND_NAME, ADD_PLAYER_TOKEN } from '../actions';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_PLAYER_TOKEN:
    return {
      ...state,
      token: action.payload,
    };
  case ADD_PLAYER_EMAIL_AND_NAME:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.gravatarEmail,
    };
  default:
    return state;
  }
};

export default playerReducer;
