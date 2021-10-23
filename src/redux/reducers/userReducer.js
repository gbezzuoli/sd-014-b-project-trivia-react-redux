import { GET_USER } from '../actions/userAction';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_USER:
    return {
      ...state,
      name: action.name,
      email: action.email,
    };
  default:
    return state;
  }
};

export default userReducer;
