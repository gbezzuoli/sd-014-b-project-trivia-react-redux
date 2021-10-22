import { GET_TOKEN, REQUEST_API, SUCCESS_API } from '../actions/index';

const INITIAL_STATE = {
  token: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TOKEN:
    return { ...state, token: action.payload };
  case REQUEST_API:
    return { ...state };
  case SUCCESS_API:
    return { ...state, token: action.token };
  default:
    return state;
  }
};
