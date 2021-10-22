const initialState = [];

function questions(state = initialState, action) {
  switch (action.type) {
  case 'GET_QUESTIONS':
    return action.payload.results;
  default:
    return state;
  }
}

export default questions;
