import { LOGIN_INFO } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const user = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case LOGIN_INFO:
    return {
      ...state,
      email: payload.email,
      name: payload.name,
    };

  default:
    return state;
  }
};

export default user;
