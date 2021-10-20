const URL = 'https://opentdb.com/api.php?amount=5&token=';

const getQuestions = async (token) => {
  const response = await fetch(`${URL}${token}`);
  const resolve = await response.json();
  return resolve.results;
};

export default getQuestions;
