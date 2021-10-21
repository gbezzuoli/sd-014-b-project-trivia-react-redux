import { ACTIONS } from '../actions';

const INITIAL_STATE = {
  token: '',
  name: '',
  email: '',
  profileImage: '',
  score: 0,
  questions: [],
};

export default function gameReducers(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ACTIONS.GET_TOKEN:
    return {
      ...state,
      token: action.payload,
    };
  case ACTIONS.GET_NAME_AND_EMAIL:
    return {
      ...state,
      name: action.name,
      email: action.email,
    };
  case ACTIONS.GET_AVATAR:
    return {
      ...state,
      profileImage: action.profileImage,
    };
  case ACTIONS.GET_SCORE:
    return {
      ...state,
      score: action.score,
    };
  case ACTIONS.GET_QUESTIONS:
    return {
      ...state,
      questions: action.questions,
    };
  default:
    return state;
  }
}
