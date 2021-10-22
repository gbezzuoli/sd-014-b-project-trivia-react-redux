import { GET_TOKEN } from '../actions/index';

const INITIAL_STATE = {
  token: '',
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_TOKEN:
    return { ...state, token: payload };
  default:
    return state;
  }
};
