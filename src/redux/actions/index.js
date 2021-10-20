import { FAILED_REQUEST, GET_TOKEN, REQUEST_API, SAVE_PLAYER } from './actionTypes';

export const savePlayer = (email, name) => ({
  type: SAVE_PLAYER,
  email,
  name,
});

const requestApi = () => ({
  type: REQUEST_API,
});

const getToken = (token) => ({
  type: GET_TOKEN,
  token,
});

const failedRequest = (error) => ({
  type: FAILED_REQUEST,
  error,
});

export function fetchTrivia() {
  return (dispatch) => {
    dispatch(requestApi());
    return fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json()
        .then(
          (json) => dispatch(getToken(json.token)),
          (error) => dispatch(failedRequest(error)),
        ));
  };
}
