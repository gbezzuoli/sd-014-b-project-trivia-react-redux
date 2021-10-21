const BASE_URL = 'https://opentdb.com/api.php?amount=5&token=';

const requestTrivia = async (token) => {
  const request = await fetch(`${BASE_URL}${token}`);
  const response = await request.json();
  console.log(response);
  return response;
};

export default requestTrivia;
