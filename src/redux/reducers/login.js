import ACTION_LOGIN from '../actions/actions';

const INITIAL_STATE = {
  email: '',
  name: '',
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTION_LOGIN:
    return state;

  default:
    return state;
  }
};

export default login;
