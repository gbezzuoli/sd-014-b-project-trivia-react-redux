export const LOADING_ACTION = 'LOADING_ACTION';
export const SUCCESS_ACTION = 'SUCCESS_ACTION';
export const FAIL_ACTION = 'FAIL_ACTION';
export const GET_TOKEN = 'GET_TOKEN';

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
