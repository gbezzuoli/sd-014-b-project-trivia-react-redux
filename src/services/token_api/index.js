export default async function returnTokenApi() {
  const URL_API = 'https://opentdb.com/api_token.php?command=request';
  const returnApi = fetch(URL_API)
    .then((response) => response.json()
      .then((data) => data.token));
  return returnApi;
}
