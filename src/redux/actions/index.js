export const LOADING_ACTION = 'LOADING_ACTION';
export const SUCCESS_ACTION = 'SUCCESS_ACTION';
export const FAIL_ACTION = 'FAIL_ACTION';
export const GET_TOKEN = 'GET_TOKEN';
export const LOGIN = 'LOGIN';
export const REQUEST_API = 'REQUEST_API';
export const SUCCESS_API = 'SUCCESS_API';

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
