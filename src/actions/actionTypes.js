export const SET_USER = 'SET_USER';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_ASK = 'GET_ASK';

const urlToken = 'https://opentdb.com/api_token.php?command=request';

export const setUser = (payload) => ({ type: SET_USER, payload });

export const getToken = (payload) => ({ type: GET_TOKEN, payload });

export const getAsk = (payload) => ({ type: GET_ASK, payload });

export const requestTokenApi = async () => {
  const response = await fetch(urlToken);
  const data = await response.json();
  return data;
};

export const resultApi = () => async (dispatch) => {
  const result = await requestTokenApi();
  dispatch(getToken(result));
};

export const requestAskApi = async () => {
  const myToken = await JSON.parse(localStorage.getItem('token'));
  const urlAsk = `https://opentdb.com/api.php?amount=5&token=${myToken}`;
  const response = await fetch(urlAsk);
  const data = await response.json();
  return data;
};

export const resultAsk = () => async (dispatch) => {
  const result = await requestAskApi();
  dispatch(getAsk(result));
};
