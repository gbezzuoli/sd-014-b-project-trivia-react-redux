import { SET_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  questions: [],
  loading: true,
};

const setQuestionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_QUESTIONS:
    return {
      questions: action.payload,
      loading: false,
    };
  default:
    return state;
  }
};

export default setQuestionsReducer;
