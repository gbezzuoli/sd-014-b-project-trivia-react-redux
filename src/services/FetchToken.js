const fetchToken = () => (
  fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json()
      .then(response.ok ? Promise.resolve(response) : Promise.reject(response)))
);

export default fetchToken;
