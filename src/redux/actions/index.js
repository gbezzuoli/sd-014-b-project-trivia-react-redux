export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';

const requestQuestions = () => ({ type: REQUEST_QUESTIONS});

const receiveQuestions = (questions) => ({
  type: RECEIVE_QUESTIONS,
  questions,
});

export function fetchQuestions(token) {
  const endPoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
  return (dispatch) => {
    dispatch(requestQuestions());
    return fetch(endPoint)
      .then((response) => response.json())
      .then((questions) => dispatch(receiveQuestions(questions)));
  };
}
