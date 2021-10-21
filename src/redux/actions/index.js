export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const GET_TOKEN = 'GET_TOKEN';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export function requestToken() {
  return { type: REQUEST_TOKEN };
}

export function getToken(payload) {
  return { type: GET_TOKEN, payload };
}

export function failedRequest(error) {
  return { type: FAILED_REQUEST, payload: error };
}

export function fetchToken() {
  return (dispatch) => {
    dispatch(requestToken());
    return fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then(
        (object) => dispatch(getToken(object.token)),
        (error) => dispatch(failedRequest(error)),
      );
  };
}
