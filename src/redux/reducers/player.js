import { submitPlayerAction } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case submitPlayerAction:
    return {
      ...state,
    };
  default:
    return state;
  }
};

export default player;
