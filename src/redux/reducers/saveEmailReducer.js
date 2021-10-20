import { SET_EMAIL } from '../actions';

const INITIAL_STATE = {
  userEmail: '',
};

const saveEmailReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_EMAIL:
    return {
      userEmail: action.userEmail,
    };
  default:
    return state;
  }
};

export default saveEmailReducer;
