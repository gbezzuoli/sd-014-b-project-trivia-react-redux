import { LOADING_ACTION, FAIL_ACTION, SUCCESS_ACTION, GET_TOKEN } from '../actions';

const initialState = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
    token: '',
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case LOADING_ACTION:
    return { ...state, ...payload };

  case SUCCESS_ACTION:
    return { ...state, ...payload };

  case FAIL_ACTION:
    return { ...state, ...payload };

  case GET_TOKEN:
    return { ...state, token: payload };

  default:
    return state;
  }
};
