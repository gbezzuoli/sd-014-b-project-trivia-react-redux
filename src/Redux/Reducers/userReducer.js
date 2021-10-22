import { SET_USER_DATA, SET_FEEDBACK } from '../Actions/index';

const INITIAL_STATE = {
  login: '',
  email: '',
  player: {
    name: '',
    assertions: '',
    score: 0,
    gravatarEmail: '',
  },
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER_DATA:
    return {
      ...state,
      name: action.payload,
      email: action.payload,
    };
  case SET_FEEDBACK:
    return {
      ...state,
      player: {
        name: action.payload,
        assertions: action.payload,
        score: action.payload,
        gravatarEmail: action.payload,
      },
    };
  default:
    return state;
  }
};

export default userReducer;
