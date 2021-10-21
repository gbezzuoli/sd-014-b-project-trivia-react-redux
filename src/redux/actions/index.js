import { SUCCESS_ACTION, FAIL_ACTION, GET_DATA } from './actionTypes';

const URL = 'https://opentdb.com/api_token.php?command=request';

function successAction(json) {
  window.localStorage.setItem('token', json.token);
  return { type: SUCCESS_ACTION, payload: json.token };
}

export const failedRequest = (error) => ({
  type: FAIL_ACTION,
  payload: error,
});

export const fetchTrivia = () => async (dispatch) => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return dispatch(successAction(data));
  } catch (error) {
    return dispatch(failedRequest(error.message));
  }
};

export const sendData = (payload) => ({
  type: GET_DATA,
  payload,
});
