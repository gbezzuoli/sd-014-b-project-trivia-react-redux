export const GET_TOKEN = 'GET_TOKEN';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export const getToken = (value) => ({
  type: GET_TOKEN,
  payload: value,
});

export const failedRequest = (error) => ({
  type: FAILED_REQUEST,
  payload: error,
});

export function fetchTokenAction() {
  return async (dispatch) => {
    try {
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const data = await response.json();
      localStorage.setItem('token', data.token);
      return dispatch(getToken(data.token));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
}
