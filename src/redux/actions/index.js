export const LOADING_ACTION = 'LOADING_ACTION';
export const SUCCESS_ACTION = 'SUCCESS_ACTION';
export const FAIL_ACTION = 'FAIL_ACTION';
export const GET_TOKEN = 'GET_TOKEN';
export const LOGIN = 'LOGIN';
export const REQUEST_API = 'REQUEST_API';
export const SUCCESS_API = 'SUCCESS_API';
export const GET_QUESTIONS_API = 'GET_QUESTIONS_API';
export const LOADING_GAME = 'LOADING_GAME';
export const FAILED_API = 'FAILED_API';

const setLogin = (login, email) => ({
  type: LOGIN, login, email,
});

export default setLogin;

export const loadingAction = (payload) => ({
  type: LOADING_ACTION,
  payload,
});
export const successAction = (payload) => ({
  type: SUCCESS_ACTION,
  payload,
});
export const failAction = (payload) => ({
  type: FAIL_ACTION,
  payload,
});

export const getToken = (payload) => ({
  type: GET_TOKEN,
  payload,
});

export const requestApi = () => ({
  type: REQUEST_API,
});

export const finishAPI = (token) => ({
  type: SUCCESS_API,
  token,
});
export const getQuestionsApi = (payload) => ({
  type: GET_QUESTIONS_API,
  payload,
});
export const loadingGame = (payload) => ({
  type: LOADING_GAME,
  payload,
});
export const failedApi = (payload) => ({
  type: FAILED_API,
  payload,
});

export const getRequestTriviaGame = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const { results } = await response.json();
    const questions = results;
    dispatch(getQuestionsApi(questions));
    return dispatch(loadingGame());
  } catch (error) {
    dispatch(failedApi(error));
  }
};
