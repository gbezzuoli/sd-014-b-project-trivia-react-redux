const Url = 'https://opentdb.com/api_token.php?command=request';

// 'https://opentdb.com/api.php?amount=5&token=${seu-token-aqui}';

export default async function RequestApi() {
  const response = await fetch(Url);
  const token = await response.json();

  return token;
}
