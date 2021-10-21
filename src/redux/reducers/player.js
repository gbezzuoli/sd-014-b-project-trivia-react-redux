import { SUCCESS_ACTION, FAIL_ACTION } from '../actions/actionTypes';

const initialState = {
  name: '',
  token: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case SUCCESS_ACTION:
    return { ...state, token: payload };

  case FAIL_ACTION:
    return { ...state, error: payload };

  default:
    return state;
  }
};
