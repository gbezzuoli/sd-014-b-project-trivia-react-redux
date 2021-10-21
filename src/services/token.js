const fetchToken = async () => {
  const dataFromApi = await fetch('https://opentdb.com/api_token.php?command=request');
  const result = dataFromApi.json();
  return result;
};

export default fetchToken;
