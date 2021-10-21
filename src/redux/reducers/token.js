import { FAILED_REQUEST, GET_TOKEN, REQUEST_TOKEN } from '../actions';

const INITIAL_STATE = {
  redirect: false,
  isFetching: false,
  code: '',
  error: '',
};

function token(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_TOKEN:
    return { ...state, isFetching: true };
  case GET_TOKEN:
    return { ...state, code: action.payload, isFetching: false, redirect: true };
  case FAILED_REQUEST:
    return { ...state, error: action.payload, isFetching: false };
  default:
    return state;
  }
}

export default token;
