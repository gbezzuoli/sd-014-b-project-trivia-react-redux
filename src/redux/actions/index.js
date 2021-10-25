export const GET_QUESTIONS = 'GET_QUESTIONS';
export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_NAME = 'ADD_NAME';
export const ADD_SCORE = 'ADD_SCORE';

const getQuestions = (payload) => ({
  type: GET_QUESTIONS,
  payload,
});

export const fetchQuestions = () => (dispatch) => {
  const url = 'https://opentdb.com/api.php?amount=5&token=';
  return fetch(`${url}${JSON.parse(localStorage.getItem('token'))}`)
    .then((response) => response.json())
    .then(
      (result) => dispatch(getQuestions(result)),
    );
};

export function addEmail(payload) {
  return {
    type: ADD_EMAIL,
    payload,
  };
}

export function addName(payload) {
  return {
    type: ADD_NAME,
    payload,
  };
}

export function addScore(payload) {
  return {
    type: ADD_SCORE,
    payload,
  };
}
