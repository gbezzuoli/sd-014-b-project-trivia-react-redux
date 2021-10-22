// api generate token
const getApiToken = async () => {
  const getFetch = await fetch('https://opentdb.com/api_token.php?command=request');
  const getJson = await getFetch.json();
  const getResults = await getJson;
  return getResults;
};

export default getApiToken;

export const getApiTrivia = async (token) => {
  const getFetch = await fetch(`https://opentdb.com/api.php?amount=5&encode=base64&token=${token}`);
  const getJson = await getFetch.json();
  const getResults = await getJson;
  return getResults;
};
