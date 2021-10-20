const endpointToken = 'https://opentdb.com/api_token.php?command=request';

const fetchToken = () => {
  const token = fetch(endpointToken)
    .then((response) => response.json());
  console.log(token);
  return token;
};

export default fetchToken;
