import { GET_TOKEN, FAILED_REQUEST } from '../actions/TokenAction';

const initialState = {
  token: '',
  erro: '',
};

export default function UserReducer(state = initialState, action) {
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
}
