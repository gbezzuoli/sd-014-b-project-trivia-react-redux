import { SET_INFO } from '../actions';

const INITIAL_STATE = {
  userName: '',
  avatar: '',
  score: 0,
};

const saveInfoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_INFO:
    return {
      ...state,
      userName: action.userName,
      avatar: action.avatar,
      score: action.score,
    };
  default:
    return state;
  }
};

export default saveInfoReducer;
