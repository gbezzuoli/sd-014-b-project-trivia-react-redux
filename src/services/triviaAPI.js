export const fetchTrivia = async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(URL);
  const playerToken = await response.json();
  localStorage.setItem('token', playerToken.token);
};

export const getId = async (id) => {
  const URL = `https://opentdb.com/api.php?amount=5&token=${id}`;
  const gamer = await fetch(URL);
  return gamer;
};
