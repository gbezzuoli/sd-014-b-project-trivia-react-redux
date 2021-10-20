export const requestToken = async () => {
  const sessionTokenUrl = 'https://opentdb.com/api_token.php?command=request';
  const data = await fetch(sessionTokenUrl);
  const dataJson = await data.json();
  localStorage.setItem('token', dataJson.token);
} 



export const requestQuestion = async (token, questionUrl = 'https://opentdb.com/api.php?amount=5&token=') => {
  const data = await fetch(`${questionUrl}${token}`);
  return data.json();
}

export const saveResponse = (questionObject) => localStorage.setItem('Questions', questionObject);

export const getNewToken = async () => {
  await requestToken();
  requestTriviaApi();
}

export const requestTriviaApi = async (questionUrl) => { //questionUrl opcional
  const token = localStorage.getItem('token');
  if(token) {
    const questionObject = await requestQuestion(token, questionUrl);
    const { response_code } = questionObject;
    response_code === 0 ?  saveResponse(questionObject) : getNewToken();
  } getNewToken();
}
