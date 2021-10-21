import { GET_TOKEN, GET_NAME_AND_EMAIL, GET_AVATAR, GET_SCORE } from '../actions';

const INITIAL_STATE = {
  token: '',
  name: '',
  email: '',
  avatar: '',
  score: 0,
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
  case GET_AVATAR:
    return {
      ...state,
      profileImage: action.profileImage,
    };
  case GET_SCORE:
    return {
      ...state,
      score: action.score,
    };
  default:
    return state;
  }
}
