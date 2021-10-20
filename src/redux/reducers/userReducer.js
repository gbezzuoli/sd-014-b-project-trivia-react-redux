import { SET_USER_DATA } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER_DATA:
    return {
      ...state,
      name: action.payload,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default userReducer;
