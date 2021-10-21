import { GET_TOKEN } from '../actions/actionTypes';

const INICIAL_STATE = {
  name: '',
  email: '',
  apiToken: '',
};

function userReducer(state = INICIAL_STATE, action) {
  switch (action.type) {
  case 'SET_USER':
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  case GET_TOKEN:
    return {
      ...state,
      apiToken: action.payload };
  default:
    return state;
  }
}

export default userReducer;
