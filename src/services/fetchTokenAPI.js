// realizar requisição token
const BASE_URL = 'https://opentdb.com/api_token.php?command=request';

const getToken = async () => {
  const response = await fetch(BASE_URL);
  const resolve = await response.json();
  return resolve.token;
};

export default getToken;
