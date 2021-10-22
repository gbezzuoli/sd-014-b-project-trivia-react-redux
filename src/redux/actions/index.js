import fetchQuestionsAPI from '../../services/trivia_API';

export const USER_LOGIN = 'USER_LOGIN';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const GET_SCORE = 'GET_SCORE';

export const savePlayerInfos = (payload) => ({
  type: USER_LOGIN, payload,
});

export const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

export const getQuestions = (payload) => ({
  type: GET_QUESTIONS,
  payload,
});

export const getScore = (payload) => ({
  type: GET_SCORE,
  payload,
});

export const fetchQuestions = () => (dispatch) => {
  dispatch(requestQuestions());

  fetchQuestionsAPI()
    .then((response) => dispatch(getQuestions(response)));
};
