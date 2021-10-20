export const SET_USER = 'SET_USER';
export const GET_TOKEN = 'GET_TOKEN';

const URL = 'https://opentdb.com/api_token.php?command=request';

export const setUser = (payload) => ({
  type: SET_USER, payload,
});

export const getToken = (payload) => ({
  type: GET_TOKEN,
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
