export const requestToken = async () => {
  const sessionTokenUrl = 'https://opentdb.com/api_token.php?command=request';
  const data = await fetch(sessionTokenUrl);
  const dataJson = await data.json();
  localStorage.setItem('token', dataJson.token);
  return dataJson.token;
};
export const requestQuestion = async (token, questionUrl = 'https://opentdb.com/api.php?amount=5&token=') => {
  const data = await fetch(`${questionUrl}${token}`);
  return data.json();
};

export const saveResponse = (questionObject) => (
  localStorage.setItem('Questions', questionObject)
);

export const requestQuestionAndSave = async (token, questionUrl) => {
  const questionObject = await requestQuestion(token, questionUrl);
  const { response_code: responseCode } = questionObject;
  if (responseCode === 0) {
    saveResponse(questionObject);
    return { boolean: true, questionObject };
  } return { boolean: false, questionObject };
};

export const requestTriviaApi = async (questionUrl) => { // questionUrl opcional
  let token = localStorage.getItem('token');
  if (token) {
    const tokeIsValid = requestQuestionAndSave(token, questionUrl);
    if (!(await tokeIsValid).boolean) {
      token = requestToken();
      requestQuestionAndSave(token);
    }
    return (await tokeIsValid).questionObject;
  }
};
