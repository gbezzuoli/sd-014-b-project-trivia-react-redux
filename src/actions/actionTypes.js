import md5 from 'crypto-js/md5';

export const SET_USER = 'SET_USER';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_AVATAR = 'GET_AVATAR';

const URL = 'https://opentdb.com/api_token.php?command=request';

export const setUser = (payload) => ({
  type: SET_USER,
  payload,
});

export const getToken = (payload) => ({
  type: GET_TOKEN,
  payload,
});

export const getAvatar = (payload) => ({
  type: GET_AVATAR,
  payload,
});

export const requestApi = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export const resultApi = () => async (dispatch) => {
  const result = await requestApi();
  dispatch(getToken(result));
};

export const requestAvatar = async (email) => {
  const hash = await md5(email).toString();
  return fetch(`https://www.gravatar.com/avatar/${hash}`);
};

export const resultAvatar = (email) => async (dispatch) => {
  const response = await requestAvatar(email);
  dispatch(getAvatar(response.url));
};
