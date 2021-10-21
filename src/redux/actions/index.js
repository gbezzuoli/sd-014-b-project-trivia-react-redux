export const PLAYER_INFO = 'PLAYER_INFO';

export const sendPlayerInfo = (payload) => ({
  type: PLAYER_INFO,
  payload,
});

// const EMPTY_KEY = [];

export const saveToLocalStorage = (object) => {
  localStorage.setItem('token', object.token);
};

export const fetchAPI = () => fetch('https://opentdb.com/api_token.php?command=request')
  .then((data) => data.json())
  .then((response) => saveToLocalStorage(response));

/* async function fetchToken() {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const json = await response.json();
  const result = json.token;
  console.log(result);
  return result;
} */

/* ∫ */

/*
};
 */
/*
export const loadFromLocalStorage = (key) => (
  key === 'token' ? localStorage.getItem(key)
    : JSON.parse(localStorage.getItem(key)) || EMPTY_KEY); */
