import { GET_TOKEN, FAILED_REQUEST } from '../actions/TokenAction';

const INITIAL_STATE = {
  token: '',
  erro: '',
};

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TOKEN:
    return {
      ...state,
      token: action.payload,
    };
  case FAILED_REQUEST:
    return {
      ...state,
      erro: action.payload,
    };
  default:
    return state;
  }
};

export default tokenReducer;
