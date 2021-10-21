import { SUBMIT_USER } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUBMIT_USER:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.hashGravatar,
    };
  default:
    return state;
  }
};

export default playerReducer;
