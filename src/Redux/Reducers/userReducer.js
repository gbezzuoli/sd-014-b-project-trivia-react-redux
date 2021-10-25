import { SET_USER_DATA, SET_FEEDBACK, SET_BUTTON_COLLOR } from '../Actions/index';

const INITIAL_STATE = {
  login: '',
  email: '',
  player: {
    name: '',
    assertions: '',
    score: 0,
    gravatarEmail: '',
  },
  colors: {
    wrongColor: '',
    rigthColor: '',
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
  case SET_BUTTON_COLLOR:
    return {
      ...state,
      colors: {
        wrongColor: action.payload,
        rigthColor: action.payload,
      },
    };
  default:
    return state;
  }
};

export default userReducer;
