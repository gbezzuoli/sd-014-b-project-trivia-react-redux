export const ADD_LOGIN_AND_EMAIL = 'ADD_LOGIN_AND_EMAIL';
export const ADD_PLAYER_TOKEN = 'ADD_PLAYER_TOKEN';
export const ADD_PLAYER_EMAIL_AND_NAME = 'ADD_PLAYER_EMAIL_AND_NAME';
export const ADD_RESULTS_TO_STATE = 'ADD_RESULTS_TO_STATE';
export const ADD_SCORE = 'ADD_SCORE';

export const addLoginAndEmail = (payload) => ({
  type: ADD_LOGIN_AND_EMAIL,
  payload,
});

export const addPlayerToken = (payload) => ({
  type: ADD_PLAYER_TOKEN,
  payload,
});

export const addPlayerEmailAndName = (payload) => ({
  type: ADD_PLAYER_EMAIL_AND_NAME,
  ...payload,
});

export const addResultsToState = (payload) => ({
  type: ADD_RESULTS_TO_STATE,
  payload,
});

export const addScore = (payload) => ({
  type: ADD_SCORE,
  payload,
});
