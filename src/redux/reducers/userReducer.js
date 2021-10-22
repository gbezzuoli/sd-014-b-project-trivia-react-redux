import { USER_LOGIN, USER_TOKEN, USER_AVATAR } from '../actions/actions';

const initialState = {
  name: '',
  email: '',
  avatar: '',
  token: '',
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  case USER_AVATAR:
    return {
      ...state,
      avatar: action.payload,
    };
  case USER_TOKEN:
    localStorage.setItem('token', JSON.stringify(action.payload.token));
    return ({
      ...state,
      token: action.payload.token,
    });
  default:
    return state;
  }
}
