export const PLAYER_INFO = 'PLAYER_INFO';

export const sendPlayerInfo = (payload) => ({
  type: PLAYER_INFO,
  payload,
});

export const saveToLocalStorage = (object) => {
  localStorage.setItem('token', object.token);
};

export const fetchAPI = () => fetch('https://opentdb.com/api_token.php?command=request')
  .then((data) => data.json())
  .then((response) => saveToLocalStorage(response));
