import { ACTION_LOGIN, SAVE_TOKEN, GET_NAME_EMAIL } from '../actions/actions';

const INITIAL_STATE = {
  email: '',
  name: '',
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTION_LOGIN:
    return {
      ...state,
      triviaQuest: action.json,
    };
  case SAVE_TOKEN:
    return {
      ...state,
      token: action.token,
    };

  case GET_NAME_EMAIL:
    return {
      ...state,
      name: action.name,
      email: action.email,
    };

  default:
    return state;
  }
};

export default login;
