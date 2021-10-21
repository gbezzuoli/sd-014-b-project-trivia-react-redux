const initialState = {
  questions: [{ question: '', incorrect_answer: [] }],
};

function questions(state = initialState, action) {
  switch (action.type) {
  case 'GET_QUESTIONS':
    return {
      ...state,
      questions: action.payload.results,
    };
  default:
    return state;
  }
}

export default questions;
