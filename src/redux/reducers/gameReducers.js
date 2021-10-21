import { GET_TOKEN, GET_NAME_AND_EMAIL } from '../actions';

const INITIAL_STATE = {
  token: '',
  name: '',
  email: '',
};

export default function gameReducers(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_TOKEN:
    return {
      ...state,
      token: action.payload,
    };
  case GET_NAME_AND_EMAIL:
    return {
      ...state,
      name: action.name,
      email: action.email,
    };
  default:
    return state;
  }
}
