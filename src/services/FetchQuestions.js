const fetchQuestions = (token) => {
  const questions = fetch(`https://opentdb.com/api.php?amount=1&token=${token}`)
    .then((response) => response.json()
      .then(response.ok ? Promise.resolve(response) : Promise.reject(response)));
  return questions;
};

export default fetchQuestions;
