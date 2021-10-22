import getQuestions from '../../services/fetchQuestionsAPI';

export const LOGIN_INFO = 'LOGIN_INFO';
export const ADD_COUNT = 'ADD_COUNT';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const RESET_TIMER = 'RESET_TIMER';

export const loginInfo = (payload) => ({
  type: LOGIN_INFO,
  payload,
});

export const addCount = (payload) => ({
  type: ADD_COUNT,
  payload,
});

export const getQuestionsApi = (payload) => ({
  type: GET_QUESTIONS,
  payload,
});

export const fetchQuestions = (token) => async (dispatch) => {
  const questions = await getQuestions(token);
  dispatch(getQuestionsApi(questions));
};

export const resetTimer = (payload) => ({
  type: RESET_TIMER,
  payload,
})