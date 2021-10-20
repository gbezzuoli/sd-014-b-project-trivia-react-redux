export const ACTION_LOGIN = 'ACTION_LOGIN';
export const SAVE_TOKEN = 'SAVE_TOKEN';

export const triviaGameAction = (json) => ({
  type: ACTION_LOGIN,
  json,
});

export const fetchLogin = (token) => (dispatch) => fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
  .then((response) => response.json()
    .then((json) => dispatch(triviaGameAction(json))));

export const saveTokenAction = (token) => ({
  type: SAVE_TOKEN,
  token,
});
