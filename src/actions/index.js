export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const FETCH_API = 'FETCH_API';

export const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

export const getQuestions = (payload) => ({
  type: GET_QUESTIONS,
  payload,
});

export function fetchAPI() {
  return (dispatch) => {
    dispatch(requestQuestions());
    return fetch('https://opentdb.com/api.php?amount=5')
      .then((response) => response.json())
      .then((data) => dispatch(getQuestions(data)));
  };
}
