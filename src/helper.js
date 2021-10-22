const getToken = async () => {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const fetchToken = await fetch(url);
  const result = await fetchToken.json();
  const receiveToken = result.token;
  localStorage.setItem('token', JSON.stringify(receiveToken));
};

export default getToken;
