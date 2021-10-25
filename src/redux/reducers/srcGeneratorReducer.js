import { DISPATCH_SRC } from '../actions/srcGeneratorAction';

const INITIAL_STATE = {
  src: '',
};

const srcReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DISPATCH_SRC:
    return {
      ...state,
      src: action.payload,
    };
  default:
    return state;
  }
};

export default srcReducer;
